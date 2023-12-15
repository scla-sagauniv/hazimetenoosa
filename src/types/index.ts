export interface Node {
    id: string
    parentId: string | null
    label: string
    isSecret: boolean
    isFolder: boolean
    children?: Node[]
    level?: number
  }