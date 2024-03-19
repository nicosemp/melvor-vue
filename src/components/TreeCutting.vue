<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
import { useTreecuttingStore } from '@/stores/treecutting'

const inventoryStore = useInventoryStore()
const treeStore = useTreecuttingStore()
</script>

<template>
  <div>
    <h2>Treecutting</h2>
    <p>Here you can cut down trees to get wood.</p>

    <div v-for="(tree, treeId) in treeStore.trees" :key="treeId">
      <h3>{{ tree.name }}</h3>
      <p>Quantity: {{ inventoryStore.items[tree.producedItemId].quantity }}</p>

      <button
        class="btn-primary"
        :class="{ 'bg-blue-800': treeStore.activeTreeId === treeId }"
        @click="treeStore.toggleCutTree(treeId)"
      >
        Cut down
      </button>
    </div>
  </div>
</template>
