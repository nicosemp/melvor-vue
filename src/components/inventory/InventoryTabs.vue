<script setup lang="ts">
import { ref } from 'vue'

import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'
import { getAssetUrl } from '@/utils/assets'

const props = defineProps<{
  draggedItemId: InventoryItemId | null
}>()

const emit = defineEmits<{
  deselectItem: []
}>()

const inventoryStore = useInventoryStore()

const changeTab = (tabIdx: number) => {
  // Deselect item if changing tab
  if (inventoryStore.selectedTab !== tabIdx) emit('deselectItem')

  inventoryStore.selectedTab = tabIdx
}

// TODO: Fix the drag entering which is not applying the class
const dragHoveredTabIdx = ref<number | null>(null)
const handleOnDragEnter = (tabIdx: number) => {
  dragHoveredTabIdx.value = tabIdx
}

const handleOnDrop = (_event: DragEvent, tabIdx: number) => {
  // Check if the item is being dropped on its own tab
  if (tabIdx === inventoryStore.selectedTab) return

  // Check if no items are being dragged
  if (!props.draggedItemId) return

  // Move the item to the new tab
  inventoryStore.moveItemToTab(props.draggedItemId, tabIdx)

  // Reset the drag hovered tab
  dragHoveredTabIdx.value = null
}
</script>

<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="(_tab, idx) in inventoryStore.tabs"
      :key="idx"
      @click="changeTab(idx)"
      @dragenter.prevent="(_e) => handleOnDragEnter(idx)"
      @dragleave.prevent="(_e) => (dragHoveredTabIdx = null)"
      @dragover.prevent
      @drop="(e) => handleOnDrop(e, idx)"
      :class="{
        selected: inventoryStore.selectedTab === idx,
        'drag-entered': dragHoveredTabIdx === idx
      }"
    >
      <img
        v-if="inventoryStore.tabs[idx].length > 0"
        :src="getAssetUrl(`/items/${inventoryStore.tabs[idx][0]}.png`)"
        alt=""
      />
      <div v-else class="empty-square"></div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  @apply flex;
  @apply bg-slate-800 rounded-t-xl;
}
.tab {
  @apply h-16 w-16 p-2 rounded-lg cursor-pointer;
  @apply bg-slate-700 transition-colors;
  &:not(:last-child) {
    @apply rounded-r-none border-r-2 border-slate-800;
  }
  &:not(:first-child) {
    @apply rounded-l-none;
  }
  &.selected {
    @apply bg-slate-600;
  }
  &.drag-entered {
    @apply bg-slate-600;
  }

  .empty-square {
    @apply h-full w-full bg-slate-800 border-2 border-slate-700 rounded-lg p-1;
  }
}
</style>
