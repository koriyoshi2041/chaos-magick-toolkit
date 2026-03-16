// Occult Unicode symbols and ASCII art constants

// Chaos Star directions (8-pointed, clockwise from North)
export const CHAOS_ARROWS = ['\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199', '\u2190', '\u2196'] as const

// Module header symbols
export const MODULE_SYMBOLS = {
  sigil: '\u26E7',      // pentagram
  gnosis: '\u25C9',     // fisheye (circle with dot)
  servitor: '\u2295',   // circled plus
  oracle: '\u2726',     // four-pointed star
  ritual: '\u235F',     // APL star
  diary: '\u2593',      // dark shade block
} as const

// Elemental / alchemical symbols
export const ELEMENTS = {
  air: '\u{1F701}',
  fire: '\u{1F702}',
  water: '\u{1F703}',
  earth: '\u{1F704}',
} as const

// Planetary symbols
export const PLANETS = {
  sun: '\u2609',
  moon: '\u263D',
  mercury: '\u263F',
  venus: '\u2640',
  mars: '\u2642',
  jupiter: '\u2643',
  saturn: '\u2644',
} as const

// Box drawing characters for sigil construction
export const BOX = {
  h: '\u2500',   // horizontal
  v: '\u2502',   // vertical
  tl: '\u250C',  // top-left corner
  tr: '\u2510',  // top-right corner
  bl: '\u2514',  // bottom-left corner
  br: '\u2518',  // bottom-right corner
  cross: '\u253C',
  tee_down: '\u252C',
  tee_up: '\u2534',
  tee_right: '\u251C',
  tee_left: '\u2524',
} as const

// Diagonal / arrow characters for sigil lines
export const DIAGONALS = {
  nw_se: '\u2572',  // backslash
  ne_sw: '\u2571',  // forward slash
  cross: '\u2573',  // X
} as const

// Block elements for visual effects
export const BLOCKS = {
  light: '\u2591',
  medium: '\u2592',
  dark: '\u2593',
  full: '\u2588',
} as const

// Useful misc symbols
export const MISC = {
  dot: '\u25CF',         // black circle
  ring: '\u25CB',        // white circle
  bullseye: '\u25C9',    // fisheye
  diamond: '\u25C6',     // black diamond
  star4: '\u2726',       // four-pointed star
  star6: '\u2736',       // six-pointed star
  star8: '\u2734',       // eight-pointed star
  triangle_up: '\u25B2',
  triangle_down: '\u25BC',
  infinity: '\u221E',
  spiral: '\u058D',      // Armenian eternity sign
} as const

// Saturn's Magic Square (Kamea of Saturn, 3x3)
export const SATURN_SQUARE: readonly (readonly number[])[] = [
  [2, 7, 6],
  [9, 5, 1],
  [4, 3, 8],
]

// Letter positions around a circle (for Witch Circle method)
// Maps A-Z to angular positions (0-25) * (360/26) degrees
export function letterToCircleAngle(letter: string): number {
  const code = letter.toUpperCase().charCodeAt(0) - 65 // A=0, B=1, ...
  return (code / 26) * 360
}
