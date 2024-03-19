import { type InventoryItemId } from './inventory'

export type TreeId = 1 | 2 | 3

export type Trees = {
  [id in TreeId]: {
    readonly name: string
    readonly interval: number
    readonly producedItemId: InventoryItemId
  }
}

export const TREES: Trees = {
  1: {
    name: 'Oak',
    interval: 500,
    // TODO: Should this producedItemId should come from a mapping one to many?
    // A skill could produce multiple items...
    producedItemId: 1
  },
  2: {
    name: 'Pine',
    interval: 1000,
    producedItemId: 2
  },
  3: {
    name: 'Birch',
    interval: 2000,
    producedItemId: 3
  }
} as const
