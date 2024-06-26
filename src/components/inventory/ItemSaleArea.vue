<script setup lang="ts">
import { computed, ref } from 'vue'

import ChipItem from '@/components/ui/ChipItem.vue'
import { useInventoryStore } from '@/stores/inventory'
import { INVENTORY_ITEMS } from '@/constants/inventory'
import type { InventoryItemId } from '@/types/inventory'

const props = defineProps<{
  itemId: InventoryItemId
  quantity: number
}>()

const emit = defineEmits<{
  deselectItem: []
}>()

const inventoryStore = useInventoryStore()

const selectedQuantity = ref(0)
const saleRevenue = computed(() => {
  const item = INVENTORY_ITEMS.get(props.itemId)
  if (!item) return 0
  return item.value * selectedQuantity.value
})

const handleOnSellClick = () => {
  inventoryStore.sellItems(props.itemId, selectedQuantity.value)

  // Deselect item if all copies of it were sold
  if (props.quantity === selectedQuantity.value) emit('deselectItem')

  selectedQuantity.value = 0
}
</script>

<template>
  <div>
    <h5>Sell for <ChipItem :text="saleRevenue.toString()" class="bg-yellow-600" /> coins</h5>

    <div class="pt-2"></div>

    <input type="range" min="0" :max="props.quantity" v-model.number="selectedQuantity" />

    <div class="pt-4"></div>

    <div class="flex justify-between gap-4">
      <input
        type="number"
        name="selected-quantity"
        v-model.number="selectedQuantity"
        min="0"
        :max="props.quantity"
      />
      <div>
        <button class="btn btn-sky" @click="selectedQuantity = Math.max(props.quantity - 1, 0)">
          All but 1
        </button>
        <button class="btn btn-sky ml-4" @click="selectedQuantity = props.quantity">All</button>
      </div>
    </div>

    <div class="pt-4"></div>

    <button class="btn btn-red" :disabled="saleRevenue === 0" @click="handleOnSellClick">
      Sell
    </button>
  </div>
</template>

<style scoped>
input[type='range'] {
  @apply w-full h-2 bg-slate-800 accent-sky-500 rounded-lg;
  @apply appearance-none cursor-pointer;
}
input[type='number'] {
  @apply basis-36 min-w-0;
  @apply bg-slate-300 text-slate-950 rounded-lg px-2 h-10 w-auto;
}
</style>
