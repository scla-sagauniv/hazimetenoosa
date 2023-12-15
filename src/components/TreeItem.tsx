import { useState } from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import FolderIcon from '@heroicons/react/24/outline/FolderIcon'
import { TreeItemProps } from '@/types/index'

export const TreeItem = ({ label, children }: TreeItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <div className="flex items-center" onClick={toggle}>
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
          <FolderIcon className="w-5 h-5" />
          <span className="ml-1">{label}</span>
        </div>
        {isOpen && children}
      </div>
    );
  };
  