// Peter Carroll's Eight Colors of Magic
// From Liber Kaos and the Chaosphere model

import type { MagicColor } from '../types.js'

export const EIGHT_COLORS: readonly MagicColor[] = [
  {
    name: 'Octarine',
    color: 'octarine',
    direction: 'North',
    domain: 'Pure Magic',
    description: 'The color of magic itself — understanding and wielding the force of chaos',
    ansiColor: '\x1b[1;35m',
  },
  {
    name: 'Black',
    color: 'black',
    direction: 'Northeast',
    domain: 'Death Magic',
    description: 'Entropy, endings, the void, transformation through destruction',
    ansiColor: '\x1b[90m',
  },
  {
    name: 'Blue',
    color: 'blue',
    direction: 'East',
    domain: 'Wealth Magic',
    description: 'Material abundance, prosperity, tangible resources',
    ansiColor: '\x1b[34m',
  },
  {
    name: 'Green',
    color: 'green',
    direction: 'Southeast',
    domain: 'Love Magic',
    description: 'Attraction, connection, emotional bonds, empathy',
    ansiColor: '\x1b[32m',
  },
  {
    name: 'Yellow',
    color: 'yellow',
    direction: 'South',
    domain: 'Ego Magic',
    description: 'Self-transformation, identity, confidence, personal power',
    ansiColor: '\x1b[33m',
  },
  {
    name: 'Purple',
    color: 'purple',
    direction: 'Southwest',
    domain: 'Sex Magic',
    description: 'Creative force, generation, life energy, passion',
    ansiColor: '\x1b[35m',
  },
  {
    name: 'Orange',
    color: 'orange',
    direction: 'West',
    domain: 'Thinking Magic',
    description: 'Intellect, communication, knowledge, strategy',
    ansiColor: '\x1b[33m',
  },
  {
    name: 'Red',
    color: 'red',
    direction: 'Northwest',
    domain: 'War Magic',
    description: 'Conflict, aggression, competition, martial force',
    ansiColor: '\x1b[31m',
  },
]
