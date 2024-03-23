// TODO: Reorganize these items' type and constants
// in a way that can be used well by the store and the components
export type InventoryItemId = 'wood1' | 'wood2' | 'wood3' | 'wood4'

export type InventoryItems = {
  [id in InventoryItemId]: {
    readonly name: string
    quantity: number
  }
}

export const INVENTORY_ITEMS: InventoryItems = {
  wood1: {
    name: 'Oak Log',
    quantity: 0
  },
  wood2: {
    name: 'Pine Log',
    quantity: 0
  },
  wood3: {
    name: 'Birch Log',
    quantity: 0
  },
  wood4: {
    name: 'Willow Log',
    quantity: 0
  }
}
