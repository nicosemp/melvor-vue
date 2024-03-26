import { useGameStore } from '@/stores/game'
import type { SkillId } from '@/types/game'

export const useSkillAction = (skillId: SkillId) => {
  const gameStore = useGameStore()

  let tickInterval: NodeJS.Timeout

  /**
   * This function activates a skill action.
   * @param interval The action time.
   * @param callback The action to be executed.
   */
  const activateAction = (interval: number, actionCallback: () => void) => {
    // Clear any previous action
    clearInterval(tickInterval)

    // Start new action
    gameStore.activeSkillId = skillId
    tickInterval = setInterval(actionCallback, interval)
  }

  const deactivateAction = () => {
    gameStore.activeSkillId = null
    clearInterval(tickInterval)
  }

  return { activateAction, deactivateAction }
}
