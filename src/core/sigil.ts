// Sigil generation engine — three methods from Chaos Magick tradition
// Based on Austin Osman Spare's technique and extensions

import type { SigilMethod, SigilResult } from '../types.js'
import { randomInt, randomPick } from './random.js'
import { SATURN_SQUARE } from '../data/symbols.js'

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U'])

// ===== Intent Processing =====

interface ProcessedIntent {
  readonly original: string
  readonly uppercased: string
  readonly consonants: readonly string[]
  readonly uniqueLetters: readonly string[]
}

/** Process a statement of intent: uppercase, remove vowels, deduplicate */
export function processIntent(intent: string): ProcessedIntent {
  const uppercased = intent.toUpperCase().replace(/[^A-Z]/g, '')
  const consonants = [...uppercased].filter(ch => !VOWELS.has(ch))
  const seen = new Set<string>()
  const uniqueLetters: string[] = []
  for (const ch of consonants) {
    if (!seen.has(ch)) {
      seen.add(ch)
      uniqueLetters.push(ch)
    }
  }
  return { original: intent, uppercased, consonants, uniqueLetters }
}

// ===== Spare's Classic Method =====

// Each letter maps to a set of line segments on a 7x7 grid
// Simplified stroke definitions: each letter contributes strokes
const LETTER_STROKES: Record<string, readonly { x1: number; y1: number; x2: number; y2: number }[]> = {
  B: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 0, x2: 4, y2: 0 }, { x1: 4, y1: 0, x2: 4, y2: 3 }, { x1: 1, y1: 3, x2: 4, y2: 3 }],
  C: [{ x1: 5, y1: 0, x2: 2, y2: 0 }, { x1: 2, y1: 0, x2: 2, y2: 6 }, { x1: 2, y1: 6, x2: 5, y2: 6 }],
  D: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 0, x2: 4, y2: 3 }, { x1: 4, y1: 3, x2: 1, y2: 6 }],
  F: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 0, x2: 5, y2: 0 }, { x1: 1, y1: 3, x2: 4, y2: 3 }],
  G: [{ x1: 5, y1: 1, x2: 2, y2: 0 }, { x1: 2, y1: 0, x2: 2, y2: 6 }, { x1: 2, y1: 6, x2: 5, y2: 6 }, { x1: 5, y1: 6, x2: 5, y2: 3 }],
  H: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 5, y1: 0, x2: 5, y2: 6 }, { x1: 1, y1: 3, x2: 5, y2: 3 }],
  J: [{ x1: 4, y1: 0, x2: 4, y2: 5 }, { x1: 4, y1: 5, x2: 2, y2: 6 }],
  K: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 5, y1: 0, x2: 1, y2: 3 }, { x1: 1, y1: 3, x2: 5, y2: 6 }],
  L: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 6, x2: 5, y2: 6 }],
  M: [{ x1: 0, y1: 6, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: 3, y2: 3 }, { x1: 3, y1: 3, x2: 6, y2: 0 }, { x1: 6, y1: 0, x2: 6, y2: 6 }],
  N: [{ x1: 1, y1: 6, x2: 1, y2: 0 }, { x1: 1, y1: 0, x2: 5, y2: 6 }, { x1: 5, y1: 6, x2: 5, y2: 0 }],
  P: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 0, x2: 4, y2: 0 }, { x1: 4, y1: 0, x2: 4, y2: 3 }, { x1: 4, y1: 3, x2: 1, y2: 3 }],
  Q: [{ x1: 2, y1: 0, x2: 5, y2: 0 }, { x1: 5, y1: 0, x2: 5, y2: 4 }, { x1: 5, y1: 4, x2: 2, y2: 6 }, { x1: 2, y1: 6, x2: 2, y2: 0 }, { x1: 4, y1: 4, x2: 6, y2: 6 }],
  R: [{ x1: 1, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 0, x2: 4, y2: 0 }, { x1: 4, y1: 0, x2: 4, y2: 3 }, { x1: 4, y1: 3, x2: 1, y2: 3 }, { x1: 3, y1: 3, x2: 5, y2: 6 }],
  S: [{ x1: 5, y1: 0, x2: 1, y2: 0 }, { x1: 1, y1: 0, x2: 1, y2: 3 }, { x1: 1, y1: 3, x2: 5, y2: 3 }, { x1: 5, y1: 3, x2: 5, y2: 6 }, { x1: 5, y1: 6, x2: 1, y2: 6 }],
  T: [{ x1: 0, y1: 0, x2: 6, y2: 0 }, { x1: 3, y1: 0, x2: 3, y2: 6 }],
  V: [{ x1: 0, y1: 0, x2: 3, y2: 6 }, { x1: 3, y1: 6, x2: 6, y2: 0 }],
  W: [{ x1: 0, y1: 0, x2: 1, y2: 6 }, { x1: 1, y1: 6, x2: 3, y2: 3 }, { x1: 3, y1: 3, x2: 5, y2: 6 }, { x1: 5, y1: 6, x2: 6, y2: 0 }],
  X: [{ x1: 0, y1: 0, x2: 6, y2: 6 }, { x1: 6, y1: 0, x2: 0, y2: 6 }],
  Y: [{ x1: 0, y1: 0, x2: 3, y2: 3 }, { x1: 6, y1: 0, x2: 3, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 6 }],
  Z: [{ x1: 0, y1: 0, x2: 6, y2: 0 }, { x1: 6, y1: 0, x2: 0, y2: 6 }, { x1: 0, y1: 6, x2: 6, y2: 6 }],
}

