import type { Ref } from 'vue'
import type { InventoryItemId } from './inventory'

export type TreeId =
  | 'tree1'
  | 'tree2'
  | 'tree3'
  | 'tree4'
  | 'tree5'
  | 'tree6'
  | 'tree7'
  | 'tree8'
  | 'tree9'

export type Tree = {
  readonly name: string
  readonly imageName: string
  readonly interval: number
  readonly producedItemId: InventoryItemId
  readonly exp: number

  // TODO: This should be shared by all skills
  readonly requirements: {
    readonly level: number
  }
}
export type Trees = { [key in TreeId]: Tree }

export type ActiveTreeId = TreeId | null

export type StoreTree = {
  masteryExp: Ref<number>
  level: Ref<number>
  expOverCurrentLevel: Ref<number>
  expToNextLevel: Ref<number>
}
export type StoreTrees = { [key in TreeId]: StoreTree }
