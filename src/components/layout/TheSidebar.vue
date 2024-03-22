<script setup lang="ts">
// import { RouterView } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'

import ChipItem from '../ui/ChipItem.vue'

const skillsStore = useSkillsStore()
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <h1>Melvue</h1>
    </div>

    <nav>
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <RouterLink to="/woodcutting"
        >Woodcutting <ChipItem :text="`${skillsStore.levelData.woodcutting.level}/120`"
      /></RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-48 h-full bg-slate-700 text-white;
}
.logo {
  @apply p-4;
}
nav a {
  @apply inline-block w-full p-2;
}
</style>
