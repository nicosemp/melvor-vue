import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import type { ItemsQuantities } from '@/types/inventory'

type gameSave = {
  inventory: ItemsQuantities
  woodcuttingExp: number
}

export const useSaveGame = () => {
  const inventoryStore = useInventoryStore()
  const woodcuttingStore = useWoodcuttingStore()

  const saveGame = () => {
    const gameSave: gameSave = {
      inventory: inventoryStore.itemsQuantities,
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
    }
  }

  return { saveGame, loadGameSave }
}
