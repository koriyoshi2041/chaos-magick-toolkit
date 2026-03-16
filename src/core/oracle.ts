// Chaos Oracle — divination engine using crypto randomness
// Four methods: Chaos Star, Eight Colors, Binary Oracle, Bibliomancy

import type { OracleMethod, OracleResult } from '../types.js'
import { randomInt, randomPick, randomByte, randomBits } from './random.js'
import { EIGHT_COLORS } from '../data/colors.js'
import { CHAOS_QUOTES } from '../data/quotes.js'

// ===== Chaos Star Reading =====
// Select one of 8 directions on the Chaosphere

const CHAOS_STAR_MEANINGS: readonly string[] = [
  'The path of Pure Magic opens before you. Trust the process — your will shapes reality.',
  'Death and transformation. Something must end for the new to begin. Release your grip.',
  'Material abundance flows toward you. Practical steps yield tangible rewards.',
  'Love and connection are the key. Open your heart — vulnerability is strength here.',
  'The Self demands attention. Who are you becoming? Ego transformation is required.',
  'Creative and vital force surges. Channel passion into creation. Life energy is abundant.',
  'Intellect illuminates the way. Think clearly, communicate precisely, strategize.',
  'Conflict and competition. Assert yourself with force. Victory goes to the bold.',
]

export function chaosStarReading(question: string): OracleResult {
  const index = randomInt(0, 7)
  const color = EIGHT_COLORS[index]

  return {
    method: 'chaos_star',
    question,
    reading: `The Chaos Star points ${color.direction} — the realm of ${color.name} (${color.domain}).`,
    details: [
      `Color: ${color.name}`,
      `Direction: ${color.direction}`,
      `Domain: ${color.domain}`,
      `Description: ${color.description}`,
      '',
      `Oracle: ${CHAOS_STAR_MEANINGS[index]}`,
    ],
    timestamp: new Date(),
  }
}

// ===== Eight Colors Reading =====
// Two colors: Primary (situation) + Secondary (action)
// 8x8 = 64 unique combination readings

// Each color has 8 readings: one for each secondary color it pairs with
// Index: COLOR_MATRIX[primary][secondary]
const COLOR_MATRIX: readonly (readonly string[])[] = [
  // Octarine (Pure Magic) as primary
  [
    'Double magic — the situation is purely magical in nature. Engage with full sorcerous intent.',
    'Magic dissolves into the void. A working must end before a new one can begin.',
    'Enchant for material gain. Magic and wealth align — practical sorcery is favored.',
    'Magic opens the heart. Emotional enchantment is potent now.',
    'Magic transforms the self. Your identity is fluid — reshape it through sorcery.',
    'Magic and passion merge. Creative force amplifies your workings tremendously.',
    'Magic sharpens the mind. Intellectual sorcery — plan your enchantment carefully.',
    'Magic demands action. Aggressive enchantment is called for. Strike with will.',
  ],
  // Black (Death Magic) as primary
  [
    'Transform through pure magic. The ending carries seeds of sorcerous power.',
    'Double death — total dissolution. Release everything. Rebirth follows annihilation.',
    'Destruction yields treasure. Something must die so wealth can flow in.',
    'Grief and love intertwine. Loss opens the heart to deeper connection.',
    'The ego must die to be reborn. Surrender who you were to become who you will be.',
    'Death and desire merge. Passion burns through what was — creation from ashes.',
    'Analyze what must end. Think clearly about what to release and why.',
    'Fight the dying. Not all endings are welcome — resist what seeks to destroy prematurely.',
  ],
  // Blue (Wealth Magic) as primary
  [
    'Enchant your resources. Apply magical thinking to material abundance.',
    'Release attachment to wealth. Hoarding blocks the flow of prosperity.',
    'Double wealth — abundance multiplies. Financial sorcery is powerfully favored now.',
    'Wealth flows through connection. Generosity and love attract prosperity.',
    'Invest in yourself. Spend resources on transformation and personal power.',
    'Passionate pursuit of wealth. Channel desire into material manifestation.',
    'Strategic wealth-building. Plan your financial sorcery with precision.',
    'Compete for resources. Assert yourself in matters of abundance.',
  ],
  // Green (Love Magic) as primary
  [
    'Enchant for love. Apply pure magic to matters of connection and attraction.',
    'Release a relationship. Something in your emotional life must end to heal.',
    'Love brings abundance. Connection and generosity attract material wealth.',
    'Double love — deep emotional resonance. The heart speaks to the heart.',
    'Love transforms you. A relationship is reshaping who you are — allow it.',
    'Passion ignites love. Sexual and creative energy deepens emotional bonds.',
    'Think about love clearly. Analyze your emotional patterns with honesty.',
    'Fight for love. Defend what you care about. Assert your emotional needs.',
  ],
  // Yellow (Ego Magic) as primary
  [
    'Transform through sorcery. Apply magical will to reshape your identity.',
    'The old self must die. Ego dissolution precedes genuine transformation.',
    'Build wealth from self-knowledge. Your identity is your greatest resource.',
    'Self-love is required. You cannot transform without compassion for yourself.',
    'Double ego — intense self-focus. Identity work is paramount now.',
    'Passionate self-creation. Channel desire into becoming who you choose to be.',
    'Know thyself — deeply. Intellectual self-examination reveals the path forward.',
    'Assert your identity. Stand firm in who you are against external pressure.',
  ],
  // Purple (Sex Magic) as primary
  [
    'Channel desire into magic. Pure sorcerous power flows through passion.',
    'Desire must die to be reborn. Release old patterns of passion and craving.',
    'Passion generates wealth. Channel creative and sexual energy into abundance.',
    'Passion and love unite. Deep desire flows into emotional bonding.',
    'Desire reshapes the self. Sexual and creative energy transforms identity.',
    'Double passion — overwhelming creative force. Channel it or be consumed.',
    'Understand your desires. Analyze what you truly want beneath the surface.',
    'Aggressive passion. Pursue what you desire with force and determination.',
  ],
  // Orange (Thinking Magic) as primary
  [
    'Think magically. Apply sorcerous insight to intellectual problems.',
    'Let old ideas die. Mental frameworks that no longer serve must be abandoned.',
    'Strategic thinking yields wealth. Plan carefully for material results.',
    'Think with the heart. Emotional intelligence illuminates what logic cannot.',
    'Rethink who you are. Intellectual reframing of identity is powerful now.',
    'Passionate thinking. Let desire fuel your analysis and planning.',
    'Double intellect — pure mental clarity. The mind is razor-sharp now.',
    'Debate and defend your ideas. Intellectual combat sharpens your position.',
  ],
  // Red (War Magic) as primary
  [
    'Wage magical war. Apply sorcerous force to conflicts and competition.',
    'Destroy the opposition utterly. Death magic in service of victory.',
    'Fight for wealth. Competitive action yields material reward.',
    'Fight for love. Protect what matters to you with fierce determination.',
    'Battle transforms you. Conflict forges a stronger self — embrace the ordeal.',
    'Passionate aggression. Channel desire and rage into overwhelming force.',
    'Strategic warfare. Plan your battles with intellectual precision.',
    'Double war — total conflict. All-out aggression. Hold nothing back.',
  ],
]

