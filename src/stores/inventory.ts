import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { INVENTORY_ITEMS, ITEMS_QUANTITIES_DEFAULT } from '@/constants/inventory'
import type { InventoryItemId, Tabs } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const coins = ref(0)
  const itemsQuantities = ref(ITEMS_QUANTITIES_DEFAULT)

  const ownedItems = computed(() => {
    return new Map([...itemsQuantities.value].filter(([_, quantity]) => quantity > 0))
  })
  const inventoryValue = computed(() => {
    let tot = 0
    itemsQuantities.value.forEach((itemQuantity, id) => {
      const itemValue = INVENTORY_ITEMS.get(id)?.value || 0
      tot += itemValue * itemQuantity
    })
    return tot
  })

  //#region Tabs
  const selectedTab = ref(0)
  const tabs: Ref<Tabs> = ref([[], [], []])
  const moveItemToTab = (itemId: InventoryItemId, tab: number): void => {
    tabs.value[selectedTab.value] = tabs.value[selectedTab.value].filter((id) => id !== itemId)
    tabs.value[tab].push(itemId)
  }
  //#endregion

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

    // Update 'tabs' to show/hide the items in the inventory
    // when the quantity is 0 or greater than 0
    if (oldQuantity > 0 && newQuantity === 0) {
      const itemIdToRemoveIndex = tabs.value[selectedTab.value].indexOf(itemId)
      tabs.value[selectedTab.value].splice(itemIdToRemoveIndex, 1)
    } else if (oldQuantity === 0 && newQuantity > 0) {
      tabs.value[selectedTab.value].push(itemId)
    }
  }

  return {
    coins,
    itemsQuantities,
    selectedTab,
    tabs,
    moveItemToTab,
    ownedItems,
    inventoryValue,
    addItem,
    sellItems
  }
})
