import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ActiveSkill } from '@/types/game'

export const useGameStore = defineStore('game', () => {
  const activeSkillId = ref<ActiveSkill>(null)

  return { activeSkillId }
})
