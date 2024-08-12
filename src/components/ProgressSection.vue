<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import ChipItem from './ui/ChipItem.vue'

const props = defineProps<{
  progressWidth: number
  chipText: string
}>()
</script>

<template>
  <div class="skill-progress">
    <ProgressBar :width="progressWidth" size="small" />

    <div class="pt-2"></div>

    <ChipItem :text="chipText" />
  </div>
</template>

<style scoped>
.skill-progress {
  @apply bg-slate-700 p-4 rounded-lg;
}
</style>
