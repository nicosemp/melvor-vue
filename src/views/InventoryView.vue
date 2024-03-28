<script setup lang="ts">
import { ref } from 'vue'

import ItemDetails from '@/components/inventory/ItemDetails.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheMain from '@/components/layout/TheMain.vue'
import ChipItem from '@/components/ui/ChipItem.vue'
import { INVENTORY_ITEMS } from '@/constants/inventory'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'

const inventoryStore = useInventoryStore()

const selectedItemId = ref<InventoryItemId | null>(null)
const selectItem = (itemId: InventoryItemId) => {
  if (selectedItemId.value === itemId) {
    selectedItemId.value = null
    return
  }
  selectedItemId.value = itemId
}
</script>

<template>
  <TheHeader title="Inventory" class="bg-blue-600 text-white" />

  <TheMain>
    <div class="flex gap-4 w-full items-start">
      <div class="items">
        <div
          v-for="(item, itemId) in INVENTORY_ITEMS"
          :key="itemId"
          class="item"
          :class="{ selected: selectedItemId === itemId }"
          @click="selectItem(itemId)"
        >
          <img :src="`/src/assets/items/${itemId}.png`" :alt="item.name" />

          <ChipItem
            :text="`${inventoryStore.itemsQuantities[itemId]}`"
            class="absolute -bottom-2"
            size="small"
          />
        </div>
      </div>

      <ItemDetails :item-id="selectedItemId" />
    </div>
  </TheMain>
</template>

<style scoped>
.items {
  @apply grow;
  @apply flex flex-wrap gap-4 items-start content-start;
  @apply bg-slate-800 p-4 rounded-xl;
}
.item {
  @apply relative w-20 h-20 p-2 rounded-xl;
  @apply bg-slate-700 text-white;
  @apply flex flex-col justify-center items-center;
  @apply cursor-pointer transition-colors;
  &.selected {
    @apply bg-slate-600;
  }
}
</style>
