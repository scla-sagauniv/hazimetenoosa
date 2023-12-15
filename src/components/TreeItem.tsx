import { useState } from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import FolderIcon from '@heroicons/react/24/outline/FolderIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import { Node } from '@/types/index'

export const TreeItem = ({ label, isFolder, children, level = 0 }: Node) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    if (isFolder) {
        setIsOpen(!isOpen)
    }
  };

  const indent = level * 20

  const Icon = isFolder ? FolderIcon : DocumentIcon

  return (
    <div style={{ paddingLeft: `${indent}px` }}> 
      <div className="flex items-center" onClick={toggle}>
        {isFolder && (
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
        )}
        <Icon className="w-5 h-5" />
        <span className="ml-1">{label}</span>
      </div>
      {isOpen && children && children.map((child, index) => (
        <TreeItem key={index} {...child} level={level + 1} />
      ))}
    </div>
  );
};