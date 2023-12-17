import { useState } from "react";
import { TreeItem } from "@/components/TreeItem";
import { Content } from "@/components/Content";
import { Node, NodeComponent, TreeItemData } from "@/types/index";
import { useStore } from "@/states/state";

export const Memo = () => {
  const selected = useStore((state) => state.selected);
  const [items, setItems] = useState<TreeItemData[]>([]);
  // {
  //   node: {
  //     id: 1,
  //     parentId: null,
  //     isFolder: false,
  //     isSecret: false,
  //     content: [
  //       { id: 1, name: "test1", body: "", createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
  //     ]
  //   },
  //   isAdding: false,
  //   isOpen: false
  // },
  // {
  //   node: {
  //     id: 2,
  //     parentId: null,
  //     isSecret: false,
  //     isFolder: true,
  //     children: [
  //        {
  //           id: 2.1,
  //           parentId: 2,
  //           isSecret: false,
  //           isFolder: false,
  //           content: [
  //             { id: 2.1, name: "test2.1", body: "", createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
  //           ]
  //         }
  //     ],
  //     content: [{id: 2, name: "test2", createdAt: new Date(), updatedAt: new Date(), deletedAt: null}]
  //   },
  //   isAdding: false,
  //   isOpen: false
  // }
  const datas: Node[] = [
    {
      id: 1,
      parentId: null,
      isFolder: false,
      isSecret: false,
      content: {
        id: 1,
        name: "test1",
        body: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    },
    {
      id: 2,
      parentId: null,
      isSecret: false,
      isFolder: true,
      children: [
        {
          id: 2.1,
          parentId: 2,
          isSecret: false,
          isFolder: false,
          content: {
            id: 2.1,
            name: "test2.1",
            body: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        },
      ],
      content: {
        id: 2,
        name: "test2",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    },
  ];

  // transform Node[] to TreeItemData[]
  setItems(
    datas.map((data) => {
      return {
        id: data.id,
        parentId: data.parentId,
        isSecret: data.isSecret,
        isFolder: data.isFolder,
        children: data.children,
        content: data.content,
        isAdding: false,
        isOpen: false,
        level: 0,
      };
    })
  );

  const mapping = (item: TreeItemData, targetId: number): TreeItemData => {
    if (item.id === targetId) {
      return {
        ...item,
        isOpen: true,
      };
    } else if (item.children) {
      const newChildren = item.children.map((child) =>
        mapping(, targetId)
      );
      return {
        ...item,
        children: {
          children: newChildren,
        },
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
    item: NodeComponent,
    targetId: number
  ): NodeComponent => {
    if (item.node.id === targetId) {
      return {
        ...item,
        isAdding: !item.isAdding,
      };
    } else if (item.node.children) {
      const newChildren = item.node.children.map((child) =>
        mappingForAdding(child, targetId)
      );
      return {
        ...item,
        node: {
          ...item.node,
          children: newChildren,
        },
      };
    }
    return item;
  };

  const findParentNode = (
    parentId: number,
    nodes: NodeComponent[]
  ): NodeComponent | null => {
    for (const node of nodes) {
      if (node.node.id === parentId) {
        return node;
      }
      if (node.node.children) {
        const found = findParentNode(parentId, node.node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const addNodeToTree = (
    newNode: NodeComponent,
    nodes: NodeComponent[]
  ): NodeComponent[] => {
    return nodes.map((node) => {
      if (node.node.id === newNode.node.parentId) {
        return {
          ...node,
          children: node.node.children
            ? [...node.node.children, newNode]
            : [newNode],
        };
      } else if (node.node.children) {
        return {
          ...node,
          children: addNodeToTree(newNode, node.node.children),
        };
      } else {
        return node;
      }
    });
  };

  const addNewFolder = (parentId: number, folderName: number) => {
    const parentNode = findParentNode(parentId, items);
    const newLevel = parentNode?.level != null ? parentNode.level + 1 : 0;
    const newFolder: NodeComponent = {
      node: Date.now(),
      parentId: parentId,
      label: folderName,
      isFolder: true,
      isSecret: false,
      children: [],
      level: newLevel,
      isOpen: false,
      isAdding: false,
    };

    const updatedItems = addNodeToTree(newFolder, items);
    setItems(updatedItems);
  };

  const addNewFile = (parentId: number, fileName: string) => {
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
      isAdding: false,
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
            {...item}
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
