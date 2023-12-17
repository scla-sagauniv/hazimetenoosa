export type NodeData = {
  id: number;
  isSecret: boolean;
  isFolder: boolean;
  parentId: number | null;
  children: NodeData[];
  content: Memo | Folder;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  authorId: number;
};

export type TreeItemData = {
  id: number;
  isSecret: boolean;
  isFolder: boolean;
  parentId: number | null;
  children: TreeItemData[];
  content: Memo | Folder;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  authorId: number;
  isOpen: boolean;
  isAdding: boolean;
  level: number;
};

export type Memo = {
  id: number;
  name: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

// export interface Node {
//   id: string
//   parentId: string | null
//   label: string
//   isSecret: boolean
//   isFolder: boolean
//   children?: Node[]
//   level?: number
//   isAdding: boolean
//   isOpen: boolean
// }

export type Folder = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type SigninInputs = {
  email: string;
  password: string;
};

export type SignupInputs = {
  email: string;
  password: string;
  repassword: string;
};
