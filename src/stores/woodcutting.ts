import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { useSkillAction } from '@/composables/useSkillAction'
import { useSkillExperience } from '@/composables/useSkillExperience'
import { useSkillItemMastery } from '@/composables/useSkillItemMastery'
import { useSkillMasteryPool } from '@/composables/useSkillMasteryPool'
import { TREES, MAX_POOL_EXP } from '@/constants/woodcutting'
import type { ActiveTreeId, StoreTrees, TreeId } from '@/types/woodcutting'

import { useInventoryStore } from './inventory'

const SKILL_NAME = 'woodcutting'

const initializeStoreTrees = () => {
  const storeTrees: StoreTrees = new Map()
  TREES.forEach((_tree, treeId) => {
    storeTrees.set(treeId, {
      masteryXP: 0
    })
  })
  return storeTrees
}

export const useWoodcuttingStore = defineStore(SKILL_NAME, () => {
  const inventoryStore = useInventoryStore()

  const { activateAction, deactivateAction } = useSkillAction(SKILL_NAME)
  const { exp, level, expOverCurrentLevel, expToNextLevel, gainExp } = useSkillExperience()

  // TODO: Replace this with the actual logic
  const {} = useSkillItemMastery()

  const trees: Ref<() => StoreTrees> = ref(initializeStoreTrees)

  const { poolExp, gainPoolExp } = useSkillMasteryPool()

  const activeTreeId: Ref<ActiveTreeId> = ref(null)

  /**
   * Toggle the active tree
   * @param treeId The tree ID to toggle
   * @returns void
   */
  const toggleActiveAction = (treeId: TreeId) => {
    if (activeTreeId.value === treeId) {
      activeTreeId.value = null
      deactivateAction()
      return
    }

    activeTreeId.value = treeId
    const tree = TREES.get(treeId)
    if (tree) {
      activateAction(tree.interval, executeActiveAction)
    }
  }

  const doubleLogProbability = ref(0.05)
  const actionsCount = ref(0) // This is used for resetting the action's loading animation

  /**
   * Execute this skill's active action
   */
  const executeActiveAction = (): void => {
    // If no active tree, do nothing
    if (!activeTreeId.value) return

    const activeTree = TREES.get(activeTreeId.value)

    // If no tree is found, do nothing. This SHOULD never happen
    if (!activeTree) return

    // Increment actions count
    actionsCount.value += 1

    // Determine if we get double logs
    const doubleLogMultiplier = Math.random() < doubleLogProbability.value ? 2 : 1

    // Generate a tree log
    inventoryStore.addItem(activeTree.producedItemId, 1 * doubleLogMultiplier)

    // Gain experience
    gainExp(activeTree.exp)

    // Gain pool experience
    gainPoolExp(activeTree.exp * 0.25)
  }

  /**
   * Execute offline progress for this skill
   * @param saveTime The time when the game was last saved.
   * @param savedActiveTreeId The active tree ID when the game was last saved.
   */
  const executeOfflineProgress = (saveTime: number, savedActiveTreeId: ActiveTreeId): void => {
    if (!savedActiveTreeId) return

    const activeTree = TREES.get(savedActiveTreeId)
    if (!activeTree) {
      // TODO: Handle this case with a "broken save" message
      return
    }

    activeTreeId.value = savedActiveTreeId
    const interval = activeTree.interval
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

    // Pool Experience
    poolExp,
    MAX_POOL_EXP,
    gainPoolExp,

    activeTreeId,
    actionsCount,
    toggleActiveAction,
    executeActiveAction,
    activateAction,
    executeOfflineProgress
  }
})
