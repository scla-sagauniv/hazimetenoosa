import { TreeItem } from "@/components/TreeItem";

export const Memo = () => {
  return (
    <div className="p-4">
      <div>Auth</div>
      <div className="mt-4">
        <TreeItem label="Unread" />
        <TreeItem label="Threads">
          <div className="pl-6">
            <TreeItem label="General" />
            <TreeItem label="Random" />
            <TreeItem label="Open Source Projects" />
          </div>
        </TreeItem>
        <TreeItem label="Direct Messages">
          <div className="pl-6">
            <TreeItem label="Alice" />
            <TreeItem label="Alice2" />
            <TreeItem label="Bob2" />
            <TreeItem label="Charlie2" />
            <TreeItem label="Bob" />
          </div>
        </TreeItem>
      </div>
    </div>
  );
};