export type TreeItemId = string | number

export type TreeItem = {
  id: TreeItemId;
  parent: TreeItemId | null;
  label: string;
}

export type TreeRow = TreeItem & {
  category: string;
  path: string[];
};
