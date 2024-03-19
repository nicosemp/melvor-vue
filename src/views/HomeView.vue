<script setup lang="ts">
import TreeCutting from '@/components/TreeCutting.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <main>
    <div class="container">
      <p>{{ gameStore.tickCount }}</p>

      <TreeCutting />
    </div>
  </main>
</template>