/** Draw a line on a character grid using Bresenham's algorithm */
function drawLine(grid: string[][], x1: number, y1: number, x2: number, y2: number, char: string): void {
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  const sx = x1 < x2 ? 1 : -1
  const sy = y1 < y2 ? 1 : -1
  let err = dx - dy
  let cx = x1
  let cy = y1

  while (true) {
    if (cy >= 0 && cy < grid.length && cx >= 0 && cx < grid[0].length) {
      grid[cy][cx] = char
    }
    if (cx === x2 && cy === y2) break
    const e2 = 2 * err
    if (e2 > -dy) { err -= dy; cx += sx }
    if (e2 < dx) { err += dx; cy += sy }
  }
}

/** Generate a sigil using Spare's letter-overlay method */
export function generateSpareSigil(uniqueLetters: readonly string[]): readonly string[] {
  const SIZE = 13
  const grid: string[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ' ')
  )

  // Overlay letter strokes, scaled to grid size
  const lineChars = ['\u2500', '\u2502', '\u2571', '\u2572', '\u2573', '\u25CF', '\u25CB', '\u2736']
  for (const letter of uniqueLetters) {
    const strokes = LETTER_STROKES[letter]
    if (!strokes) continue
    const ch = randomPick(lineChars)
    for (const s of strokes) {
      const sx1 = Math.round((s.x1 / 6) * (SIZE - 1))
      const sy1 = Math.round((s.y1 / 6) * (SIZE - 1))
      const sx2 = Math.round((s.x2 / 6) * (SIZE - 1))
      const sy2 = Math.round((s.y2 / 6) * (SIZE - 1))
      drawLine(grid, sx1, sy1, sx2, sy2, ch)
    }
  }

  // Add center point
  const mid = Math.floor(SIZE / 2)
  grid[mid][mid] = '\u25C9'

  // Add corner markers
  grid[0][0] = '\u25CB'
  grid[0][SIZE - 1] = '\u25CB'
  grid[SIZE - 1][0] = '\u25CB'
  grid[SIZE - 1][SIZE - 1] = '\u25CB'

  return grid.map(row => row.join(' '))
}

// ===== Witch Circle Method =====

// Three concentric rings: outer (A-I), middle (J-R), inner (S-Z)
const RING_LETTERS: readonly (readonly string[])[] = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],       // outer ring
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],       // middle ring
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],             // inner ring
]

/** Get the ring index and position for a letter on the Witch Circle */
function letterToRingPosition(letter: string): { ring: number; index: number } {
  for (let ring = 0; ring < RING_LETTERS.length; ring++) {
    const idx = RING_LETTERS[ring].indexOf(letter)
    if (idx !== -1) return { ring, index: idx }
  }
  return { ring: 0, index: 0 }
}

