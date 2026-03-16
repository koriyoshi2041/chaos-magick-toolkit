// Servitor CRUD and lifecycle management
// Data persists to ~/.chaos-magick/servitors.json

import type { Servitor, ServitorStatus, FeedingSchedule, ActivityEntry, SigilResult } from '../types.js'
import { readStore, writeStore } from './storage.js'
import { randomInt } from './random.js'

const STORE_FILE = 'servitors.json'

// ===== ID Generation =====

function generateId(): string {
  const timestamp = Date.now().toString(36)
  const random = randomInt(0, 0xFFFF).toString(36)
  return `srv-${timestamp}-${random}`
}

// ===== CRUD Operations =====

/** Load all servitors from storage */
export function loadServitors(): readonly Servitor[] {
  return readStore<Servitor[]>(STORE_FILE, [])
}

/** Save servitors to storage */
function saveServitors(servitors: readonly Servitor[]): void {
  writeStore(STORE_FILE, servitors)
}

/** Create a new servitor */
export function createServitor(data: {
  readonly name: string
  readonly purpose: string
  readonly sigil: SigilResult
  readonly appearance: string
  readonly housing: string
  readonly activationTrigger: string
  readonly feedingMethod: string
  readonly feedingSchedule: FeedingSchedule
  readonly lifespan: Date | null
  readonly dissolutionCondition: string
  readonly dissolutionMethod: string
}): Servitor {
  const servitor: Servitor = {
    id: generateId(),
    ...data,
    createdAt: new Date(),
    status: 'active',
    activityLog: [{
      date: new Date(),
      action: 'created',
      notes: 'Servitor brought into existence.',
    }],
  }

  const existing = loadServitors()
  saveServitors([...existing, servitor])
  return servitor
}

/** Feed a servitor — mark as fed and log the activity */
export function feedServitor(id: string, notes: string): Servitor | null {
  const servitors = loadServitors()
  const index = servitors.findIndex(s => s.id === id)
  if (index === -1) return null

  const servitor = servitors[index]
  const updated: Servitor = {
    ...servitor,
    feedingSchedule: {
      ...servitor.feedingSchedule,
      lastFed: new Date(),
    },
    activityLog: [
      ...servitor.activityLog,
      { date: new Date(), action: 'fed', notes },
    ],
  }

  const newList = servitors.map((s, i) => i === index ? updated : s)
  saveServitors(newList)
  return updated
}

/** Activate a dormant servitor */
export function activateServitor(id: string, notes: string): Servitor | null {
  return updateServitorStatus(id, 'active', 'activated', notes)
}

/** Set a servitor to dormant */
export function deactivateServitor(id: string, notes: string): Servitor | null {
  return updateServitorStatus(id, 'dormant', 'deactivated', notes)
}

/** Dissolve a servitor permanently */
export function dissolveServitor(id: string, reason: string): Servitor | null {
  return updateServitorStatus(id, 'dissolved', 'dissolved', reason)
}

function updateServitorStatus(
  id: string,
  status: ServitorStatus,
  action: string,
  notes: string
): Servitor | null {
  const servitors = loadServitors()
  const index = servitors.findIndex(s => s.id === id)
  if (index === -1) return null

  const servitor = servitors[index]
  const updated: Servitor = {
    ...servitor,
    status,
    activityLog: [
      ...servitor.activityLog,
      { date: new Date(), action, notes },
    ],
  }

  const newList = servitors.map((s, i) => i === index ? updated : s)
  saveServitors(newList)
  return updated
}

/** Get servitors that are overdue for feeding */
export function getOverdueServitors(servitors: readonly Servitor[]): readonly Servitor[] {
  const now = Date.now()
  return servitors.filter(s => {
    if (s.status !== 'active') return false
    if (!s.feedingSchedule.lastFed) return true

    const lastFed = new Date(s.feedingSchedule.lastFed).getTime()
    const intervals: Record<string, number> = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
    }
    const interval = intervals[s.feedingSchedule.frequency] ?? intervals['weekly']
    return now - lastFed > interval
  })
}

/** Get a single servitor by ID */
export function getServitor(id: string): Servitor | null {
  const servitors = loadServitors()
  return servitors.find(s => s.id === id) ?? null
}

// ===== Name Generation =====

const NAME_PREFIXES = ['Zar', 'Kha', 'Thi', 'Vor', 'Nex', 'Ael', 'Dra', 'Pha', 'Xil', 'Oth']
const NAME_MIDDLES = ['go', 'ri', 'ma', 'lu', 'te', 'na', 'si', 'ke', 'vo', 'ra']
const NAME_SUFFIXES = ['th', 'el', 'on', 'ix', 'us', 'ar', 'is', 'um', 'al', 'os']

/** Generate a random servitor name */
export function generateServitorName(): string {
  const prefix = NAME_PREFIXES[randomInt(0, NAME_PREFIXES.length - 1)]
  const middle = NAME_MIDDLES[randomInt(0, NAME_MIDDLES.length - 1)]
  const suffix = NAME_SUFFIXES[randomInt(0, NAME_SUFFIXES.length - 1)]
  return prefix + middle + suffix
}
