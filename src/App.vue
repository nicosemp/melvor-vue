<script setup lang="ts">
import { onMounted } from 'vue'

import TheSidebar from '@/components/layout/TheSidebar.vue'
import { useSaveGame } from '@/composables/useSaveGame'

const { loadGameSave } = useSaveGame()

onMounted(() => {
  loadGameSave()
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
