<script setup lang="ts">
import { computed } from 'vue'

import { INVENTORY_ITEMS } from '@/constants/inventory'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'

import ChipItem from '../ui/ChipItem.vue'
import ItemSaleArea from './ItemSaleArea.vue'

const props = defineProps<{
  itemId: InventoryItemId | null
}>()

const emit = defineEmits<{
  deselectItem: []
}>()

const inventoryStore = useInventoryStore()

const item = computed(() => (props.itemId ? INVENTORY_ITEMS.get(props.itemId) : null))
const itemQuantity = computed(() =>
  props.itemId ? inventoryStore.itemsQuantities.get(props.itemId) || 0 : 0
)
</script>

<template>
  <div class="details">
    <div v-if="props.itemId && item">
      <div class="flex gap-4">
        <div class="image">
          <button class="lock">L</button>

          <img :src="`/src/assets/items/${itemId}.png`" :alt="item.name" />

          <ChipItem :text="`${itemQuantity}`" class="absolute -bottom-2" />
        </div>

        <div class="name">
          <h4>{{ item.name }}</h4>
        </div>
      </div>

      <div class="pt-4"></div>

      <ItemSaleArea
        :item-id="props.itemId"
        :quantity="itemQuantity"
        class="sale"
        @deselect-item="emit('deselectItem')"
      />
    </div>

    <p v-else class="text-center">Select an item to see its details</p>
  </div>
</template>

<style scoped>
.details {
  @apply basis-96 shrink-0;
  @apply bg-slate-800 p-4 rounded-xl;
}

.image,
.name,
.sale {
  @apply bg-slate-700 rounded-xl;
}
.image {
  @apply w-24 h-24;
  @apply flex justify-center items-center relative;
  .lock {
    @apply absolute top-0 left-0;
    @apply w-6 h-6 p-1 rounded;
    @apply text-xs bg-red-400;
  }
}
.name {
  @apply px-4 py-3 grow;
}
.sale {
  @apply basis-full p-4;
}
</style>
