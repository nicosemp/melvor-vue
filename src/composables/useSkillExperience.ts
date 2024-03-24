import { ref, watch, onMounted } from 'vue'

import { calcExpToLevel } from '@/utils/experience'

export const useSkillExperience = () => {
  const exp = ref(0)

  const level = ref(1)
  const expOverCurrentLevel = ref(0)
  expOverCurrentLevel.value = exp.value
  const expToNextLevel = ref(calcExpToLevel(level.value + 1))

  onMounted(() => {
    updateSkillLevel()
  })

  watch(exp, (newExp, oldExp) => {
    expOverCurrentLevel.value += newExp - oldExp

    updateSkillLevel()
  })

  /**
   * Increase a Skill's level and adjust expOverCurrentLevel and expToNextLevel
   * until expOverCurrentLevel is less than expToNextLevel
   */
  const updateSkillLevel = () => {
    while (expOverCurrentLevel.value >= expToNextLevel.value) {
      expOverCurrentLevel.value -= expToNextLevel.value
      level.value++
      expToNextLevel.value = calcExpToLevel(level.value + 1)
    }
  }

  /**
   * Gain a specific amount of experience.
   * @param amount The amount of exp to add.
   */
  const gainExp = (amount: number) => {
    exp.value += amount
  }

  return { exp, level, expOverCurrentLevel, expToNextLevel, gainExp }
}
