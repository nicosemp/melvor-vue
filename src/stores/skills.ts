import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'
import { SKILLS } from '@/constants/game'

export const useSkillsStore = defineStore('skills', () => {
  // TODO: Make this dynamic based on the SKILLS constant
  const skillsExperienceDefault = { woodcutting: 0 }

  const skillsExperience = useStorage('experience', skillsExperienceDefault)

  // TODO: This should be done for every skill, not just woodcutting
  // TODO: Optimize this to avoid computing every time 'experience' changes
  const levelData = computed(() => {
    // TODO: Rename and make it a constant
    const obj: {
      woodcutting: {
        level: number
        expOverCurrentLevel: number
        expToNextLevel: number
      }
    } = {
      woodcutting: { level: 1, expOverCurrentLevel: 0, expToNextLevel: 0 }
    }

    SKILLS.forEach((skill) => {
      let expOverCurrentLevel = skillsExperience.value.woodcutting
      for (let level = 1; level <= 120; level++) {
        const expToNextLevel = calcExpToLevel(level)

        if (expOverCurrentLevel < expToNextLevel) {
          console.log(level, expOverCurrentLevel, expToNextLevel)
          obj[skill] = { level, expOverCurrentLevel, expToNextLevel }
          return
        }

        expOverCurrentLevel -= expToNextLevel
      }
      obj[skill] = { level: 120, expOverCurrentLevel: 0, expToNextLevel: 0 }
    })

    console.log(obj)
    return obj
  })

  const calcExpToLevel = (level: number): number => {
    return Math.round((level + 300 * 2 ** (level / 7)) / 4)
  }

  /**
   * Action to gain experience in a skill
   * @param skill The skill to gain experience in (e.g. 'woodcutting')
   * @param amount The amount of experience to gain
   */
  const gainExperience = (skill: (typeof SKILLS)[number], amount: number) => {
    skillsExperience.value[skill] += amount
  }

  return { skillsExperience, levelData, gainExperience }
})
