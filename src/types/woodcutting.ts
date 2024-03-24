import type { InventoryItemId } from './inventory'

export type TreeId = 1 | 2 | 3

export type Trees = {
  [id in TreeId]: {
    readonly name: string
    readonly interval: number
    readonly producedItemId: InventoryItemId
    readonly exp: number
  }
}

export type ActiveTreeId = TreeId | null
