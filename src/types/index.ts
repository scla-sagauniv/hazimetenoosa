export interface Node {
    id: string
    parentId: string | null
    label: string
    isFolder: boolean
    children?: Node[]
    level?: number
  }