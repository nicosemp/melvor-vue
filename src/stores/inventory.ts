import { ref } from 'vue'
import { defineStore } from 'pinia'

import { INVENTORY_ITEMS } from '@/constants/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref(INVENTORY_ITEMS)

  const addItem = (itemId: keyof typeof INVENTORY_ITEMS, quantity: number = 1) => {
    const item = items.value[itemId]

    item.quantity += quantity
  }

  return { items, addItem }
})
