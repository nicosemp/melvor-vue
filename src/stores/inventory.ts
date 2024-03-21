import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import { INVENTORY_ITEMS } from '@/constants/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  // This is saved to localStorage
  // TODO: There is no way to overwrite the items in case of changes in the constants
  const items = useStorage('inventory', INVENTORY_ITEMS)

  const addItem = (itemId: keyof typeof INVENTORY_ITEMS, quantity: number = 1) => {
    const item = items.value[itemId]

    item.quantity += quantity
  }

  return { items, addItem }
})
