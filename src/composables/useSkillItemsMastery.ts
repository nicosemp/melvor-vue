import type { StoreTrees, TreeId, Trees } from '@/types/woodcutting'
import { useExperience } from './useExperience'
import { TREE_IDS, TREES } from '@/constants/woodcutting'
import { computed } from 'vue'

// TODO: This should be shared by all skills, instead of Woodcutting only.

type SkillsItems = Trees // Union type, add other skills' items here

type Props = {}

export const useSkillItemsMastery = () => {
  const trees: StoreTrees = TREE_IDS.reduce((acc, treeId) => {
    const { exp, expOverCurrentLevel, expToNextLevel, level } = useExperience()

    const isUnlocked = computed(() => level.value >= TREES[treeId].requirements.level)

    const masteryExpGain = 11111111111 // TODO: Implement the correct formula for gaining mastery exp

    acc[treeId] = {
      masteryExp: exp,
      level: level,
      expOverCurrentLevel: expOverCurrentLevel,
      expToNextLevel: expToNextLevel,
      isUnlocked
    }
    return acc
  }, {} as StoreTrees)

  const gainMasteryExp = (itemId: TreeId, unlockedItemsCount: number) => {
    const skillItemsCount = TREE_IDS.length
    const playerTotalSkillLevels = Object.entries(trees).reduce(
      (acc, item) => acc + item[1].level.value,
      0
    )
    const totalSkillLevels = skillItemsCount * 99

    // TODO: Implement the correct formula for gaining mastery exp
    const gainedMasteryExp =
      unlockedItemsCount * (playerTotalSkillLevels / totalSkillLevels) + skillItemsCount
    console.log('update exp: ', gainedMasteryExp)
    trees[itemId].masteryExp.value += gainedMasteryExp

    return gainedMasteryExp
  }

  return { trees, gainMasteryExp }
}
