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
    const gameSaveString = JSON.stringify(gameSave, replacer)
    const gameSaveB64 = btoa(gameSaveString)
    localStorage.setItem('gamesave', gameSaveB64)
  }

  const loadGameSave = () => {
    const gameSaveB64 = localStorage.getItem('gamesave')
    if (!gameSaveB64) return

    const gameSaveString = atob(gameSaveB64)
    const gameSave: gameSave = JSON.parse(gameSaveString, reviver)

    inventoryStore.coins = gameSave.coins
    inventoryStore.itemsQuantities = gameSave.inventory
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

// From: https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
// Both JSON.stringify and JSON.parse support a second argument.
// replacer and reviver respectively.
// With replacer and reviver below it's possible to add support
// for native Map object, including deeply nested values
/**
 * Used as a replacer for JSON.stringify to stringify Map objects
 */
function replacer(_key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()) // or with spread: value: [...value]
    }
  } else {
    return value
  }
}

/**
 * Used as a reviver for JSON.parse to parse Map objects
 */
function reviver(_key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }
  }
  return value
}
