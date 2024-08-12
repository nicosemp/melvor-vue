import { computed, ref } from 'vue'

export const useSkillItemMastery = () => {
  // TODO: Replace this with the actual logic
  // Composable parameters can be Refs so that the computed value updates when the Ref changes
  const num = ref(2)
  const doubleNum = computed(() => num.value * 2)

  return { doubleNum }
}
