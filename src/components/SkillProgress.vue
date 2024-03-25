<script setup lang="ts">
import { computed } from 'vue'

import { SKILLS_MAX_LEVEL } from '@/constants/game'

import ProgressBar from './ProgressBar.vue'
import ChipItem from './ui/ChipItem.vue'

const props = defineProps<{
  level: number
  expOverCurrentLevel: number
  expToNextLevel: number
}>()

const progressBarWidth = computed(() => {
  return (props.expOverCurrentLevel / props.expToNextLevel) * 100
})
</script>

<template>
  <div class="skill-progress">
    <ProgressBar :width="progressBarWidth" />
    <ChipItem :text="`${props.level}/${SKILLS_MAX_LEVEL}`" />
  </div>
</template>

<style scoped>
.skill-progress {
  @apply bg-slate-700 text-white p-4 rounded-lg;
}
</style>
