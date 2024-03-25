<script setup lang="ts">
import { useWoodcuttingStore } from '@/stores/woodcutting'
import { SKILLS_MAX_LEVEL } from '@/constants/game'

import ChipItem from '../ui/ChipItem.vue'

const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <h1>Melvue</h1>
    </div>

    <nav>
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <span class="nav-section-title">Skills</span>
      <RouterLink to="/woodcutting">
        Woodcutting <ChipItem :text="`${woodcuttingStore.level}/${SKILLS_MAX_LEVEL}`" />
      </RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-52 h-full bg-slate-700 text-white;
}
.logo {
  @apply p-4;
}
.nav-section-title {
  @apply inline-block uppercase font-bold px-4 py-2;
}
nav a {
  @apply inline-block px-4 py-2 rounded-tr-full rounded-br-full w-11/12;
  @apply hover:bg-slate-800 transition-colors;
  &.active {
    @apply bg-slate-800;
  }
}
</style>
