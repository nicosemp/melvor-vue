import type { InventoryItems, ItemsQuantities } from '@/types/inventory'

// TODO: Find a way to update the items constant in case of game updates
export const INVENTORY_ITEMS: InventoryItems = new Map([
  ['wood1', { name: 'Normal Logs', value: 1 }],
  ['wood2', { name: 'Oak Logs', value: 5 }],
  ['wood3', { name: 'Willow Logs', value: 10 }],
  ['wood4', { name: 'Teak Logs', value: 20 }],
  ['wood5', { name: 'Maple Logs', value: 35 }],
  ['wood6', { name: 'Mahogany Logs', value: 50 }],
  ['wood7', { name: 'Yew Logs', value: 75 }],
  ['wood8', { name: 'Magic Logs', value: 400 }],
  ['wood9', { name: 'Redwood Logs', value: 25 }]
])

export const ITEMS_QUANTITIES_DEFAULT: ItemsQuantities = new Map([
  ['wood1', 0],
  ['wood2', 0],
  ['wood3', 0],
  ['wood4', 0],
  ['wood5', 0],
  ['wood6', 0],
  ['wood7', 0],
  ['wood8', 0],
  ['wood9', 0]
])
