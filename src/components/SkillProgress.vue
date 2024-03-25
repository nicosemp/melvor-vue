<script setup lang="ts">
import { computed } from 'vue'

import ProgressBar from './ProgressBar.vue'
import ChipItem from './ui/ChipItem.vue'

const props = defineProps<{
  expOverCurrentLevel: number
  expToNextLevel: number
}>()

const progressBarWidth = computed(() => {
  return (props.expOverCurrentLevel / props.expToNextLevel) * 100
})
</script>

<template>
  <div class="skill-progress">
    <ProgressBar :width="progressBarWidth" thin />

    <div class="pt-2"></div>

    <ChipItem :text="`XP: ${props.expOverCurrentLevel}/${props.expToNextLevel}`" />
  </div>
</template>

<style scoped>
.skill-progress {
  @apply bg-slate-700 text-white p-4 rounded-lg;
}
</style>
