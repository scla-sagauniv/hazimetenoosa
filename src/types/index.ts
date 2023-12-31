export interface Node {
    id: string
    parentId: string | null
    label: string
    isSecret: boolean
    isFolder: boolean
    children?: Node[]
    level?: number
    isAdding: boolean
    isOpen: boolean
  }

export type SigninInputs = {
    email: string;
    password: string;
  }
  
export type SignupInputs = {
    email: string;
    password: string;
    repassword: string;
  }