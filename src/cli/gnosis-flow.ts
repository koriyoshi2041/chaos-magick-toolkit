// Gnosis Engine — Interactive CLI flow
// "Silence the mind, ignite the will"

import { c, ask, sleep } from './main.js'
import { GNOSIS_METHODS } from '../data/gnosis-methods.js'
import {
  createBreathSession,
  createDrumSession,
  createMantraSession,
  createTimer,
  formatTime,
  BREATH_PATTERNS,
} from '../core/gnosis.js'
import type { GnosisType } from '../types.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u25C9 GNOSIS ENGINE${c.reset} ${c.dim}\u2014 Silence the mind, ignite the will${c.reset}`)
  console.log('')
}

export async function runGnosisEngine(): Promise<void> {
  printHeader()

  // Choose gnosis type
  console.log(`  ${c.boldWhite}Select gnosis type:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} Inhibitory  ${c.dim}\u2014 Stillness, silence, withdrawal${c.reset}`)
  console.log(`    ${c.yellow}2.${c.reset} Excitatory  ${c.dim}\u2014 Overload, ecstasy, intensity${c.reset}`)
  console.log('')

  const typeChoice = await ask(`  ${c.boldCyan}\u25C9 ${c.reset}${c.boldWhite}Type (1-2): ${c.reset}`)
  const gnosisType: GnosisType = typeChoice.trim() === '2' ? 'excitatory' : 'inhibitory'

  // Filter and display techniques
  const techniques = GNOSIS_METHODS.filter(m => m.type === gnosisType)
  console.log('')
  console.log(`  ${c.boldWhite}Available ${gnosisType} techniques:${c.reset}`)
  console.log('')
  techniques.forEach((t, i) => {
    console.log(`    ${c.yellow}${i + 1}.${c.reset} ${t.name}  ${c.dim}\u2014 ${t.description}${c.reset}`)
  })
  console.log('')

  const techChoice = await ask(`  ${c.boldCyan}\u25C9 ${c.reset}${c.boldWhite}Technique: ${c.reset}`)
  const techIndex = parseInt(techChoice.trim()) - 1
  const technique = techniques[Math.max(0, Math.min(techIndex, techniques.length - 1))]

  // Configure duration
  const durInput = await ask(`  ${c.boldWhite}Duration in minutes (default ${technique.defaultDurationMinutes}): ${c.reset}`)
  const duration = parseInt(durInput.trim()) || technique.defaultDurationMinutes

  // Show instructions
  console.log('')
  console.log(`  ${c.boldPurple}\u25C9 ${technique.name} \u2014 ${duration} minutes${c.reset}`)
  console.log('')
  for (const instr of technique.instructions) {
    console.log(`  ${c.dim}\u2022 ${instr}${c.reset}`)
  }
  console.log('')

  await ask(`  ${c.boldWhite}Press Enter when ready to begin...${c.reset}`)

  // Run the session based on technique
  console.log('')
  console.log(`  ${c.boldPurple}\u2500\u2500\u2500 SESSION BEGIN \u2500\u2500\u2500${c.reset}`)
  console.log('')

  switch (technique.technique) {
    case 'breathing':
      await runBreathSession(duration, technique.type)
      break
    case 'drumming':
      await runDrumSession(duration)
      break
    case 'mantra':
      await runMantraSession(duration)
      break
    case 'gazing':
      await runGazingSession(duration)
      break
    default:
      await runTimerSession(duration, technique.name)
      break
  }

  console.log('')
  console.log(`  ${c.boldPurple}\u2500\u2500\u2500 SESSION COMPLETE \u2500\u2500\u2500${c.reset}`)
  console.log('')
  console.log(`  \x07`) // terminal bell

  // Post-gnosis integration phase
  console.log(`  ${c.boldCyan}\u25C9 INTEGRATION${c.reset}`)
  console.log('')
  console.log(`  ${c.dim}The transition back matters as much as the journey in.${c.reset}`)
  console.log(`  ${c.dim}Sit quietly for a moment. Let the experience settle.${c.reset}`)
  console.log(`  ${c.dim}Notice what has shifted in your perception.${c.reset}`)
  console.log(`  ${c.dim}If you charged a sigil during gnosis, release it now \u2014${c.reset}`)
  console.log(`  ${c.dim}do not lust for results. The deep mind has received it.${c.reset}`)
  console.log('')
  console.log(`  ${c.boldWhite}Return to ordinary awareness.${c.reset}`)
  console.log(`  ${c.dim}Take a moment before continuing.${c.reset}`)
  console.log('')

  await ask(`  ${c.boldWhite}Press Enter to continue...${c.reset}`)
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}

