import type { InventoryItemId } from './inventory'

export type TreeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Trees = {
  [id in TreeId]: {
    readonly name: string
    readonly interval: number
    readonly producedItemId: InventoryItemId
    readonly exp: number
    // TODO: This should be shared by all skills
    readonly requirements: {
      readonly level: number
    }
  }
}

export type ActiveTreeId = TreeId | null
