export type InventoryItemId = 1 | 2 | 3 | 4

export type InventoryItems = {
  [id in InventoryItemId]: {
    readonly name: string
    quantity: number
  }
}

export const INVENTORY_ITEMS: InventoryItems = {
  1: {
    name: 'Oak Log',
    quantity: 0
  },
  2: {
    name: 'Pine Log',
    quantity: 0
  },
  3: {
    name: 'Birch Log',
    quantity: 0
  },
  4: {
    name: 'Willow Log',
    quantity: 0
  }
}
