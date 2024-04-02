<script setup lang="ts">
import { ref, type Ref } from 'vue'

import ItemDetails from '@/components/inventory/ItemDetails.vue'
import InventoryTabs from '@/components/inventory/InventoryTabs.vue'
import ItemSquare from '@/components/inventory/ItemSquare.vue'
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

//#region Reorder Drag and Drop
const itemRefs: Ref<{ itemId: InventoryItemId; itemRef: HTMLDivElement }[]> = ref([])
const draggedItemId = ref<InventoryItemId | null>(null)
const onItemsDragOver = (event: DragEvent) => {
  event.preventDefault() // To show a drop cursor instead of a stop sign cursor

  const overlappingItem = itemRefs.value.find(({ itemRef }) => {
    const rect = itemRef.getBoundingClientRect()
    return (
      event.x > rect.left && event.x < rect.right && event.y > rect.top && event.y < rect.bottom
    )
  })
  if (overlappingItem && draggedItemId.value) {
    const overlappingItemIndex = inventoryStore.tabs[inventoryStore.selectedTab].indexOf(
      overlappingItem.itemId
    )
    const draggedItemIndex = inventoryStore.tabs[inventoryStore.selectedTab].indexOf(
      draggedItemId.value
    )
    const splicedDraggedItem = inventoryStore.tabs[inventoryStore.selectedTab].splice(
      draggedItemIndex,
      1
    )[0]
    inventoryStore.tabs[inventoryStore.selectedTab].splice(
      overlappingItemIndex,
      0,
      splicedDraggedItem
    )
  }
}
//#endregion
</script>

<template>
  <TheHeader title="Inventory" class="bg-blue-600" />

  <TheMain>
    <div class="flex gap-4 w-full items-start">
      <div class="inventory-main">
        <div class="info">
          <span>Inventory value:</span>
          <ChipItem :text="inventoryStore.inventoryValue.toString()" class="bg-yellow-600" />
        </div>

        <div class="pt-4"></div>

        <div class="inventory">
          <InventoryTabs :dragged-item-id="draggedItemId" @deselect-item="selectedItemId = null" />

          <div class="items" @dragover="onItemsDragOver">
            <ItemSquare
              v-for="itemId in inventoryStore.tabs[inventoryStore.selectedTab]"
              :key="itemId"
              ref="itemRefs"
              :item-id="itemId"
              :name="INVENTORY_ITEMS.get(itemId)?.name || ''"
              :selected="selectedItemId === itemId"
              @select-item="selectItem(itemId)"
              draggable="true"
              @dragstart="draggedItemId = itemId"
              @dragend="draggedItemId = null"
              :class="{ 'opacity-50': draggedItemId === itemId }"
            />
          </div>
        </div>
      </div>

      <ItemDetails :item-id="selectedItemId" @deselect-item="selectedItemId = null" />
    </div>
  </TheMain>
</template>

<style scoped>
.inventory-main {
  @apply grow;
}
.info {
  @apply flex gap-4;
  @apply bg-slate-800 p-4 rounded-xl;
}

.inventory {
  @apply bg-slate-800 p-4 rounded-xl;
  @apply flex flex-col gap-4;
  .items {
    @apply flex flex-wrap gap-4 items-start content-start;
  }
}
</style>
