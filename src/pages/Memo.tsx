import { useEffect, useState } from "react";
import { TreeItem } from "@/components/TreeItem";
import { Content } from "@/components/Content";
import { NodeData, TreeItemData } from "@/models/index";
import { useStore } from "@/states/state";

import { nodeDatas } from "@/constants/demodata";

export const Memo = () => {
  const selected = useStore((state) => state.selected);
  const [items, setItems] = useState<TreeItemData[]>([]);
  let nodeCount = 0;

  useEffect(() => {
    function deepConverter(nodeDatas: NodeData[]): TreeItemData[] {
      return nodeDatas.map((nodeData) => {
        nodeCount++;
        if (nodeData.children.length === 0) {
          return {
            ...nodeData,
            children: [],
            isAdding: false,
            isOpen: false,
            level: 0,
          };
        } else {
          return {
            ...nodeData,
            children: deepConverter(nodeData.children),
            isAdding: false,
            isOpen: false,
            level: 0,
          };
        }
      });
    }

    const treeItemDatas: TreeItemData[] = deepConverter(nodeDatas);
    setItems(treeItemDatas);
    console.log(treeItemDatas, nodeCount);
  }, []);

  const mapping = (item: TreeItemData, targetId: number): TreeItemData => {
    if (item.id === targetId) {
      return {
        ...item,
        isOpen: true,
      };
    } else if (item.children) {
      const newChildren = item.children.map((child) =>
        mapping(child, targetId)
      );
      return {
        ...item,
        children: newChildren,
      };
    }
    return item;
  };

  const changeToOpen = (id: number) => {
    setItems((items) => {
      return items.map((item) => {
        return mapping(item, id);
      });
    });
  };

  const changeToAdding = (id: number) => {
    setItems((items) => items.map((item) => mappingForAdding(item, id)));
  };

  const mappingForAdding = (
    item: TreeItemData,
    targetId: number
  ): TreeItemData => {
    if (item.id === targetId) {
      return {
        ...item,
        isAdding: !item.isAdding,
      };
    } else if (item.children) {
      const newChildren = item.children.map((child) =>
        mappingForAdding(child, targetId)
      );
      return {
        ...item,
        children: newChildren,
      };
    }
    return item;
  };

  const findParentNode = (
    parentId: number,
    nodes: TreeItemData[]
  ): TreeItemData | null => {
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

  const addNodeToTree = (
    newNode: TreeItemData,
    nodes: TreeItemData[]
  ): TreeItemData[] => {
    return nodes.map((node) => {
      if (node.id === newNode.parentId) {
        return {
          ...node,
          children: node.children ? [...node.children, newNode] : [newNode],
        };
      } else if (node.children) {
        return {
          ...node,
          children: addNodeToTree(newNode, node.children),
        };
      } else {
        return node;
      }
    });
  };

  const addNewFolder = (parentId: number, folderName: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFolder: TreeItemData = {
      id: items.length,
      parentId: parentId,
      isFolder: true,
      isSecret: false,
      children: [],
      level: newLevel,
      content: {
        id: items.length,
        name: folderName,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      isOpen: false,
      isAdding: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      authorId: 0,
    };

    const updatedItems = addNodeToTree(newFolder, items);
    setItems(updatedItems);
  };

  const addNewFile = (parentId: number, fileName: string) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFile: TreeItemData = {
      id: items.length,
      parentId: parentId,
      isFolder: false,
      isSecret: false,
      children: [],
      content: {
        id: items.length,
        name: fileName,
        body: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      level: newLevel,
      isOpen: false,
      isAdding: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      authorId: 0,
    };

    const updatedItems = addNodeToTree(newFile, items);
    setItems(updatedItems);
  };

  return (
    <div className={`flex ${selected ? "bg-black" : ""}`}>
      <div
        className={`flex-1 ml-4 mt-4 overflow-auto ${
          selected ? "text-white" : ""
        }`}
      >
        {items.map((item) => (
          <TreeItem
            key={item.id}
            item={item}
            level={0}
            addNewFolder={addNewFolder}
            addNewFile={addNewFile}
            changeToAdding={changeToAdding}
            changeToOpen={changeToOpen}
          />
        ))}
      </div>
      <div className="mr-4 w-[80%]">
        <Content />
      </div>
    </div>
  );
};
