<script setup lang="ts">
import { onMounted } from 'vue'

import TheSidebar from '@/components/layout/TheSidebar.vue'
import { useSaveGame } from '@/composables/useSaveGame'

const { saveGame, loadGameSave } = useSaveGame()

const TEN_SECONDS = 10 * 1000
onMounted(() => {
  loadGameSave()

  // Save the game every 10 seconds
  setInterval(() => {
    saveGame()
  }, TEN_SECONDS)
})
</script>

<template>
  <div class="flex h-screen">
    <TheSidebar class="shrink-0" />

    <div class="grow">
      <RouterView />
    </div>
  </div>
</template>
