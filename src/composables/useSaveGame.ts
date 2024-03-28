import { useGameStore } from '@/stores/game'
import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import type { ActiveSkill } from '@/types/game'
import type { ItemsQuantities } from '@/types/inventory'
import type { ActiveTreeId } from '@/types/woodcutting'

type gameSave = {
  time: number
  coins: number
  inventory: ItemsQuantities
  activeSkillId: ActiveSkill
  woodcutting: {
    exp: number
    activeTreeId: ActiveTreeId
  }
}

export const useSaveGame = () => {
  const gameStore = useGameStore()
  const inventoryStore = useInventoryStore()
  const woodcuttingStore = useWoodcuttingStore()

  const saveGame = () => {
    const gameSave: gameSave = {
      time: Date.now(),
      coins: inventoryStore.coins,
      inventory: inventoryStore.itemsQuantities,
      activeSkillId: gameStore.activeSkillId,
      woodcutting: {
        exp: woodcuttingStore.exp,
        activeTreeId: woodcuttingStore.activeTreeId
      }
    }
    const gameSaveString = JSON.stringify(gameSave)
    const gameSaveB64 = btoa(gameSaveString)
    localStorage.setItem('gamesave', gameSaveB64)
  }

  const loadGameSave = () => {
    const gameSaveB64 = localStorage.getItem('gamesave')
    if (!gameSaveB64) return

    const gameSaveString = atob(gameSaveB64)
    const gameSave: gameSave = JSON.parse(gameSaveString)

    inventoryStore.coins = gameSave.coins
    inventoryStore.itemsQuantities = { ...inventoryStore.itemsQuantities, ...gameSave.inventory }
    woodcuttingStore.exp = gameSave.woodcutting.exp

    if (gameSave.activeSkillId) {
      gameStore.activeSkillId = gameSave.activeSkillId
      switch (gameSave.activeSkillId) {
        case 'woodcutting':
          woodcuttingStore.executeOfflineProgress(gameSave.time, gameSave.woodcutting.activeTreeId)
          break

        default:
          break
      }
    }
  }

  return { saveGame, loadGameSave }
}
