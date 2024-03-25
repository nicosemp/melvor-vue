import type { InventoryItems, InventoryItemId } from '@/types/inventory'

// TODO: Find a way to update the items constant in case of game updates
export const INVENTORY_ITEMS: InventoryItems = {
  wood1: {
    name: 'Normal Logs'
  },
  wood2: {
    name: 'Oak Logs'
  },
  wood3: {
    name: 'Willow Logs'
  },
  wood4: {
    name: 'Teak Logs'
  },
  wood5: {
    name: 'Maple Logs'
  },
  wood6: {
    name: 'Mahogany Logs'
  },
  wood7: {
    name: 'Yew Logs'
  },
  wood8: {
    name: 'Magic Logs'
  },
  wood9: {
    name: 'Redwood Logs'
  }
}

export const itemsQuantitiesDefault: { [id in InventoryItemId]: number } = {
  wood1: 0,
  wood2: 0,
  wood3: 0,
  wood4: 0,
  wood5: 0,
  wood6: 0,
  wood7: 0,
  wood8: 0,
  wood9: 0
}