export function eightColorsReading(question: string): OracleResult {
  const primary = randomInt(0, 7)
  const secondary = randomInt(0, 7)
  const pColor = EIGHT_COLORS[primary]
  const sColor = EIGHT_COLORS[secondary]

  const oracleText = COLOR_MATRIX[primary][secondary]

  return {
    method: 'eight_colors',
    question,
    reading: `${pColor.name} (${pColor.domain}) meets ${sColor.name} (${sColor.domain}).`,
    details: [
      `Primary: ${pColor.name} — ${pColor.domain}`,
      `  ${pColor.description}`,
      `Secondary: ${sColor.name} — ${sColor.domain}`,
      `  ${sColor.description}`,
      '',
      `Reading: ${oracleText}`,
      '',
      `Action: Apply ${sColor.domain.toLowerCase()} to the situation of ${pColor.domain.toLowerCase()}.`,
    ],
    timestamp: new Date(),
  }
}

// ===== Binary Oracle =====
// Generate 8 random bits to form a byte, interpret the pattern

const BINARY_ORACLE_TEXTS: readonly string[] = [
  'The void speaks silence. Wait.',
  'A single spark in darkness. The beginning.',
  'Two paths diverge. Choose without hesitation.',
  'Growth from nothing. Trust the process.',
  'Foundation is set. Build upon it.',
  'Change ripples outward. Your influence spreads.',
  'Harmony emerges from chaos. Balance found.',
  'The gate opens. Step through.',
  'Reversal. What was up is now down.',
  'The spiral turns inward. Introspection required.',
  'Connection bridges the gap. Reach out.',
  'Abundance overflows. Share freely.',
  'The tower trembles. Prepare for upheaval.',
  'Transformation accelerates. Surrender to it.',
  'The star burns bright. Your will manifests.',
  'Completion. The circle closes.',
]

export function binaryOracleReading(question: string): OracleResult {
  const byte = randomByte()
  const bits = randomBits(8)
  const binaryStr = bits.map(b => b ? '1' : '0').join('')
  const oracleIndex = byte % BINARY_ORACLE_TEXTS.length
  const oracleText = BINARY_ORACLE_TEXTS[oracleIndex]

  // Geomancy-style figure from upper and lower nibbles
  const upperNibble = (byte >> 4) & 0x0F
  const lowerNibble = byte & 0x0F

  return {
    method: 'binary_oracle',
    question,
    reading: oracleText,
    details: [
      `Byte: ${byte} (0x${byte.toString(16).toUpperCase().padStart(2, '0')})`,
      `Binary: ${binaryStr}`,
      `Upper figure: ${upperNibble.toString(2).padStart(4, '0')}`,
      `Lower figure: ${lowerNibble.toString(2).padStart(4, '0')}`,
      '',
      `Oracle: ${oracleText}`,
    ],
    timestamp: new Date(),
  }
}

// ===== Bibliomancy =====
// Random selection from a text source

export function bibliomancyReading(
  question: string,
  source: readonly string[] = CHAOS_QUOTES
): OracleResult {
  const passage = randomPick(source)

  return {
    method: 'bibliomancy',
    question,
    reading: passage,
    details: [
      'The text was opened at random.',
      'Your finger fell upon this passage:',
      '',
      passage,
      '',
      'Meditate on how this speaks to your question.',
    ],
    timestamp: new Date(),
  }
}
