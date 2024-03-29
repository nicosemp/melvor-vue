<script setup lang="ts">
import { ref } from 'vue'

import ItemDetails from '@/components/inventory/ItemDetails.vue'
import ItemSingle from '@/components/inventory/ItemSingle.vue'
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
  <TheHeader title="Inventory" class="bg-blue-600" />

  <TheMain>
    <div class="flex gap-4 w-full items-start">
      <div class="inventory-main">
        <div class="tabs">
          <span>items</span>
          <ChipItem :text="inventoryStore.inventoryValue.toString()" class="bg-yellow-600" />
        </div>

        <div class="pt-4"></div>

        <div class="items" @dragover="console.log('dragover')">
          <ItemSingle
            v-for="itemId in inventoryStore.sortedItemIds"
            :key="itemId"
            :item-id="itemId"
            :name="INVENTORY_ITEMS.get(itemId)?.name || ''"
            :selected="selectedItemId === itemId"
            @select-item="selectItem(itemId)"
            draggable="true"
            @dragstart="console.log('dragstart')"
          />
        </div>
      </div>

      <ItemDetails :item-id="selectedItemId" />
    </div>
  </TheMain>
</template>

<style scoped>
.inventory-main {
  @apply grow;
}
.tabs {
  @apply flex gap-4;
  @apply bg-slate-800 p-4 rounded-xl;
}
.items {
  @apply flex flex-wrap gap-4 items-start content-start;
  @apply bg-slate-800 p-4 rounded-xl;
}
.item {
  @apply relative w-20 h-20 p-2 rounded-xl;
  @apply bg-slate-700 cursor-pointer transition-colors;
  @apply flex flex-col justify-center items-center;
  &.selected {
    @apply bg-slate-600;
  }
}
</style>
