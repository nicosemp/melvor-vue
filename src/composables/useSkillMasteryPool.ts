import { ref } from 'vue'

export const useSkillMasteryPool = () => {
  const poolExp = ref(0)

  /**
   * Gain a specific amount of Mastery Pool experience.
   * @param amount The amount of exp to add.
   */
  const gainPoolExp = (amount: number) => {
    poolExp.value += amount
  }

  return { poolExp, gainPoolExp }
}
