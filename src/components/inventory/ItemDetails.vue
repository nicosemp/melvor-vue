<script setup lang="ts">
import { INVENTORY_ITEMS } from '@/constants/inventory'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'
import { computed } from 'vue'
import ChipItem from '../ui/ChipItem.vue'

const props = defineProps<{
  itemId: InventoryItemId | null
}>()

const inventoryStore = useInventoryStore()

const item = computed(() => (props.itemId ? INVENTORY_ITEMS[props.itemId] : null))
const itemQuantity = computed(() =>
  props.itemId ? inventoryStore.itemsQuantities[props.itemId] : 0
)
</script>

<template>
  <div class="details">
    <div v-if="item" class="info-container">
      <div class="image">
        <button class="lock">L</button>

        <ChipItem :text="`${itemQuantity}`" />
      </div>

      <div class="name">
        <h2>{{ item.name }}</h2>
      </div>

      <div class="sale">TODO: insert selling component</div>
    </div>

    <p v-else class="text-center">Select an item to see its details</p>
  </div>
</template>

<style scoped>
.details {
  @apply basis-96 shrink-0;
  @apply bg-slate-800 text-white p-4 rounded-xl;
}

.info-container {
  @apply flex flex-wrap gap-2;
}
.image,
.name,
.sale {
  @apply bg-slate-700 rounded-xl;
}
.image {
  @apply w-24 h-24 pb-2;
  @apply flex justify-center items-end relative;
  .lock {
    @apply absolute top-0 left-0;
    @apply w-6 h-6 p-1 rounded;
    @apply text-xs text-white bg-red-400;
  }
}
.name {
  @apply px-4 py-3 grow;
}
.sale {
  @apply basis-full;
}
</style>
