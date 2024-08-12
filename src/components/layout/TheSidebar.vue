<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import { SKILLS_MAX_LEVEL } from '@/constants/game'
import { compactNumberFormatter } from '@/utils/format'

import ChipItem from '../ui/ChipItem.vue'

const inventoryStore = useInventoryStore()
const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <h1>Melvue</h1>
    </div>

    <div class="pt-4"></div>

    <nav>
      <RouterLink to="/shop">
        <span>Shop</span>
        <ChipItem :text="compactNumberFormatter(inventoryStore.coins)" class="bg-yellow-600" />
      </RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>

      <span class="nav-section-title">Skills</span>

      <RouterLink to="/woodcutting">
        <span>Woodcutting</span>
        <ChipItem :text="`${woodcuttingStore.level}/${SKILLS_MAX_LEVEL}`" />
      </RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-52 bg-slate-700;
}
.logo {
  @apply p-4 text-center;
  @apply bg-slate-800 rounded-b-3xl;
}

.nav-section-title {
  @apply inline-block uppercase font-bold px-4 py-2;
}
nav a {
  @apply inline-block pl-4 pr-2 py-2 rounded-tr-full rounded-br-full w-11/12;
  @apply hover:bg-slate-800 transition-colors;
  @apply flex justify-between items-center;
  &.active {
    @apply bg-slate-800;
  }
}
</style>
