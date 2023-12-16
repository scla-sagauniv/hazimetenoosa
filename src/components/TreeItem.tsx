import { useState } from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import { Checkbox } from '@/components/ui/checkbox';
import { Node } from '@/types/index';
import { FaFolderPlus } from 'react-icons/fa';

export const TreeItem = ({
  id,
  label,
  isEditing,
  isOpen,
  isSecret,
  isFolder,
  children,
  level = 0,
  addNewFolder, // ここで関数を受け取る,
  changeToEditing,
  changeToOpen
}: Node & { addNewFolder?: (parentId: string, folderName: string) => void} & {changeToEditing?: (id: string) => void} & {changeToOpen?: (id: string) => void}) => {
  const [newFolderName, setNewFolderName] = useState<string>("")
  const handleAddFolder = () => {
    if(changeToEditing){
      changeToEditing(id);
    }
    if(changeToOpen){
      changeToOpen(id);
    }
  };

  const indent = level * 20;
  const Icon = isFolder ? FolderIcon : DocumentIcon;

  if (isSecret) {
    return null;
  }

  return (
    <div style={{ paddingLeft: `${indent}px` }}>
      <div className="flex items-center">
        <Checkbox className="mr-2" />
        {isFolder && (
          <ChevronDownIcon className={`w-5 h-5 mr-2 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}  />
        )}
        {!isFolder && <Icon className="w-5 h-5 mr-2" />}
        <span className="ml-1">{label}</span>
        {isFolder && <FaFolderPlus className='w-4 h-4 ml-2 cursor-pointer' onClick={handleAddFolder}/>}
        
      </div>
      {isOpen && isEditing && (
        <div style={{ marginLeft: '20px', paddingLeft: `${indent + 20}px` }}>
          <input 
            type='text' 
            className='w-1/2'
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
            if(e.key === 'Enter' && newFolderName){
              if(addNewFolder){
                addNewFolder(id, newFolderName);
              }
              if(changeToEditing){
                changeToEditing(id);
              }
              setNewFolderName("");
            }
          }}/>
        </div>
      )
      }
      {isOpen && children && (
        <div style={{ marginLeft: '20px' }}>
          {children.map((child) => (
            <TreeItem key={child.id} {...child} level={level + 1} addNewFolder={addNewFolder} changeToEditing={changeToEditing} changeToOpen={changeToOpen}/> // 子コンポーネントにも引き継ぐ
          ))}
        </div>
      )}
    </div>
  );
};

