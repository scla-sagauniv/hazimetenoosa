// components/TreeItem.tsx
import { useState } from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import { TreeItemProps } from '@/types/index';

export const TreeItem = ({ label, children, level = 0 }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const indent = level * 20; // 20pxのインデントをレベルごとに追加

  return (
    <div style={{ paddingLeft: `${indent}px` }}> {/* ここでスタイルを適用 */}
      <div className="flex items-center" onClick={toggle}>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`} />
        <FolderIcon className="w-5 h-5" />
        <span className="ml-1">{label}</span>
      </div>
      {isOpen && children && children.map((child, index) => (
        <TreeItem key={index} {...child} level={level + 1} /> // 子要素にレベルを1つ増やして渡す
      ))}
    </div>
  );
};