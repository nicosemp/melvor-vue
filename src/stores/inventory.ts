import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { INVENTORY_ITEMS, ITEMS_QUANTITIES_DEFAULT } from '@/constants/inventory'
import type { InventoryItemId } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const coins = ref(0)
  const itemsQuantities = ref(ITEMS_QUANTITIES_DEFAULT)

  const ownedItems = computed(() => {
    return new Map([...itemsQuantities.value].filter(([_, quantity]) => quantity > 0))
  })
  const inventoryValue = computed(() => {
    let tot = 0
    itemsQuantities.value.forEach((quantity) => (tot += quantity))
    return tot
  })

  const addItem = (itemId: InventoryItemId, newQuantity: number = 1): void => {
    const itemQuantity = itemsQuantities.value.get(itemId) || 0
    itemsQuantities.value.set(itemId, itemQuantity + newQuantity)
  }

  const sellItems = (itemId: InventoryItemId | null, quantityToSell: number): void => {
    if (!itemId) {
      console.error('Item id is required')
      return
    }

    const itemQuantity = itemsQuantities.value.get(itemId) || 0
    if (itemQuantity < quantityToSell) {
      console.error('Not enough items to sell')
      return
    }

    itemsQuantities.value.set(itemId, itemQuantity - quantityToSell)
    coins.value += INVENTORY_ITEMS[itemId].value * quantityToSell
  }

  return { coins, itemsQuantities, ownedItems, inventoryValue, addItem, sellItems }
})
