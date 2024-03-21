<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'

import TheMain from '@/components/layout/TheMain.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const inventoryStore = useInventoryStore()
const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <TheMain>
    <h2>Woodcutting</h2>
    <p>Here you can cut down trees to get wood.</p>

    <div class="trees">
      <div v-for="(tree, treeId) in woodcuttingStore.trees" :key="treeId" class="tree">
        <h3>{{ tree.name }}</h3>
        <p>Quantity: {{ inventoryStore.items[tree.producedItemId].quantity }}</p>

        <ProgressBar
          :duration="tree.interval"
          :animate="woodcuttingStore.activeTreeId === treeId"
          :animationSwitcher="woodcuttingStore.actionsCount % 2 === 0"
        />

        <button
          class="btn-primary"
          :class="{ active: woodcuttingStore.activeTreeId === treeId }"
          @click="woodcuttingStore.toggleActiveAction(treeId)"
        >
          Cut down
        </button>
      </div>
    </div>
  </TheMain>
</template>

<style scoped>
.trees {
  @apply space-y-4;
}
.tree {
  @apply p-4 rounded-lg bg-slate-600 text-white;
}
</style>