/** Get x,y coordinates for a letter on the Witch Circle grid */
function letterToCircleXY(
  letter: string,
  cx: number,
  cy: number,
  radii: readonly number[]
): { x: number; y: number } {
  const pos = letterToRingPosition(letter)
  const ringLetters = RING_LETTERS[pos.ring]
  const angle = (pos.index / ringLetters.length) * 2 * Math.PI - Math.PI / 2
  const r = radii[pos.ring]
  return {
    x: Math.round(cx + r * Math.cos(angle)),
    y: Math.round(cy + r * Math.sin(angle)),
  }
}

/** Generate a sigil using three concentric rings (traditional Witch's Sigil Wheel) */
export function generateWitchCircle(uniqueLetters: readonly string[]): readonly string[] {
  const OUTER_R = 10
  const MIDDLE_R = 7
  const INNER_R = 4
  const RADII = [OUTER_R, MIDDLE_R, INNER_R] as const
  const SIZE = OUTER_R * 2 + 1
  const cx = OUTER_R
  const cy = OUTER_R

  const grid: string[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ' ')
  )

  // Draw three concentric ring outlines with dots
  for (const r of RADII) {
    const steps = Math.max(40, r * 8)
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * 2 * Math.PI
      const x = Math.round(cx + r * Math.cos(angle))
      const y = Math.round(cy + r * Math.sin(angle))
      if (y >= 0 && y < SIZE && x >= 0 && x < SIZE && grid[y][x] === ' ') {
        grid[y][x] = '\u00B7'
      }
    }
  }

  // Place all 26 letters on their respective rings
  for (let ring = 0; ring < RING_LETTERS.length; ring++) {
    const letters = RING_LETTERS[ring]
    const r = RADII[ring]
    for (let i = 0; i < letters.length; i++) {
      const angle = (i / letters.length) * 2 * Math.PI - Math.PI / 2
      const x = Math.round(cx + r * Math.cos(angle))
      const y = Math.round(cy + r * Math.sin(angle))
      if (y >= 0 && y < SIZE && x >= 0 && x < SIZE) {
        const letter = letters[i]
        grid[y][x] = uniqueLetters.includes(letter) ? letter : '\u00B7'
      }
    }
  }

  // Connect consecutive unique letters with lines across rings
  for (let i = 0; i < uniqueLetters.length - 1; i++) {
    const p1 = letterToCircleXY(uniqueLetters[i], cx, cy, RADII)
    const p2 = letterToCircleXY(uniqueLetters[i + 1], cx, cy, RADII)
    drawLine(grid, p1.x, p1.y, p2.x, p2.y, '\u2022')
  }

  // Restore letter positions on top of connecting lines
  for (const letter of uniqueLetters) {
    const p = letterToCircleXY(letter, cx, cy, RADII)
    if (p.y >= 0 && p.y < SIZE && p.x >= 0 && p.x < SIZE) {
      grid[p.y][p.x] = letter
    }
  }

  // Mark start with 'o' and end with 'x'
  if (uniqueLetters.length > 0) {
    const start = letterToCircleXY(uniqueLetters[0], cx, cy, RADII)
    if (start.y > 0 && start.y < SIZE && start.x >= 0 && start.x < SIZE) {
      grid[start.y - 1][start.x] = 'o'
    }
    if (uniqueLetters.length > 1) {
      const end = letterToCircleXY(uniqueLetters[uniqueLetters.length - 1], cx, cy, RADII)
      if (end.y + 1 < SIZE && end.x >= 0 && end.x < SIZE) {
        grid[end.y + 1][end.x] = 'x'
      }
    }
  }

  // Center point
  grid[cy][cx] = '\u25C9'

  return grid.map(row => row.join(' '))
}

// ===== Magic Square (Kamea of Saturn) Method =====

/** Map a letter to its position on the 3x3 Saturn square */
function letterToSquarePosition(letter: string): { row: number; col: number } {
  const num = ((letter.charCodeAt(0) - 65) % 9) + 1 // 1-9
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (SATURN_SQUARE[r][c] === num) return { row: r, col: c }
    }
  }
  return { row: 1, col: 1 } // center fallback
}

