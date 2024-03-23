/**
 * Calculate the experience delta to reach a certain level.
 * @param level The level to calculate the experience delta for.
 * @returns The experience delta to reach the given level.
 */
export const calcExpToLevel = (level: number): number => {
  return Math.round((level + 300 * 2 ** (level / 7)) / 4)
}