// ===== Session Runners =====

async function runBreathSession(durationMinutes: number, gnosisType: GnosisType = 'inhibitory'): Promise<void> {
  const patternKey = gnosisType === 'excitatory' ? 'energizing' : 'relaxed'
  const pattern = BREATH_PATTERNS[patternKey]
  const adjustedPattern = { ...pattern, cycles: Math.round(durationMinutes * 60 / (pattern.inhaleSeconds + pattern.holdSeconds + pattern.exhaleSeconds)) }

  const session = createBreathSession(adjustedPattern)
  for await (const tick of session) {
    const symbol = tick.phase === 'inhale' ? '\u25B2' : tick.phase === 'hold' ? '\u25CF' : '\u25BC'
    const color = tick.phase === 'inhale' ? c.boldCyan : tick.phase === 'hold' ? c.boldYellow : c.boldPurple
    const label = tick.phase.toUpperCase().padEnd(7)
    process.stdout.write(`\r  ${color}${symbol} ${label} ${tick.secondsRemaining}s${c.reset}  ${c.dim}[cycle ${tick.cycle}/${tick.totalCycles}]${c.reset}    `)
    await sleep(1000)
  }
  console.log('')
}

async function runDrumSession(durationMinutes: number): Promise<void> {
  const bpm = 120
  const session = createDrumSession(bpm, durationMinutes)
  let count = 0
  for await (const beat of session) {
    count++
    const pulse = count % 4 === 0 ? `${c.boldRed}\u25CF${c.reset}` : `${c.dim}\u25CB${c.reset}`
    process.stdout.write(`\r  ${pulse} ${c.dim}Beat ${beat.beatNumber}/${beat.totalBeats}${c.reset}    `)
    if (count % 4 === 0) {
      process.stdout.write('\x07') // bell on downbeat
    }
    await sleep(beat.intervalMs)
  }
  console.log('')
}

async function runMantraSession(durationMinutes: number): Promise<void> {
  const mantraInput = await ask(`  ${c.boldWhite}Enter your mantra: ${c.reset}`)
  const mantra = mantraInput.trim() || 'IAO'

  const session = createMantraSession(mantra, durationMinutes)
  for await (const pulse of session) {
    const size = Math.round(pulse.intensity * 3)
    const padding = ' '.repeat(3 - size)
    const display = pulse.intensity > 0.7 ? c.boldPurple : pulse.intensity > 0.4 ? c.purple : c.dim
    process.stdout.write(`\r  ${padding}${display}${pulse.mantra}${c.reset}  ${c.dim}[${pulse.repetition}/${pulse.totalRepetitions}]${c.reset}    `)
    await sleep(Math.round(60000 / 12)) // ~12 per minute
  }
  console.log('')
}

async function runGazingSession(durationMinutes: number): Promise<void> {
  console.log(`  ${c.dim}Fix your gaze on the point below.${c.reset}`)
  console.log(`  ${c.dim}Do not blink. Let vision dissolve.${c.reset}`)
  console.log('')

  const timer = createTimer(durationMinutes)
  for await (const tick of timer) {
    const timeStr = formatTime(tick.secondsRemaining)
    process.stdout.write(`\r                    ${c.boldWhite}\u2299${c.reset}         ${c.dim}${timeStr}${c.reset}    `)
    await sleep(1000)
  }
  console.log('')
}

async function runTimerSession(durationMinutes: number, techniqueName: string): Promise<void> {
  console.log(`  ${c.dim}${techniqueName} session in progress...${c.reset}`)
  console.log('')

  const timer = createTimer(durationMinutes)
  for await (const tick of timer) {
    const timeStr = formatTime(tick.secondsRemaining)
    const bar = '\u2593'.repeat(Math.round(tick.progress * 20)) + '\u2591'.repeat(20 - Math.round(tick.progress * 20))
    process.stdout.write(`\r  ${c.purple}${bar}${c.reset} ${c.dim}${timeStr}${c.reset}    `)
    await sleep(1000)
  }
  console.log('')
}
