import type { TreeId, Trees } from '@/types/woodcutting'

export const TREES: Trees = {
  tree1: {
    name: 'Normal Tree',
    imageName: 'normal-tree',
    exp: 10,
    interval: 3000,
    // TODO: Should this producedItemId should come from a mapping one to many?
    // A skill could produce multiple items...
    producedItemId: 'wood1',
    requirements: { level: 1 }
  },
  tree2: {
    name: 'Oak Tree',
    imageName: 'oak-tree',
    exp: 15,
    interval: 4000,
    producedItemId: 'wood2',
    requirements: { level: 10 }
  },
  tree3: {
    name: 'Willow Tree',
    imageName: 'willow-tree',
    exp: 22,
    interval: 5000,
    producedItemId: 'wood3',
    requirements: { level: 25 }
  },
  tree4: {
    name: 'Teak Tree',
    imageName: 'teak-tree',
    exp: 30,
    interval: 6000,
    producedItemId: 'wood4',
    requirements: { level: 35 }
  },
  tree5: {
    name: 'Maple Tree',
    imageName: 'maple-tree',
    exp: 40,
    interval: 8000,
    producedItemId: 'wood5',
    requirements: { level: 45 }
  },
  tree6: {
    name: 'Mahogany Tree',
    imageName: 'mahogany-tree',
    exp: 60,
    interval: 10000,
    producedItemId: 'wood6',
    requirements: { level: 55 }
  },
  tree7: {
    name: 'Yew Tree',
    imageName: 'yew-tree',
    exp: 80,
    interval: 12000,
    producedItemId: 'wood7',
    requirements: { level: 60 }
  },
  tree8: {
    name: 'Magic Tree',
    imageName: 'magic-tree',
    exp: 100,
    interval: 20000,
    producedItemId: 'wood8',
    requirements: { level: 75 }
  },
  tree9: {
    name: 'Redwood Tree',
    imageName: 'redwood-tree',
    exp: 180,
    interval: 15000,
    producedItemId: 'wood9',
    requirements: { level: 90 }
  }
} as const

export const TREE_IDS = Object.keys(TREES) as TreeId[]

export const MAX_POOL_EXP = Object.keys(TREES).length * 500_000
