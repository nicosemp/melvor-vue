import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { itemsQuantitiesDefault } from '@/constants/inventory'
import type { InventoryItemId } from '@/types/inventory'

type ItemsQuantities = { [id in InventoryItemId]: number }

export const useInventoryStore = defineStore('inventory', () => {
  const itemsQuantities: Ref<ItemsQuantities> = ref(itemsQuantitiesDefault)

  const addItem = (itemId: InventoryItemId, newQuantity: number = 1): void => {
    const newTotal = (itemsQuantities.value[itemId] || 0) + newQuantity
    itemsQuantities.value[itemId] = newTotal
  }

  return { itemsQuantities, addItem }
})
