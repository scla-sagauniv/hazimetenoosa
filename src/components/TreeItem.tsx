import { useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Node } from "@/types/index";
import { FaFolderPlus } from "react-icons/fa";
import { FaFileMedical } from "react-icons/fa";
import { useStore } from "@/states/state";

export const TreeItem = ({
  id,
  label,
  isAdding,
  isOpen,
  isSecret,
  isFolder,
  children,
  level = 0,
  addNewFolder,
  addNewFile,
  changeToAdding,
  changeToOpen,
}: Node & { addNewFolder?: (parentId: string, folderName: string) => void } & {
  changeToAdding?: (id: string) => void;
} & { changeToOpen?: (id: string) => void } & {
  addNewFile?: (parentId: string, fileName: string) => void;
}) => {
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");
  const [showFileInput, setShowFileInput] = useState<boolean>(false);

  const handleAddFolder = () => {
    if (changeToAdding) {
      changeToAdding(id);
    }
    if (changeToOpen) {
      changeToOpen(id);
    }
  };

  const handleAddFile = () => {
    setShowFileInput(true);
    if (changeToOpen) {
      changeToOpen(id);
    }
  };

  const selected = useStore((state) => state.selected);
  const indent = level * 20;
  const Icon = isFolder ? FolderIcon : DocumentIcon;

  if (isSecret) {
    if (!selected) {
      return null;
    }
  }

  const handleOpen = () => {
    if (changeToOpen) {
      changeToOpen(id);
    }
  };

  return (
    <div style={{ paddingLeft: `${indent}px` }}>
      <div className="flex items-cente overflow-hidden">
        <Checkbox className={`mr-2 ${selected ? "bg-white" : ""}`} />
        {isFolder && (
          <ChevronDownIcon
            className={`w-5 h-5 mr-2 transition-transform ${
              isOpen ? "rotate-0" : "-rotate-90"
            }`}
            onClick={handleOpen}
          />
        )}
        {!isFolder && <Icon className="w-5 h-5 mr-2" />}
        <div className="ml-1">{label}</div>

        {isFolder && (
          <FaFolderPlus
            className="w-[20px] h-[20px] ml-2 cursor-pointer"
            onClick={handleAddFolder}
          />
        )}
        {isFolder && (
          <FaFileMedical
            className="w-[20px] h-[20px] ml-2 cursor-pointer"
            onClick={handleAddFile}
          />
        )}
      </div>
      {isOpen && isAdding && isFolder && (
        <div style={{ marginLeft: "20px", paddingLeft: `${indent + 20}px` }}>
          <input
            type="text"
            className={`w-20 border border-black ${
              selected ? "text-black" : ""
            }`}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newFolderName) {
                if (addNewFolder) {
                  addNewFolder(id, newFolderName);
                }
                if (changeToAdding) {
                  changeToAdding(id);
                }
                setNewFolderName("");
              }
            }}
          />
        </div>
      )}
      {showFileInput && (
        <div style={{ marginLeft: "20px", paddingLeft: `${indent + 20}px` }}>
          <input
            type="text"
            className={`w-20 border border-black ${
              selected ? "text-black" : ""
            }`}
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newFileName) {
                if (addNewFile) {
                  addNewFile(id, newFileName);
                }
                if (changeToAdding) {
                  changeToAdding(id);
                }
                setNewFileName("");
                setShowFileInput(false);
              }
            }}
          />
        </div>
      )}
      {isOpen && children && (
        <div style={{ marginLeft: "20px" }}>
          {children.map((child) => (
            <TreeItem
              key={child.id}
              {...child}
              level={level + 1}
              addNewFolder={addNewFolder}
              addNewFile={addNewFile}
              changeToAdding={changeToAdding}
              changeToOpen={changeToOpen}
            /> // 子コンポーネントにも引き継ぐ
          ))}
        </div>
      )}
    </div>
  );
};
