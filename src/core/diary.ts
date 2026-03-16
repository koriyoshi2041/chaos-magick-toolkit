// Magickal diary / journal persistence
// Data stored in ~/.chaos-magick/diary.json

import type { DiaryEntry, MagicEquation, MoonPhase } from '../types.js'
import { readStore, writeStore } from './storage.js'
import { getMoonPhase } from './moon.js'
import { randomInt } from './random.js'

const STORE_FILE = 'diary.json'

// ===== CRUD =====

/** Load all diary entries */
export function loadEntries(): readonly DiaryEntry[] {
  return readStore<DiaryEntry[]>(STORE_FILE, [])
}

function saveEntries(entries: readonly DiaryEntry[]): void {
  writeStore(STORE_FILE, entries)
}

/** Create a new diary entry (auto-fills date and moon phase) */
export function createEntry(data: {
  readonly bodyState: string
  readonly mentalState: string
  readonly technique: string
  readonly symbols: string
  readonly intent: string
  readonly result: string
  readonly dreams: string
  readonly notes: string
  readonly tags: readonly string[]
  readonly linkedServitorId?: string
  readonly linkedRitualId?: string
  readonly magicEquation?: MagicEquation
}): DiaryEntry {
  const now = new Date()
  const moon = getMoonPhase(now)
  const id = `diary-${Date.now().toString(36)}-${randomInt(0, 0xFFF).toString(36)}`

  const entry: DiaryEntry = {
    id,
    date: now,
    moonPhase: moon.phase,
    ...data,
  }

  const existing = loadEntries()
  saveEntries([...existing, entry])
  return entry
}

/** Get a single entry by ID */
export function getEntry(id: string): DiaryEntry | null {
  return loadEntries().find(e => e.id === id) ?? null
}

// ===== Filtering =====

interface DiaryFilters {
  readonly tag?: string
  readonly dateFrom?: Date
  readonly dateTo?: Date
  readonly technique?: string
  readonly moonPhase?: MoonPhase
}

/** List entries with optional filters */
export function listEntries(filters?: DiaryFilters): readonly DiaryEntry[] {
  let entries = loadEntries()

  if (filters?.tag) {
    const tag = filters.tag.toLowerCase()
    entries = entries.filter(e => e.tags.some(t => t.toLowerCase().includes(tag)))
  }
  if (filters?.dateFrom) {
    const from = filters.dateFrom.getTime()
    entries = entries.filter(e => new Date(e.date).getTime() >= from)
  }
  if (filters?.dateTo) {
    const to = filters.dateTo.getTime()
    entries = entries.filter(e => new Date(e.date).getTime() <= to)
  }
  if (filters?.technique) {
    const tech = filters.technique.toLowerCase()
    entries = entries.filter(e => e.technique.toLowerCase().includes(tech))
  }
  if (filters?.moonPhase) {
    entries = entries.filter(e => e.moonPhase === filters.moonPhase)
  }

  return entries
}

/** Full-text search across entries */
export function searchEntries(query: string): readonly DiaryEntry[] {
  const q = query.toLowerCase()
  return loadEntries().filter(e =>
    e.bodyState.toLowerCase().includes(q) ||
    e.mentalState.toLowerCase().includes(q) ||
    e.technique.toLowerCase().includes(q) ||
    e.symbols.toLowerCase().includes(q) ||
    e.intent.toLowerCase().includes(q) ||
    e.result.toLowerCase().includes(q) ||
    e.dreams.toLowerCase().includes(q) ||
    e.notes.toLowerCase().includes(q) ||
    e.tags.some(t => t.toLowerCase().includes(q))
  )
}

// ===== Statistics =====

export interface PracticeStats {
  readonly totalEntries: number
  readonly uniqueTechniques: readonly string[]
  readonly techniqueCounts: Record<string, number>
  readonly moonPhaseCounts: Record<string, number>
  readonly tagCounts: Record<string, number>
  readonly currentStreak: number
  readonly longestStreak: number
}

/** Calculate practice statistics */
export function getStatistics(entries: readonly DiaryEntry[]): PracticeStats {
  const techniqueCounts: Record<string, number> = {}
  const moonPhaseCounts: Record<string, number> = {}
  const tagCounts: Record<string, number> = {}

  for (const e of entries) {
    if (e.technique) {
      techniqueCounts[e.technique] = (techniqueCounts[e.technique] ?? 0) + 1
    }
    moonPhaseCounts[e.moonPhase] = (moonPhaseCounts[e.moonPhase] ?? 0) + 1
    for (const tag of e.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }

  // Calculate streaks (consecutive days with entries)
  const dates = entries
    .map(e => {
      const d = new Date(e.date)
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    })
    .sort((a, b) => a - b)

  const uniqueDates = [...new Set(dates)]
  const DAY_MS = 24 * 60 * 60 * 1000
  let currentStreak = 0
  let longestStreak = 0
  let streak = 0

  for (let i = 0; i < uniqueDates.length; i++) {
    if (i === 0 || uniqueDates[i] - uniqueDates[i - 1] === DAY_MS) {
      streak++
    } else {
      streak = 1
    }
    if (streak > longestStreak) longestStreak = streak
  }

  // Check if the current streak includes today
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  if (uniqueDates.length > 0 && uniqueDates[uniqueDates.length - 1] >= todayStart - DAY_MS) {
    currentStreak = streak
  }

  return {
    totalEntries: entries.length,
    uniqueTechniques: Object.keys(techniqueCounts),
    techniqueCounts,
    moonPhaseCounts,
    tagCounts,
    currentStreak,
    longestStreak,
  }
}
