import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { useSkillAction } from '@/composables/useSkillAction'
import { useExperience } from '@/composables/useExperience'
import { useSkillItemsMastery } from '@/composables/useSkillItemsMastery'
import { TREES, MAX_POOL_EXP } from '@/constants/woodcutting'
import type { ActiveTreeId, TreeId } from '@/types/woodcutting'

import { useInventoryStore } from './inventory'

const SKILL_NAME = 'woodcutting'

export const useWoodcuttingStore = defineStore(SKILL_NAME, () => {
  const inventoryStore = useInventoryStore()

  const { activateAction, deactivateAction } = useSkillAction(SKILL_NAME)
  const { exp, level, expOverCurrentLevel, expToNextLevel } = useExperience()

  const { trees, gainMasteryExp } = useSkillItemsMastery()

  const masteryPoolExp = ref(0)

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

    activateAction(TREES[treeId].interval, executeActiveAction)
  }

  const doubleLogProbability = ref(0.05)
  const actionsCount = ref(0) // This is used for resetting the action's loading animation

  /**
   * Execute this skill's active action
   */
  const executeActiveAction = (): void => {
    // If no active tree, do nothing
    if (!activeTreeId.value) return

    const ACTIVE_TREE = TREES[activeTreeId.value]
    const activeTree = trees[activeTreeId.value]

    // Increment actions count
    actionsCount.value += 1

    // Determine if we get double logs
    const doubleLogMultiplier = Math.random() < doubleLogProbability.value ? 2 : 1

    // Generate a tree log
    inventoryStore.addItem(ACTIVE_TREE.producedItemId, 1 * doubleLogMultiplier)

    // Gain skill experience
    exp.value += ACTIVE_TREE.exp

    // Gain item mastery experience
    const gainedMasteryExp = gainMasteryExp(activeTreeId.value)

    // Gain mastery pool experience
    masteryPoolExp.value += gainedMasteryExp * 0.25
  }

  /**
   * Execute offline progress for this skill
   * @param saveTime The time when the game was last saved.
   * @param savedActiveTreeId The active tree ID when the game was last saved.
   */
  const executeOfflineProgress = (saveTime: number, savedActiveTreeId: ActiveTreeId): void => {
    if (!savedActiveTreeId) return

    const activeTree = TREES[savedActiveTreeId]

    activeTreeId.value = savedActiveTreeId
    const interval = activeTree.interval
    const offlineActions = Math.floor((Date.now() - saveTime) / interval)

    for (let i = 0; i < offlineActions; i++) {
      executeActiveAction()
    }

    activateAction(interval, executeActiveAction)
  }

  return {
    // Skill Experience
    exp,
    level,
    expOverCurrentLevel,
    expToNextLevel,

    // Pool Experience
    masteryPoolExp,
    MAX_POOL_EXP,

    trees,
    activeTreeId,
    actionsCount,
    toggleActiveAction,
    executeActiveAction,
    activateAction,
    executeOfflineProgress
  }
})
