<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

import ChipItem from '@/components/ui/ChipItem.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'
import { getAssetUrl } from '@/utils/assets'
import { compactNumberFormatter } from '@/utils/format'

const props = defineProps<{
  itemId: InventoryItemId
  name: string
  selected: boolean
}>()

const emit = defineEmits<{
  selectItem: [itemId: InventoryItemId]
}>()

const inventoryStore = useInventoryStore()
const itemQuantity = computed(() => {
  const itemQuantity = inventoryStore.itemsQuantities.get(props.itemId)
  return {
    normal: itemQuantity?.toString() || '',
    compact: compactNumberFormatter(itemQuantity || 0)
  }
})
const mouseOver = ref(false)

//#region Template Ref used for Drag and Drop
const itemRef: Ref<HTMLDivElement | null> = ref(null)
// This exposes the itemRef to the parent component,
// as by default <script setup> components are private
defineExpose({
  itemId: props.itemId,
  itemRef
})
//#endregion
</script>

<template>
  <div
    ref="itemRef"
    class="item"
    :class="{ selected: props.selected }"
    @click="emit('selectItem', itemId)"
    @mouseenter="mouseOver = true"
    @mouseleave="mouseOver = false"
  >
    <img :src="getAssetUrl(`/items/${itemId}.png`)" :alt="props.name" draggable="false" />

    <ChipItem
      :text="mouseOver ? itemQuantity.normal : itemQuantity.compact"
      class="absolute -bottom-2"
      size="small"
    />
  </div>
</template>

<style scoped>
.item {
  @apply relative w-20 h-20 p-2 rounded-xl;
  @apply bg-slate-700 cursor-pointer transition-colors;
  @apply flex flex-col justify-center items-center;
  &.selected {
    @apply bg-slate-600;
  }
}
</style>
