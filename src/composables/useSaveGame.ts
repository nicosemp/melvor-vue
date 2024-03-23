import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'

export const useSaveGame = () => {
  const inventoryStore = useInventoryStore()
  const woodcuttingStore = useWoodcuttingStore()

  const saveGame = () => {
    const gameSave = {
      inventory: inventoryStore.getItemsQuantities(),
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
      const gameSave = JSON.parse(gameSaveString)

      // TODO: Help TypeScript understand that gameSave is a valid object
      inventoryStore.setItemsQuantities(gameSave.inventory)
      woodcuttingStore.setExp(gameSave.woodcuttingExp)
    }
  }

  return { saveGame, loadGameSave }
}
