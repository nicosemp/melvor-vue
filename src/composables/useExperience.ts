import { ref, readonly, watch } from 'vue'

import { calcExpToLevel } from '@/utils/experience'

export const useExperience = () => {
  const exp = ref(0)

  const level = ref(1)
  const expOverCurrentLevel = ref(exp.value)
  const expToNextLevel = ref(calcExpToLevel(level.value + 1))

  watch(exp, (newExp, oldExp) => {
    expOverCurrentLevel.value += newExp - oldExp

    while (expOverCurrentLevel.value >= expToNextLevel.value) {
      expOverCurrentLevel.value -= expToNextLevel.value
      level.value++
      expToNextLevel.value = calcExpToLevel(level.value + 1)
    }
  })

  return {
    exp,
    level: readonly(level),
    expOverCurrentLevel: readonly(expOverCurrentLevel),
    expToNextLevel: readonly(expToNextLevel)
  }
}
