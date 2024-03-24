import { TREES } from '@/constants/woodcutting'
import { useGameStore } from '@/stores/game'
import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import type { ActiveSkill } from '@/types/game'
import type { ItemsQuantities } from '@/types/inventory'
import type { ActiveTreeId } from '@/types/woodcutting'

type gameSave = {
  inventory: ItemsQuantities
  // TODO: Rename to activeSkillId and ActiveSkillId
  activeSkill: ActiveSkill
  activeTree: ActiveTreeId
  woodcuttingExp: number
}

export const useSaveGame = () => {
  const gameStore = useGameStore()
  const inventoryStore = useInventoryStore()
  const woodcuttingStore = useWoodcuttingStore()

  const saveGame = () => {
    const gameSave: gameSave = {
      inventory: inventoryStore.itemsQuantities,
      // TODO: activeSkill and activeTree should be saved differently. this is too messy
      activeSkill: gameStore.activeSkill,
      activeTree: woodcuttingStore.activeTreeId,
      woodcuttingExp: woodcuttingStore.exp
    }
    const gameSaveString = JSON.stringify(gameSave)
    const gameSaveB64 = btoa(gameSaveString)
    localStorage.setItem('gamesave', gameSaveB64)
  }

  const loadGameSave = () => {
    const gameSaveB64 = localStorage.getItem('gamesave')
    if (gameSaveB64) {
      const gameSaveString = atob(gameSaveB64)
      const gameSave: gameSave = JSON.parse(gameSaveString)

      inventoryStore.itemsQuantities = gameSave.inventory
      woodcuttingStore.exp = gameSave.woodcuttingExp

      if (gameSave.activeSkill && gameSave.activeTree) {
        woodcuttingStore.activeTreeId = gameSave.activeTree
        gameStore.startAction(gameSave.activeSkill, TREES[gameSave.activeTree].interval)
      }
    }
  }

  return { saveGame, loadGameSave }
}
