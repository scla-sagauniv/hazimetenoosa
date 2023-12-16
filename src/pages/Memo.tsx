import { useState } from 'react'
import { TreeItem } from '@/components/TreeItem'
import { Content } from '@/components/Content';
import { Node } from '@/types/index'
import { useStore } from '@/states/state';

export const Memo = () => {
  const selected = useStore((state) => state.selected)
  const [items, setItems] = useState<Node[]>([
    { id: "1", parentId: null, label: "Unread", isFolder: false, isSecret: false },
    { id: "2", parentId: null, label: "Threads", isFolder: true, isSecret: false, children: [
      { id: "2-1", parentId: "2", label: "General", isFolder: true, isSecret: false, children: [
        { id: "2-1-1", parentId: "2-1", label: "shin", isFolder: false, isSecret: true },
        { id: "2-1-2", parentId: "2-1", label: "shin2", isFolder: false, isSecret: false },
      ] },
      { id: "2-2", parentId: "2", label: "Random", isFolder: false, isSecret: false },
      { id: "2-3", parentId: "2", label: "Open Source Projects", isFolder: false, isSecret: true },
    ]},
    { id: "3", parentId: null, label: "Direct Messages", isFolder: true, isSecret: false, children: [
      { id: "3-1", parentId: "3", label: "Alice", isFolder: false, isSecret: false },
      { id: "3-2", parentId: "3", label: "Alice2", isFolder: false, isSecret: true },
      { id: "3-3", parentId: "3", label: "Bob2", isFolder: false, isSecret: false },
      { id: "3-4", parentId: "3", label: "Charlie2", isFolder: false, isSecret: false },
      { id: "3-5", parentId: "3", label: "Bob", isFolder: false, isSecret: true },
    ]},
  ])

  const findParentNode = (parentId: string, nodes: Node[]): Node | null => {
    for (const node of nodes) {
      if (node.id === parentId) {
        return node;
      }
      if (node.children) {
        const found = findParentNode(parentId, node.children);
        if (found) return found;
      }
    }
    return null
  }

  const addNodeToTree = (newNode: Node, nodes: Node[]): Node[] => {
    return nodes.map(node => {
      if (node.id === newNode.parentId) {
        return {
          ...node,
          children: node.children ? [...node.children, newNode] : [newNode],
        };
      } else if (node.children) {
        return { ...node, children: addNodeToTree(newNode, node.children) };
      } else {
        return node;
      }
    })
  }
  

  const addNewFolder = (parentId: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;

    const newFolder: Node = {
      id: Date.now().toString(),
      parentId: parentId,
      label: 'PlusFolder',
      isFolder: true,
      isSecret: false,
      children: [],
      level: newLevel,
    };

    const updatedItems = addNodeToTree(newFolder, items)
    setItems(updatedItems);
  };

  return (
    <div className={`flex ${selected ? 'bg-black' : ''}`}>
      <div className={`flex-1 ml-4 mt-4 overflow-auto ${selected ? 'text-white' : ''}`}>
        {items.map((item) => (
          <TreeItem key={item.id} {...item} level={0} addNewFolder={addNewFolder} />
        ))}
      </div>
      <div className='mr-4 w-[80%]'><Content/></div>
    </div>
  );
};