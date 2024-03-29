import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { INVENTORY_ITEMS, ITEMS_QUANTITIES_DEFAULT } from '@/constants/inventory'
import type { InventoryItemId } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const coins = ref(0)
  const itemsQuantities = ref(ITEMS_QUANTITIES_DEFAULT)
  const sortedItemIds: Ref<InventoryItemId[]> = ref([])

  const ownedItems = computed(() => {
    return new Map([...itemsQuantities.value].filter(([_, quantity]) => quantity > 0))
  })
  const inventoryValue = computed(() => {
    let tot = 0
    itemsQuantities.value.forEach((quantity) => (tot += quantity))
    return tot
  })

  const addItem = (itemId: InventoryItemId, addedQuantity: number = 1): void => {
    const itemQuantity = itemsQuantities.value.get(itemId) || 0
    updateItemQuantity(itemId, itemQuantity, itemQuantity + addedQuantity)
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

    updateItemQuantity(itemId, itemQuantity, itemQuantity - quantityToSell)
    const itemValue = INVENTORY_ITEMS.get(itemId)?.value || 0
    coins.value += itemValue * quantityToSell
  }

  const updateItemQuantity = (
    itemId: InventoryItemId,
    oldQuantity: number,
    newQuantity: number
  ) => {
    itemsQuantities.value.set(itemId, newQuantity)

    // Update sortedItemIds
    if (oldQuantity > 0 && newQuantity === 0) {
      sortedItemIds.value.splice(sortedItemIds.value.indexOf(itemId), 1)
    } else if (oldQuantity === 0 && newQuantity > 0) {
      sortedItemIds.value.push(itemId)
    }
  }

  return { coins, itemsQuantities, sortedItemIds, ownedItems, inventoryValue, addItem, sellItems }
})
