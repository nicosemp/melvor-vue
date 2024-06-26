// TODO: Reorganize these items' type and constants
// in a way that can be used well by the store and the components
export type InventoryItemId =
  | 'wood1'
  | 'wood2'
  | 'wood3'
  | 'wood4'
  | 'wood5'
  | 'wood6'
  | 'wood7'
  | 'wood8'
  | 'wood9'

export type InventoryItems = Map<
  InventoryItemId,
  {
    readonly name: string
    readonly value: number
  }
>

export type ItemsQuantities = Map<InventoryItemId, number>

export type Tabs = InventoryItemId[][]
