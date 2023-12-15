import { TreeItem } from '@/components/TreeItem'
import { Node } from '@/types/index'

const items: Node[] = [
  { label: "Unread", isFolder: false },
  { label: "Threads", isFolder: true, children: [
    { label: "General", isFolder: true, children: [
      { label: "shin", isFolder: false },
      { label: "shin2", isFolder: false },
    ] },
    { label: "Random", isFolder: false },
    { label: "Open Source Projects", isFolder: false },
  ]},
  { label: "Direct Messages", isFolder: true, children: [
    { label: "Alice", isFolder: false },
    { label: "Alice2", isFolder: false },
    { label: "Bob2", isFolder: false },
    { label: "Charlie2", isFolder: false },
    { label: "Bob", isFolder: false },
  ]},
];

export const Memo = () => {
  return (
    <div className="p-4">
      <div>Auth</div>
      <div className="mt-4">
        {items.map((item, index) => <TreeItem key={index} {...item} level={0} />)}
      </div>
    </div>
  )
}