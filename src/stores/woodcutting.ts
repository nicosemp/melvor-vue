import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { TREES, type TreeId } from '@/constants/woodcutting'

import { useGameStore } from './game'
import { useInventoryStore } from './inventory'
import { useSkillsStore } from './skills'

export const useWoodcuttingStore = defineStore('woodcutting', () => {
  const gameStore = useGameStore()
  const inventoryStore = useInventoryStore()
  const skillsStore = useSkillsStore()

  const trees = ref(TREES)
  const activeTreeId: Ref<TreeId | null> = ref(null)

  const toggleActiveAction = (treeId: TreeId) => {
    if (activeTreeId.value === treeId) {
      activeTreeId.value = null
      gameStore.stopAction()
      return
    }

    activeTreeId.value = treeId
    gameStore.startAction('woodcutting', trees.value[treeId].interval)
  }

  const doubleTreeLogProbability = ref(0.05)
  const actionsCount = ref(0)

  const executeActiveAction = () => {
    // If no active tree, do nothing
    if (!activeTreeId.value) return

    // Increment actions count
    actionsCount.value += 1

    // Determine if we get double logs
    const doubleLogMultiplier = Math.random() < doubleTreeLogProbability.value ? 2 : 1

    // Generate a tree log
    const activeTree = trees.value[activeTreeId.value]
    inventoryStore.addItem(activeTree.producedItemId, 1 * doubleLogMultiplier)

    // Gain experience
    skillsStore.gainExperience('woodcutting', activeTree.exp)
  }

  return { trees, activeTreeId, actionsCount, toggleActiveAction, executeActiveAction }
})
