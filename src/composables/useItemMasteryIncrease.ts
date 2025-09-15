import type { ItemId, StoreItems } from '@/types/skills'

export const useItemMasteryIncrease = (
  itemId: ItemId,
  items: StoreItems,
  itemsCount: number,
  itemActionInterval: number
) => {
  const unlockedItemsCount = Object.values(items).filter((item) => item.isUnlocked.value).length

  const playerTotalSkillLevels = Object.entries(items).reduce(
    (acc, item) => acc + item[1].level.value,
    0
  )

  const totalSkillLevels = itemsCount * 99

  const itemMasteryLevel = items[itemId].level.value

  // TODO: itemActionInterval should be different for some skills

  const bonus = 0 // TODO: Implement the correct formula for bonus

  const treesMasteryPerAction =
    unlockedItemsCount * (playerTotalSkillLevels / totalSkillLevels) +
    itemMasteryLevel * (itemsCount / 10) * itemActionInterval * 0.5 * (1 + bonus)

  return { treesMasteryPerAction }
}
