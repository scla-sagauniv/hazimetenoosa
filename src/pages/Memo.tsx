import { useState } from "react";
import { TreeItem } from "@/components/TreeItem";
import { Node } from "@/types/index";

export const Memo = () => {
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
    console.log(item.id, targetId)
    if (item.id === targetId) {
      return {
        ...item,
        isOpen: true,
      };
    }else{
      if(!item.children){
        return item;
      }else{
        item.children.map((child) => {
          return mapping(child, targetId);
        })
      }
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
    setItems( items => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isEditing: true,
          };
        }
        return item;
      })
    }
    );
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

  const addNewFolder = (parentId: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFolder: Node = {
      id: Date.now().toString(),
      parentId: parentId,
      label: "PlusFolder",
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

  return (
    <div className="p-4">
      <div className="mt-4">
        {items.map((item) => (
          <TreeItem
            key={item.id}
            {...item}
            level={0}
            addNewFolder={addNewFolder}
            changeToEditing={changeToEditing}
            changeToOpen={changeToOpen}
          />
        ))}
      </div>
    </div>
  );
};
