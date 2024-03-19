import { ref, onUnmounted } from 'vue'
import { defineStore } from 'pinia'

import { type Skill } from '@/constants/game'
import { useTreecuttingStore } from './treecutting'

export const useGameStore = defineStore('game', () => {
  const treecuttingStore = useTreecuttingStore()

  const tickCount = ref(0)
  let tickInterval: NodeJS.Timeout

  const activeSkill = ref<Skill | null>(null)

  const updateGame = () => {
    tickCount.value += 1
    // TODO: Add your game logic here (e.g., update entities, check collisions)

    switch (activeSkill.value) {
      case 'treecutting':
        treecuttingStore.executeSkillAction()
        break
      // TODO: Add more cases for other skills
    }
  }

  const startAction = (skill: Skill, tickRate: number) => {
    // Clear any previous action
    clearInterval(tickInterval)

    // Start new action
    activeSkill.value = skill
    tickInterval = setInterval(updateGame, tickRate)
  }

  const stopAction = () => {
    clearInterval(tickInterval)
    activeSkill.value = null
  }

  onUnmounted(() => {
    clearInterval(tickInterval)
  })

  return { tickCount, startAction, stopAction }
})
