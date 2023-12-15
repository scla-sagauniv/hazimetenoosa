export interface Node {
    label: string;
    isFolder: boolean;
    children?: Node[];
    level?: number;
  }