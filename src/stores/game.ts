import { ref, onUnmounted } from 'vue'
import { defineStore } from 'pinia'

import type { Skill } from '@/types/game'

import { useWoodcuttingStore } from './woodcutting'

export const useGameStore = defineStore('game', () => {
  const woodcuttingStore = useWoodcuttingStore()

  let tickInterval: NodeJS.Timeout

  const activeSkill = ref<Skill | null>(null)

  const updateGame = () => {
    // Game logic: execute active skill action
    switch (activeSkill.value) {
      case 'woodcutting':
        woodcuttingStore.executeActiveAction()
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

  return { startAction, stopAction }
})
