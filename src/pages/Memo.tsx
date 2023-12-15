import React, { useState } from "react";
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';

interface TreeItemProps {
  label: string;
  children?: React.ReactNode;
}

const TreeItem = ({ label, children }: TreeItemProps) => {
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

export const Memo = () => {
  return (
    <div className="p-4">
      <div>Auth</div>
      <div className="mt-4">
        <TreeItem label="Unread" />
        <TreeItem label="Threads">
          <div className="pl-6">
            <TreeItem label="General" />
            <TreeItem label="Random" />
            <TreeItem label="Open Source Projects" />
          </div>
        </TreeItem>
        <TreeItem label="Direct Messages">
          <div className="pl-6">
            <TreeItem label="Alice" />
            <TreeItem label="Alice2" />
            <TreeItem label="Bob2" />
            <TreeItem label="Charlie2" />
            <TreeItem label="Bob" />
          </div>
        </TreeItem>
      </div>
    </div>
  );
};