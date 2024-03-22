<script setup lang="ts">
import { computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import ProgressBar from './ProgressBar.vue'
import ChipItem from './ui/ChipItem.vue'

import { SKILLS } from '@/constants/game'

const props = defineProps<{
  skill: (typeof SKILLS)[number]
}>()

const skillsStore = useSkillsStore()
const progressBarWidth = computed(() => {
  return (
    (skillsStore.levelData[props.skill].expOverCurrentLevel /
      skillsStore.levelData[props.skill].expToNextLevel) *
    100
  )
})
</script>

<template>
  <div class="skill-progress">
    <ProgressBar :width="progressBarWidth" />
    <ChipItem :text="`${skillsStore.levelData[props.skill].level}/120`" />
  </div>
</template>

<style scoped>
.skill-progress {
  @apply bg-slate-800 text-white p-4 rounded-lg;
}
</style>
