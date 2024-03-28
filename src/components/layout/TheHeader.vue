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
      <slot name="image"></slot>
      <h4>{{ props.title }}</h4>
    </div>

    <button class="btn" @click="saveGame">Save</button>
  </header>
</template>

<style scoped>
.header {
  @apply h-20 sticky p-4;
  @apply flex justify-between items-center;
}
.skill-logo {
  @apply flex items-center gap-4;
}
</style>
