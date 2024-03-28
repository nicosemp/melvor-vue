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

  const sellItems = (itemId: InventoryItemId | null, quantity: number): void => {
    if (!itemId) {
      console.error('Item id is required')
      return
    }
    if (itemsQuantities.value[itemId] < quantity) {
      console.error('Not enough items to sell')
      return
    }
    itemsQuantities.value[itemId] -= quantity
  }

  return { itemsQuantities, addItem, sellItems }
})
