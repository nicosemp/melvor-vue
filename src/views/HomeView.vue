<script setup lang="ts">
import TreecuttingView from '@/views/TreecuttingView.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <main>
    <p>{{ gameStore.tickCount }}</p>

    <TreecuttingView />
  </main>
</template>
