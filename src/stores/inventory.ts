import { defineStore } from 'pinia'

import { INVENTORY_ITEMS, type InventoryItemId } from '@/constants/inventory'
import { ref } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  // This is saved to localStorage
  // TODO: Find a way to overwrite the items in case of changes in the constants (game updates)
  // const items = useStorage('inventory', INVENTORY_ITEMS)
  const items = ref(INVENTORY_ITEMS)

  const addItem = (itemId: keyof typeof INVENTORY_ITEMS, quantity: number = 1) => {
    const item = items.value[itemId]

    item.quantity += quantity
  }

  const getItemsQuantities = () => {
    // TODO: Fix all of these horrible type castings
    const itemsQuantities: { [key in InventoryItemId]?: number } = {}

    for (const itemId in items.value) {
      itemsQuantities[itemId as InventoryItemId] = items.value[itemId as InventoryItemId].quantity
    }
    console.log(itemsQuantities)
    return itemsQuantities
  }

  const setItemsQuantities = (newItems: Record<InventoryItemId, number>) => {
    // TODO: Fix all of these horrible type castings
    for (const itemId in newItems) {
      items.value[itemId as InventoryItemId].quantity = newItems[itemId as InventoryItemId]
    }
  }

  return { items, addItem, getItemsQuantities, setItemsQuantities }
})
