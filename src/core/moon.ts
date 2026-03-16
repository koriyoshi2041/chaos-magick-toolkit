// Moon phase calculation using synodic period algorithm

import type { MoonPhase } from '../types.js'

// Known new moon epoch: January 6, 2000 18:14 UTC
const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z').getTime()
const SYNODIC_PERIOD = 29.53058770576 // days

interface MoonPhaseInfo {
  readonly phase: MoonPhase
  readonly name: string
  readonly emoji: string
  readonly dayInCycle: number
}

/** Calculate moon phase for a given date */
export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const diffMs = date.getTime() - KNOWN_NEW_MOON
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  const cyclePosition = ((diffDays % SYNODIC_PERIOD) + SYNODIC_PERIOD) % SYNODIC_PERIOD
  const dayInCycle = Math.floor(cyclePosition)

  // Divide the cycle into 8 phases
  const phaseIndex = Math.floor((cyclePosition / SYNODIC_PERIOD) * 8) % 8

  const phases: readonly { phase: MoonPhase; name: string; emoji: string }[] = [
    { phase: 'new_moon', name: 'New Moon', emoji: '\u{1F311}' },
    { phase: 'waxing_crescent', name: 'Waxing Crescent', emoji: '\u{1F312}' },
    { phase: 'first_quarter', name: 'First Quarter', emoji: '\u{1F313}' },
    { phase: 'waxing_gibbous', name: 'Waxing Gibbous', emoji: '\u{1F314}' },
    { phase: 'full_moon', name: 'Full Moon', emoji: '\u{1F315}' },
    { phase: 'waning_gibbous', name: 'Waning Gibbous', emoji: '\u{1F316}' },
    { phase: 'last_quarter', name: 'Last Quarter', emoji: '\u{1F317}' },
    { phase: 'waning_crescent', name: 'Waning Crescent', emoji: '\u{1F318}' },
  ]

  const info = phases[phaseIndex]
  return { ...info, dayInCycle }
}
