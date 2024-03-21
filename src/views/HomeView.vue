<script setup lang="ts">
import WoodcuttingView from '@/views/WoodcuttingView.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <main>
    <p>{{ gameStore.tickCount }}</p>

    <WoodcuttingView />
  </main>
</template>
