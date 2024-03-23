// TODO: refactor these declarations into the correct file and format
export const SKILLS = ['woodcutting'] as const

export type Skill = (typeof SKILLS)[number]
