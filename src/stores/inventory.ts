import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { INVENTORY_ITEMS, itemsQuantitiesDefault } from '@/constants/inventory'
import type { InventoryItemId } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const coins = ref(0)
  const itemsQuantities = ref(itemsQuantitiesDefault)
  const inventoryValue = computed(() => {
    return Object.entries(itemsQuantities.value).reduce((acc, [itemId, quantity]) => {
      return acc + INVENTORY_ITEMS[itemId as InventoryItemId].value * quantity
    }, 0)
  })

  const addItem = (itemId: InventoryItemId, newQuantity: number = 1): void => {
    const newTotal = itemsQuantities.value[itemId] + newQuantity
    itemsQuantities.value[itemId] = newTotal
  }

  const sellItems = (itemId: InventoryItemId | null, quantityToSell: number): void => {
    if (!itemId) {
      console.error('Item id is required')
      return
    }

    const itemQuantity = itemsQuantities.value[itemId]
    if (!itemQuantity || itemQuantity < quantityToSell) {
      console.error('Not enough items to sell')
      return
    }

    itemsQuantities.value[itemId] -= quantityToSell
    coins.value += INVENTORY_ITEMS[itemId].value * quantityToSell
  }

  return { coins, itemsQuantities, inventoryValue, addItem, sellItems }
})
