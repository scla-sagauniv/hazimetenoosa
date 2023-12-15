import { TreeItem } from '@/components/TreeItem'
import { TreeItemProps } from '@/types/index'

const items : TreeItemProps[] = [
  { label: "Unread" },
  { label: "Threads", children: [
    { label: "General", children: [
      { label: "shin" },
      { label: "shin2" },
    ] },
    { label: "Random" },
    { label: "Open Source Projects" },
  ]},
  { label: "Direct Messages", children: [
    { label: "Alice" },
    { label: "Alice2" },
    { label: "Bob2" },
    { label: "Charlie2" },
    { label: "Bob" },
  ]},
]


export const Memo = () => {
  return (
    <div className="p-4">
      <div>Auth</div>
      <div className="mt-4">
        {items.map((item, index) => <TreeItem key={index} {...item} level={0} />)}
      </div>
    </div>
  );
};