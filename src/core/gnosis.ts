// Gnosis timer and guidance engine
// Supports breath control, drumming metronome, and mantra sessions

import type { BreathPattern } from '../types.js'

// ===== Breath Session =====

export type BreathPhase = 'inhale' | 'hold' | 'exhale'

export interface BreathTick {
  readonly phase: BreathPhase
  readonly secondsRemaining: number
  readonly cycle: number
  readonly totalCycles: number
}

/** Create an async generator that yields breath phase ticks */
export async function* createBreathSession(
  pattern: BreathPattern
): AsyncGenerator<BreathTick> {
  for (let cycle = 1; cycle <= pattern.cycles; cycle++) {
    // Inhale
    for (let s = pattern.inhaleSeconds; s > 0; s--) {
      yield { phase: 'inhale', secondsRemaining: s, cycle, totalCycles: pattern.cycles }
    }
    // Hold
    for (let s = pattern.holdSeconds; s > 0; s--) {
      yield { phase: 'hold', secondsRemaining: s, cycle, totalCycles: pattern.cycles }
    }
    // Exhale
    for (let s = pattern.exhaleSeconds; s > 0; s--) {
      yield { phase: 'exhale', secondsRemaining: s, cycle, totalCycles: pattern.cycles }
    }
  }
}

// ===== Drumming Session =====

export interface Beat {
  readonly beatNumber: number
  readonly totalBeats: number
  readonly intervalMs: number
}

/** Create an async generator that yields beat events at a given BPM */
export async function* createDrumSession(
  bpm: number,
  durationMinutes: number
): AsyncGenerator<Beat> {
  const intervalMs = Math.round(60000 / bpm)
  const totalBeats = Math.round(bpm * durationMinutes)

  for (let i = 1; i <= totalBeats; i++) {
    yield { beatNumber: i, totalBeats, intervalMs }
  }
}

// ===== Mantra Session =====

export interface MantraPulse {
  readonly mantra: string
  readonly repetition: number
  readonly totalRepetitions: number
  readonly intensity: number // 0.0 to 1.0 — grows over session
}

/** Create an async generator for mantra repetition */
export async function* createMantraSession(
  mantra: string,
  durationMinutes: number,
  pulsesPerMinute: number = 12
): AsyncGenerator<MantraPulse> {
  const totalRepetitions = Math.round(pulsesPerMinute * durationMinutes)

  for (let i = 1; i <= totalRepetitions; i++) {
    const intensity = Math.min(1.0, i / totalRepetitions)
    yield { mantra, repetition: i, totalRepetitions, intensity }
  }
}

// ===== Timer =====

export interface TimerTick {
  readonly secondsRemaining: number
  readonly totalSeconds: number
  readonly progress: number // 0.0 to 1.0
}

/** Create a simple countdown timer generator */
export async function* createTimer(
  durationMinutes: number
): AsyncGenerator<TimerTick> {
  const totalSeconds = Math.round(durationMinutes * 60)
  for (let s = totalSeconds; s > 0; s--) {
    yield {
      secondsRemaining: s,
      totalSeconds,
      progress: 1 - s / totalSeconds,
    }
  }
}

// ===== Utility =====

/** Format seconds as MM:SS */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Default breath patterns */
export const BREATH_PATTERNS: Record<string, BreathPattern> = {
  relaxed: { inhaleSeconds: 4, holdSeconds: 4, exhaleSeconds: 6, cycles: 10 },
  energizing: { inhaleSeconds: 4, holdSeconds: 7, exhaleSeconds: 8, cycles: 8 },
  intense: { inhaleSeconds: 6, holdSeconds: 6, exhaleSeconds: 6, cycles: 12 },
  quick: { inhaleSeconds: 3, holdSeconds: 2, exhaleSeconds: 4, cycles: 6 },
}
