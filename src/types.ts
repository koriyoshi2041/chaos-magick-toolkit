// ===== Sigil System =====

export type SigilMethod = 'spare' | 'witch_circle' | 'magic_square'

export interface SigilResult {
  readonly intent: string
  readonly method: SigilMethod
  readonly consonants: readonly string[]
  readonly uniqueLetters: readonly string[]
  readonly visual: readonly string[]
  readonly createdAt: Date
}

// ===== Gnosis System =====

export type GnosisType = 'inhibitory' | 'excitatory'

export type GnosisTechnique =
  | 'meditation' | 'gazing' | 'breathing' | 'mantra' | 'sensory_deprivation' | 'neither_neither' | 'death_posture'
  | 'dancing' | 'drumming' | 'chanting' | 'pain' | 'emotional_arousal' | 'sexual' | 'overbreathing'

export interface GnosisSession {
  readonly technique: GnosisTechnique
  readonly type: GnosisType
  readonly durationMinutes: number
  readonly breathPattern?: BreathPattern
  readonly bpm?: number
  readonly mantra?: string
  readonly startedAt: Date
}

export interface BreathPattern {
  readonly inhaleSeconds: number
  readonly holdSeconds: number
  readonly exhaleSeconds: number
  readonly cycles: number
}

// ===== Servitor System =====

export type ServitorStatus = 'active' | 'dormant' | 'dissolved'

export interface Servitor {
  readonly id: string
  readonly name: string
  readonly purpose: string
  readonly sigil: SigilResult
  readonly appearance: string
  readonly housing: string
  readonly activationTrigger: string
  readonly feedingMethod: string
  readonly feedingSchedule: FeedingSchedule
  readonly createdAt: Date
  readonly lifespan: Date | null
  readonly dissolutionCondition: string
  readonly dissolutionMethod: string
  readonly status: ServitorStatus
  readonly activityLog: readonly ActivityEntry[]
}

export interface FeedingSchedule {
  readonly frequency: 'daily' | 'weekly' | 'monthly'
  readonly lastFed: Date | null
}

export interface ActivityEntry {
  readonly date: Date
  readonly action: string
  readonly notes: string
}

// ===== Oracle / Divination System =====

export type OracleMethod = 'chaos_star' | 'eight_colors' | 'binary_oracle' | 'bibliomancy' | 'custom'

export interface MagicColor {
  readonly name: string
  readonly color: string
  readonly direction: string
  readonly domain: string
  readonly description: string
  readonly ansiColor: string
}

export interface OracleResult {
  readonly method: OracleMethod
  readonly question: string
  readonly reading: string
  readonly details: readonly string[]
  readonly timestamp: Date
}

// ===== Ritual System =====

export interface RitualStep {
  readonly order: number
  readonly name: string
  readonly description: string
  readonly durationSeconds: number | null
  readonly instruction: string
}

export interface RitualTemplate {
  readonly id: string
  readonly name: string
  readonly purpose: string
  readonly steps: readonly RitualStep[]
  readonly banishingBefore: boolean
  readonly banishingAfter: boolean
  readonly colorAssociation?: string
}

export interface RitualExecution {
  readonly templateId: string
  readonly startedAt: Date
  readonly completedAt: Date | null
  readonly notes: string
  readonly stepsCompleted: number
}

// ===== Magic Equation (Carroll) =====

export interface MagicEquation {
  readonly gnosis: number       // 0-10: depth of gnosis achieved
  readonly link: number         // 0-10: strength of symbolic link (sigil quality)
  readonly awareness: number    // 0-10: subconscious awareness of intent (should be low)
  readonly resistance: number   // 0-10: psychological/environmental resistance
  readonly magicForce: number   // computed: M = (G/10) * (L/10) * (1 - A/10) * (1 - R/10)
}

// ===== Diary / Journal System =====

export interface DiaryEntry {
  readonly id: string
  readonly date: Date
  readonly moonPhase: MoonPhase
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
}

export type MoonPhase =
  | 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous'
  | 'full_moon' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent'

// ===== Storage =====

export interface StorageData {
  readonly servitors: readonly Servitor[]
  readonly diaryEntries: readonly DiaryEntry[]
  readonly customRituals: readonly RitualTemplate[]
  readonly customSymbolSets: readonly SymbolSet[]
  readonly settings: UserSettings
}

export interface SymbolSet {
  readonly name: string
  readonly symbols: readonly { readonly glyph: string; readonly meaning: string }[]
}

export interface UserSettings {
  readonly preferredGnosisTechnique: GnosisTechnique | null
  readonly defaultBreathPattern: BreathPattern
  readonly banishingReminder: boolean
}
