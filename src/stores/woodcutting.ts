import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { useSkillAction } from '@/composables/useSkillAction'
import { useSkillExperience } from '@/composables/useSkillExperience'
import { TREES } from '@/constants/woodcutting'
import type { ActiveTreeId, TreeId } from '@/types/woodcutting'

import { useInventoryStore } from './inventory'

const SKILL_NAME = 'woodcutting'

export const useWoodcuttingStore = defineStore(SKILL_NAME, () => {
  const inventoryStore = useInventoryStore()

  const { activateAction, deactivateAction } = useSkillAction(SKILL_NAME)
  const { exp, level, expOverCurrentLevel, expToNextLevel, gainExp } = useSkillExperience()

  const activeTreeId: Ref<ActiveTreeId> = ref(null)

  const toggleActiveAction = (treeId: TreeId) => {
    if (activeTreeId.value === treeId) {
      activeTreeId.value = null
      deactivateAction()
      return
    }

    activeTreeId.value = treeId
    activateAction(TREES[treeId].interval, executeActiveAction)
  }

  const doubleLogProbability = ref(0.05)
  const actionsCount = ref(0)

  const executeActiveAction = () => {
    // If no active tree, do nothing
    if (!activeTreeId.value) return

    // Increment actions count
    actionsCount.value += 1

    // Determine if we get double logs
    const doubleLogMultiplier = Math.random() < doubleLogProbability.value ? 2 : 1

    // Generate a tree log
    const activeTree = TREES[activeTreeId.value]
    inventoryStore.addItem(activeTree.producedItemId, 1 * doubleLogMultiplier)

    // Gain experience
    gainExp(activeTree.exp)
  }

  const executeOfflineProgress = (saveTime: number, savedActiveTreeId: ActiveTreeId) => {
    if (!savedActiveTreeId) return

    activeTreeId.value = savedActiveTreeId
    const interval = TREES[savedActiveTreeId].interval
    const offlineActions = Math.floor((Date.now() - saveTime) / interval)

    for (let i = 0; i < offlineActions; i++) {
      executeActiveAction()
    }

    activateAction(interval, executeActiveAction)
  }

  return {
    exp,
    level,
    expOverCurrentLevel,
    expToNextLevel,
    activeTreeId,
    actionsCount,
    toggleActiveAction,
    executeActiveAction,
    activateAction,
    executeOfflineProgress
  }
})
