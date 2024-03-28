<script setup lang="ts">
import { ref } from 'vue'

import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItemId } from '@/types/inventory'

const props = defineProps<{
  itemId: InventoryItemId
  quantity: number
}>()

const inventoryStore = useInventoryStore()

const selectedQuantity = ref(0)
</script>

<template>
  <div>
    <h5>Sell for coins</h5>

    <div class="pt-2"></div>

    <input type="range" min="0" :max="props.quantity" v-model="selectedQuantity" />

    <div class="pt-4"></div>

    <div class="flex justify-between gap-4">
      <input
        type="number"
        name="selected-quantity"
        v-model="selectedQuantity"
        :max="quantity"
        @input="selectedQuantity = Math.min(selectedQuantity, props.quantity)"
      />
      <div>
        <button class="btn btn-sky" @click="selectedQuantity = props.quantity - 1">
          All but 1
        </button>
        <button class="btn btn-sky ml-4" @click="selectedQuantity = props.quantity">All</button>
      </div>
    </div>

    <div class="pt-4"></div>

    <button class="btn btn-red" @click="inventoryStore.sellItems(props.itemId, selectedQuantity)">
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
