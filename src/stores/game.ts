import { ref, onUnmounted } from 'vue'
import { defineStore } from 'pinia'

import type { ActiveSkill, Skill } from '@/types/game'

import { useWoodcuttingStore } from './woodcutting'

export const useGameStore = defineStore('game', () => {
  const woodcuttingStore = useWoodcuttingStore()

  let tickInterval: NodeJS.Timeout

  const activeSkill = ref<ActiveSkill>(null)

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
    // FIXME: This runs on any screen, but the ProgressBar animation
    // only works on the Woodcutting screen.
    // The animation should start with the remaining time of the Interval.
    // If the Interval is 5 seconds and 3 seconds already passed,
    // the ProgressBar should start at 60%.
  }

  const stopAction = () => {
    clearInterval(tickInterval)
    activeSkill.value = null
  }

  onUnmounted(() => {
    clearInterval(tickInterval)
  })

  return { activeSkill, startAction, stopAction }
})
