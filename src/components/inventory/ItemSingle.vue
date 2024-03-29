<script setup lang="ts">
import ChipItem from '@/components/ui/ChipItem.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'

const props = defineProps<{
  itemId: InventoryItemId
  name: string
  selected: boolean
}>()

const emit = defineEmits<{
  selectItem: [itemId: InventoryItemId]
}>()

const inventoryStore = useInventoryStore()
</script>

<template>
  <div class="item" :class="{ selected: props.selected }" @click="emit('selectItem', itemId)">
    <img :src="`/src/assets/items/${itemId}.png`" :alt="props.name" draggable="false" />

    <ChipItem
      :text="`${inventoryStore.itemsQuantities.get(itemId)}`"
      class="absolute -bottom-2"
      size="small"
    />
  </div>
</template>