/** Generate a sigil by tracing letter paths through Saturn's Magic Square */
export function generateMagicSquare(uniqueLetters: readonly string[]): readonly string[] {
  const CELL_SIZE = 5
  const GRID_SIZE = 3 * CELL_SIZE
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ' ')
  )

  // Draw the 3x3 grid lines
  for (let i = 0; i <= 3; i++) {
    const pos = i * CELL_SIZE - (i > 0 ? 1 : 0)
    for (let j = 0; j < GRID_SIZE; j++) {
      if (pos >= 0 && pos < GRID_SIZE) {
        grid[pos][j] = '\u2500'
        grid[j][pos] = '\u2502'
      }
    }
  }

  // Place Saturn square numbers
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cx = c * CELL_SIZE + Math.floor(CELL_SIZE / 2)
      const cy = r * CELL_SIZE + Math.floor(CELL_SIZE / 2)
      if (cy < GRID_SIZE && cx < GRID_SIZE) {
        grid[cy][cx] = String(SATURN_SQUARE[r][c])
      }
    }
  }

  // Trace path through the square for each consecutive pair of letters
  for (let i = 0; i < uniqueLetters.length - 1; i++) {
    const pos1 = letterToSquarePosition(uniqueLetters[i])
    const pos2 = letterToSquarePosition(uniqueLetters[i + 1])

    const x1 = pos1.col * CELL_SIZE + Math.floor(CELL_SIZE / 2)
    const y1 = pos1.row * CELL_SIZE + Math.floor(CELL_SIZE / 2)
    const x2 = pos2.col * CELL_SIZE + Math.floor(CELL_SIZE / 2)
    const y2 = pos2.row * CELL_SIZE + Math.floor(CELL_SIZE / 2)

    drawLine(grid, x1, y1, x2, y2, '\u2022')
  }

  // Mark start and end
  if (uniqueLetters.length > 0) {
    const start = letterToSquarePosition(uniqueLetters[0])
    const sx = start.col * CELL_SIZE + Math.floor(CELL_SIZE / 2)
    const sy = start.row * CELL_SIZE + Math.floor(CELL_SIZE / 2)
    if (sy < GRID_SIZE && sx < GRID_SIZE) {
      grid[sy][sx] = '\u25CF'
    }

    if (uniqueLetters.length > 1) {
      const end = letterToSquarePosition(uniqueLetters[uniqueLetters.length - 1])
      const ex = end.col * CELL_SIZE + Math.floor(CELL_SIZE / 2)
      const ey = end.row * CELL_SIZE + Math.floor(CELL_SIZE / 2)
      if (ey < GRID_SIZE && ex < GRID_SIZE) {
        grid[ey][ex] = '\u25CB'
      }
    }
  }

  return grid.map(row => row.join(' '))
}

// ===== Public API =====

/** Create a complete sigil result from an intent and method */
export function createSigil(intent: string, method: SigilMethod): SigilResult {
  const processed = processIntent(intent)

  let visual: readonly string[]
  switch (method) {
    case 'spare':
      visual = generateSpareSigil(processed.uniqueLetters)
      break
    case 'witch_circle':
      visual = generateWitchCircle(processed.uniqueLetters)
      break
    case 'magic_square':
      visual = generateMagicSquare(processed.uniqueLetters)
      break
  }

  return {
    intent,
    method,
    consonants: processed.consonants,
    uniqueLetters: processed.uniqueLetters,
    visual,
    createdAt: new Date(),
  }
}

/** Generate a "destruction" animation for the forgetting phase */
export function generateDestructionFrames(visual: readonly string[]): readonly (readonly string[])[] {
  const frames: string[][] = []
  const chars = visual.map(line => [...line])

  // Progressive dissolution: replace characters with noise, then blanks
  const noiseChars = ['\u2591', '\u2592', '\u2593', '\u2588', ' ', ' ', ' ']
  for (let frame = 0; frame < 5; frame++) {
    const current = chars.map(row => [...row])
    const replaceChance = (frame + 1) * 0.2

    for (let y = 0; y < current.length; y++) {
      for (let x = 0; x < current[y].length; x++) {
        if (current[y][x] !== ' ' && Math.random() < replaceChance) {
          current[y][x] = randomPick(noiseChars)
        }
      }
    }
    frames.push(current.map(row => row.join('')))
  }

  // Final blank frame
  frames.push(visual.map(() => ''))

  return frames
}
