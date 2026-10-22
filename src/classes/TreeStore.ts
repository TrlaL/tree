import type { TreeItem, TreeItemId } from '../types/tree';

export default class TreeStore {
  private items: TreeItem[] = [];
  private itemsById = new Map<TreeItemId, TreeItem>();
  private childrenById = new Map<TreeItemId, TreeItem[]>();

  constructor(initialItems: TreeItem[]) {
    this.setItems(initialItems);
  }

  getAll(): TreeItem[] {
    return this.items;
  }

  getItem(id: TreeItemId): TreeItem | undefined {
    return this.itemsById.get(id);
  }

  getChildren(id: TreeItemId): TreeItem[] {
    return this.childrenById.get(id) ?? [];
  }

  getAllChildren(id: TreeItemId): TreeItem[] {
    return this.getChildren(id)
      .flatMap(item => [item, ...this.getAllChildren(item.id)]);
  }

  getAllParents(id: TreeItemId): TreeItem[] {
    const parents: TreeItem[] = [];
    let parentId = this.itemsById.get(id)?.parent ?? null;
    while (parentId !== null) {
      const parent = this.itemsById.get(parentId);
      if (!parent) break;
      parents.push(parent);
      parentId = parent.parent;
    }
    return parents;
  }

  setItems(items: TreeItem[]): void {
    this.items = items;
    this.itemsById = new Map();
    this.childrenById = new Map();
    for (const item of items) {
      this.itemsById.set(item.id, item);
      if (item.parent === null) continue;
      const siblings = this.childrenById.get(item.parent);
      if (siblings) {
        siblings.push(item);
      } else {
        this.childrenById.set(item.parent, [item]);
      }
    }
  }

  addItem(item: TreeItem): void {
    this.setItems([...this.items, item]);
  }

  removeItem(id: TreeItemId): void {
    const children = this.getAllChildren(id);
    const removeIds = new Set([id, ...children.map(child => child.id)]);
    this.setItems(this.items.filter(item => !removeIds.has(item.id)));
  }

  updateItem(item: TreeItem): void {
    this.setItems(this.items.map(iteratedItem => iteratedItem.id === item.id ? item : iteratedItem));
  }
}
