import type { InventoryItems, InventoryItemId } from '@/types/inventory'

// TODO: Find a way to update the items constant in case of game updates
export const INVENTORY_ITEMS: InventoryItems = {
  wood1: {
    name: 'Oak Log'
  },
  wood2: {
    name: 'Pine Log'
  },
  wood3: {
    name: 'Birch Log'
  },
  wood4: {
    name: 'Willow Log'
  }
}

export const itemsQuantitiesDefault: { [id in InventoryItemId]: number } = {
  wood1: 0,
  wood2: 0,
  wood3: 0,
  wood4: 0
}
