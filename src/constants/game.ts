export const SKILLS = ['woodcutting'] as const

export type Skill = (typeof SKILLS)[number]
