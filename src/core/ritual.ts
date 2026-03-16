// Ritual template and builder engine

import type { RitualTemplate, RitualStep, RitualExecution } from '../types.js'
import { readStore, writeStore } from './storage.js'
import { BUILTIN_RITUALS } from '../data/gpr.js'
import { randomInt } from './random.js'

const STORE_FILE = 'rituals.json'
const HISTORY_FILE = 'ritual-history.json'

// ===== Template Management =====

/** Get all built-in ritual templates */
export function getBuiltinRituals(): readonly RitualTemplate[] {
  return BUILTIN_RITUALS
}

/** Load custom rituals from storage */
export function loadCustomRituals(): readonly RitualTemplate[] {
  return readStore<RitualTemplate[]>(STORE_FILE, [])
}

/** Get all rituals (built-in + custom) */
export function getAllRituals(): readonly RitualTemplate[] {
  return [...BUILTIN_RITUALS, ...loadCustomRituals()]
}

/** Create a custom ritual template */
export function createCustomRitual(
  name: string,
  purpose: string,
  steps: readonly RitualStep[],
  banishingBefore: boolean = true,
  banishingAfter: boolean = true
): RitualTemplate {
  const id = `custom-${Date.now().toString(36)}-${randomInt(0, 0xFFF).toString(36)}`
  const ritual: RitualTemplate = {
    id,
    name,
    purpose,
    steps,
    banishingBefore,
    banishingAfter,
  }

  const existing = loadCustomRituals()
  writeStore(STORE_FILE, [...existing, ritual])
  return ritual
}

/** Find a ritual by ID */
export function getRitual(id: string): RitualTemplate | null {
  return getAllRituals().find(r => r.id === id) ?? null
}

// ===== Ritual Execution =====

export interface RitualProgress {
  readonly step: RitualStep
  readonly stepIndex: number
  readonly totalSteps: number
  readonly ritualName: string
}

/** Create an async generator that yields each step of a ritual */
export async function* executeRitual(
  template: RitualTemplate
): AsyncGenerator<RitualProgress> {
  for (let i = 0; i < template.steps.length; i++) {
    yield {
      step: template.steps[i],
      stepIndex: i,
      totalSteps: template.steps.length,
      ritualName: template.name,
    }
  }
}

// ===== History =====

/** Load ritual execution history */
export function loadRitualHistory(): readonly RitualExecution[] {
  return readStore<RitualExecution[]>(HISTORY_FILE, [])
}

/** Record a ritual execution */
export function recordRitualExecution(execution: RitualExecution): void {
  const history = loadRitualHistory()
  writeStore(HISTORY_FILE, [...history, execution])
}

/** Create a RitualStep helper */
export function makeStep(
  order: number,
  name: string,
  description: string,
  instruction: string,
  durationSeconds: number | null = null
): RitualStep {
  return { order, name, description, durationSeconds, instruction }
}
