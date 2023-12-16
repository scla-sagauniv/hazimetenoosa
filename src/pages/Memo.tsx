import { useState } from 'react'
import { TreeItem } from '@/components/TreeItem'
import { Content } from '@/components/Content';
import { Node } from '@/types/index'
import { useStore } from '@/states/state';

export const Memo = () => {
  const selected = useStore((state) => state.selected)
  const [items, setItems] = useState<Node[]>([
    {
      id: "1",
      parentId: null,
      label: "Unread",
      isFolder: false,
      isSecret: false,
      isEditing: false,
      isOpen: false,
    },
    {
      id: "2",
      parentId: null,
      label: "Threads",
      isFolder: true,
      isSecret: false,
      isEditing: false,
      isOpen: false,
      children: [
        {
          id: "2-1",
          parentId: "2",
          label: "General",
          isFolder: true,
          isSecret: false,
          isEditing: false,
          isOpen: false,
          children: [
            {
              id: "2-1-1",
              parentId: "2-1",
              label: "shin",
              isFolder: false,
              isSecret: true,
              isEditing: false,
              isOpen: false,
            },
            {
              id: "2-1-2",
              parentId: "2-1",
              label: "shin2",
              isFolder: false,
              isSecret: false,
              isEditing: false,
              isOpen: false,
            },
          ],
        },
      ],
    },
  ]);


  const mapping = (item: Node, targetId: string): Node => {
    if (item.id === targetId) {
      return {
        ...item,
        isOpen: true,
      };
    } else if (item.children) {
      const newChildren = item.children.map((child) => mapping(child, targetId));
        return {
        ...item,
        children: newChildren,
      };
    }
      return item;
  }

  const changeToOpen = (id: string) => {
    setItems( items => {
      return items.map((item) => {
        return mapping(item, id);
      })
    } 
    );
  }


  const changeToEditing = (id: string) => {
    setItems(items => items.map(item => mappingForEditing(item, id)));
  };
  
  const mappingForEditing = (item: Node, targetId: string): Node => {
    if (item.id === targetId) {
      return {
        ...item,
        isEditing: !item.isEditing
      };
    } else if (item.children) {
      const newChildren = item.children.map(child => mappingForEditing(child, targetId));
      return {
        ...item,
        children: newChildren
      };
    }
    return item;
  };

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
    return null;
  };

  const addNodeToTree = (newNode: Node, nodes: Node[]): Node[] => {
    return nodes.map((node) => {
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
    });
  };

  const addNewFolder = (parentId: string, folderName: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFolder: Node = {
      id: Date.now().toString(),
      parentId: parentId,
      label: folderName,
      isFolder: true,
      isSecret: false,
      children: [],
      level: newLevel,
      isOpen: false,
      isEditing: false,
    };

    const updatedItems = addNodeToTree(newFolder, items);
    setItems(updatedItems);
  };

  const addNewFile = (parentId: string, fileName: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFile: Node = {
      id: Date.now().toString(),
      parentId: parentId,
      label: fileName,
      isFolder: false,
      isSecret: false,
      children: [],
      level: newLevel,
      isOpen: false,
      isEditing: false,
    };

    const updatedItems = addNodeToTree(newFile, items);
    setItems(updatedItems);
  };

  return (
    <div className={`flex ${selected ? 'bg-black' : ''}`}>
      <div className={`flex-1 ml-4 mt-4 overflow-auto ${selected ? 'text-white' : ''}`}>
        {items.map((item) => (
          <TreeItem
            key={item.id}
            {...item}
            level={0}
            addNewFolder={addNewFolder}
            addNewFile={addNewFile}
            changeToEditing={changeToEditing}
            changeToOpen={changeToOpen}
          />
        ))}
      </div>
      <div className='mr-4 w-[80%]'><Content/></div>
    </div>
  );
};
