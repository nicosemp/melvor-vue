import type { Trees } from '@/types/woodcutting'

export const TREES: Trees = {
  1: {
    name: 'Normal Tree',
    exp: 10,
    interval: 3000,
    // TODO: Should this producedItemId should come from a mapping one to many?
    // A skill could produce multiple items...
    producedItemId: 'wood1',
    requirements: { level: 1 }
  },
  2: {
    name: 'Oak Tree',
    exp: 15,
    interval: 4000,
    producedItemId: 'wood2',
    requirements: { level: 10 }
  },
  3: {
    name: 'Willow Tree',
    exp: 22,
    interval: 5000,
    producedItemId: 'wood3',
    requirements: { level: 25 }
  },
  4: {
    name: 'Teak Tree',
    exp: 30,
    interval: 6000,
    producedItemId: 'wood4',
    requirements: { level: 35 }
  },
  5: {
    name: 'Maple Tree',
    exp: 40,
    interval: 8000,
    producedItemId: 'wood5',
    requirements: { level: 45 }
  },
  6: {
    name: 'Mahogany Tree',
    exp: 60,
    interval: 10000,
    producedItemId: 'wood6',
    requirements: { level: 55 }
  },
  7: {
    name: 'Yew Tree',
    exp: 80,
    interval: 12000,
    producedItemId: 'wood7',
    requirements: { level: 60 }
  },
  8: {
    name: 'Magic Tree',
    exp: 100,
    interval: 20000,
    producedItemId: 'wood8',
    requirements: { level: 75 }
  },
  9: {
    name: 'Redwood Tree',
    exp: 180,
    interval: 15000,
    producedItemId: 'wood9',
    requirements: { level: 90 }
  }
}
