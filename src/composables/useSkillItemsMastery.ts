import type { StoreTrees, TreeId, Trees } from '@/types/woodcutting'
import { useExperience } from './useExperience'
import { TREE_IDS } from '@/constants/woodcutting'

// TODO: This should be shared by all skills, instead of Woodcutting only.

type SkillsItems = Trees // Union type, add other skills' items here

type Props = {}

type Return = { trees: StoreTrees; gainMasteryExp: (itemId: TreeId) => number }

export const useSkillItemsMastery = (): Return => {
  const trees: StoreTrees = TREE_IDS.reduce((acc, treeId) => {
    const { exp, expOverCurrentLevel, expToNextLevel, level } = useExperience()

    acc[treeId] = {
      masteryExp: exp,
      level: level,
      expOverCurrentLevel: expOverCurrentLevel,
      expToNextLevel: expToNextLevel
    }
    return acc
  }, {} as StoreTrees)

  const gainMasteryExp = (itemId: TreeId) => {
    const skillItemsCount = TREE_IDS.length

    const playerTotalSkillLevels = Object.entries(trees).reduce(
      (acc, item) => acc + item[1].level.value,
      0
    )
    const totalSkillLevels = skillItemsCount * 99

    // TODO: Implement the correct formula for gaining mastery exp
    const gainedMasteryExp = skillItemsCount + playerTotalSkillLevels / totalSkillLevels
    console.log('update exp: ', gainedMasteryExp)
    trees[itemId].masteryExp.value += 100

    return gainedMasteryExp
  }

  return { trees, gainMasteryExp }
}
