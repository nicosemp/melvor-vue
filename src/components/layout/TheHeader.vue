<script setup lang="ts">
import { useSaveGame } from '@/composables/useSaveGame'

const props = defineProps<{
  title: string
}>()

const { saveGame } = useSaveGame()
</script>

<template>
  <header class="header">
    <div class="skill-logo">
      <h4>{{ props.title }}</h4>
    </div>

    <div class="options">
      <button class="btn" @click="saveGame">Save</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  @apply h-20 sticky p-4;
  @apply flex justify-between;
}
</style>
