export type NodeComponent = {
  node: Node;
  isAdding: boolean;
  isOpen: boolean;
  level: number;
};

export type TreeItemData = {
  id: number;
  parentId: number | null;
  isSecret: boolean;
  isFolder: boolean;
  children?: Node[];
  content: Memo | Folder;
  isAdding: boolean;
  isOpen: boolean;
  level: number;
};

export interface Node {
  id: number;
  parentId: number | null;
  isSecret: boolean;
  isFolder: boolean;
  children?: Node[];
  content: Memo | Folder;
}

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
