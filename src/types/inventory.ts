// TODO: Reorganize these items' type and constants
// in a way that can be used well by the store and the components
export type InventoryItemId = 'wood1' | 'wood2' | 'wood3' | 'wood4'

export type InventoryItems = {
  [id in InventoryItemId]: {
    readonly name: string
  }
}

export type ItemsQuantities = { [id in InventoryItemId]: number }
