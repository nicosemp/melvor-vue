import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { TREES, type TreeId } from '@/constants/treecutting'
import { useGameStore } from './game'
import { useInventoryStore } from './inventory'

export const useTreecuttingStore = defineStore('treecutting', () => {
  const gameStore = useGameStore()
  const inventoryStore = useInventoryStore()

  const trees = ref(TREES)
  const activeTreeId: Ref<TreeId | null> = ref(null)

  const doubleTreeLogProbability = ref(0.05)

  const toggleCutTree = (treeId: TreeId) => {
    if (activeTreeId.value === treeId) {
      activeTreeId.value = null
      gameStore.stopAction()
      return
    }

    activeTreeId.value = treeId
    gameStore.startAction('treecutting', trees.value[treeId].interval)
  }

  const executeSkillAction = () => {
    // If no active tree, do nothing
    if (!activeTreeId.value) return

    // Determine if we get double logs
    const doubleLogMultiplier = Math.random() < doubleTreeLogProbability.value ? 2 : 1

    // Generate a tree log
    const activeTree = trees.value[activeTreeId.value]
    inventoryStore.addItem(activeTree.producedItemId, 1 * doubleLogMultiplier)
  }

  return { trees, activeTreeId, toggleCutTree, executeSkillAction }
})
