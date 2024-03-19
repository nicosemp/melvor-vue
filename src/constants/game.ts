export const SKILLS = ['treecutting'] as const

export type Skill = (typeof SKILLS)[number]
