import type { TreeItem, TreeItemId } from '../types/tree';

export default class TreeStore {
  private items: TreeItem[];

  constructor(initialItems: TreeItem[]) {
    this.items = initialItems;
  }

  getAll(): TreeItem[] {
    return this.items;
  }

  getItem(id: TreeItemId): TreeItem | undefined {
    return this.items.find(item => item.id === id);
  }

  getChildren(id: TreeItemId): TreeItem[] {
    return this.items.filter(item => item.parent === id);
  }

  getAllChildren(id: TreeItemId): TreeItem[] {
    return this.items
      .filter(item => item.parent === id)
      .flatMap(item => [item, ...this.getAllChildren(item.id)]);
  }

  getAllParents(id: TreeItemId): TreeItem[] {
    const parents: TreeItem[] = [];
    const queueIds: TreeItemId[] = [id];
    while (queueIds.length > 0) {
      const shiftedId = queueIds.shift();
      if (shiftedId === undefined) continue;
      const foundItem = this.items.find(item => item.id === shiftedId);
      if (!foundItem || foundItem.parent === null) continue;
      const foundParent = this.items.find(item => item.id === foundItem.parent);
      if (!foundParent) continue;
      parents.push(foundParent);
      queueIds.push(foundParent.id);
    }
    return parents;
  }

  setItems(items: TreeItem[]): void {
    this.items = items;
  }

  addItem(item: TreeItem): void {
    this.items.push(item);
  }

  removeItem(id: TreeItemId): void {
    const children = this.getAllChildren(id);
    const removeIds = new Set([id, ...children.map(child => child.id)]);
    this.items = this.items.filter(item => !removeIds.has(item.id));
  }

  updateItem(item: TreeItem): void {
    const foundIndex = this.items.findIndex(iteratedItem => iteratedItem.id === item.id);
    if (foundIndex >= 0) {
      this.items[foundIndex] = item;
    }
  }
}