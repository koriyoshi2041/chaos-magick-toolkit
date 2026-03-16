// Ritual Architect — Interactive CLI flow
// "Structure the formless"

import { c, ask, sleep } from './main.js'
import {
  getAllRituals,
  createCustomRitual,
  executeRitual,
  recordRitualExecution,
  makeStep,
} from '../core/ritual.js'
import { formatTime } from '../core/gnosis.js'
import { GNOSTIC_PENTAGRAM_RITUAL } from '../data/gpr.js'
import type { RitualStep } from '../types.js'
import { getMoonPhase } from '../core/moon.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u235F RITUAL ARCHITECT${c.reset} ${c.dim}\u2014 Structure the formless${c.reset}`)
  console.log('')
}

/** Run through a set of ritual steps with timed/untimed handling */
async function executeSteps(steps: readonly RitualStep[], label: string): Promise<number> {
  let completed = 0
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    console.log('')
    console.log(`  ${c.boldCyan}${label} ${i + 1}/${steps.length}: ${step.name}${c.reset}`)
    console.log(`  ${c.dim}${step.description}${c.reset}`)
    console.log('')
    console.log(`  ${c.white}${step.instruction}${c.reset}`)
    console.log('')

    if (step.durationSeconds) {
      for (let s = step.durationSeconds; s > 0; s--) {
        process.stdout.write(`\r  ${c.dim}${formatTime(s)}${c.reset}    `)
        await sleep(1000)
      }
      console.log(`\r  ${c.boldGreen}\u2713 Step complete${c.reset}          `)
    } else {
      await ask(`  ${c.dim}Press Enter when complete...${c.reset}`)
      console.log(`  ${c.boldGreen}\u2713 Step complete${c.reset}`)
    }
    completed++
  }
  return completed
}

/** Offer GPR banishing — returns true if performed, false if skipped */
async function offerGPRBanishing(phase: 'opening' | 'closing'): Promise<boolean> {
  console.log('')
  console.log(`  ${c.yellow}\u235F GPR ${phase} banishing${c.reset}`)
  const choice = await ask(`  ${c.boldWhite}Press Enter to perform GPR, or S to skip: ${c.reset}`)
  if (choice.trim().toLowerCase() === 's') {
    console.log(`  ${c.dim}Banishing skipped.${c.reset}`)
    return false
  }
  console.log(`  ${c.boldPurple}\u235F Gnostic Pentagram Ritual${c.reset}`)
  await executeSteps(GNOSTIC_PENTAGRAM_RITUAL.steps, 'GPR Step')
  console.log('')
  console.log(`  ${c.boldGreen}\u235F Banishing complete${c.reset}`)
  return true
}

async function runRitualExecution(ritualId: string): Promise<void> {
  const rituals = getAllRituals()
  const ritual = rituals.find(r => r.id === ritualId)
  if (!ritual) {
    console.log(`  ${c.red}Ritual not found.${c.reset}`)
    return
  }

  console.log('')
  console.log(`  ${c.boldPurple}\u235F ${ritual.name}${c.reset}`)
  console.log(`  ${c.dim}${ritual.purpose}${c.reset}`)
  console.log('')

  // Moon phase timing display
  const moon = getMoonPhase()
  console.log(`  ${c.yellow}${moon.emoji} Current moon: ${moon.name} (day ${moon.dayInCycle})${c.reset}`)
  console.log(`  ${c.dim}Consider lunar timing: New moon for beginnings, full moon for culmination,${c.reset}`)
  console.log(`  ${c.dim}waning moon for banishing, waxing moon for growth.${c.reset}`)
  console.log('')

  const startConfirm = await ask(`  ${c.boldWhite}Begin ritual? (y/n): ${c.reset}`)
  if (startConfirm.trim().toLowerCase() !== 'y') return

  const startedAt = new Date()

  // Auto-prepend GPR banishing if ritual requests it (skip for GPR itself)
  if (ritual.banishingBefore && ritual.id !== 'gpr') {
    await offerGPRBanishing('opening')
  }

  // Execute the ritual's own steps
  console.log('')
  console.log(`  ${c.boldPurple}\u235F ${ritual.name} \u2014 Main Working${c.reset}`)
  const stepsCompleted = await executeSteps(ritual.steps, 'Step')

  console.log('')
  console.log(`  ${c.boldPurple}\u235F RITUAL COMPLETE${c.reset}`)

  // Auto-append GPR banishing if ritual requests it (skip for GPR itself)
  if (ritual.banishingAfter && ritual.id !== 'gpr') {
    await offerGPRBanishing('closing')
  }

  // Record execution
  console.log('')
  const notes = await ask(`  ${c.boldWhite}Notes on this working (optional): ${c.reset}`)
  recordRitualExecution({
    templateId: ritual.id,
    startedAt,
    completedAt: new Date(),
    notes: notes || '',
    stepsCompleted,
  })

  console.log(`  ${c.dim}Execution recorded.${c.reset}`)
}

async function createCustomRitualFlow(): Promise<void> {
  console.log('')
  console.log(`  ${c.boldPurple}\u235F CUSTOM RITUAL BUILDER${c.reset}`)
  console.log('')

  const name = await ask(`  ${c.boldWhite}Ritual name: ${c.reset}`)
  if (!name.trim()) {
    console.log(`  ${c.red}Name required.${c.reset}`)
    return
  }

  const purpose = await ask(`  ${c.boldWhite}Purpose: ${c.reset}`)
  const banishBefore = (await ask(`  ${c.boldWhite}Banish before? (y/n): ${c.reset}`)).trim().toLowerCase() === 'y'
  const banishAfter = (await ask(`  ${c.boldWhite}Banish after? (y/n): ${c.reset}`)).trim().toLowerCase() === 'y'

  const steps: RitualStep[] = []
  console.log('')
  console.log(`  ${c.dim}Add steps one at a time. Enter empty name to finish.${c.reset}`)

  let order = 1
  while (true) {
    console.log('')
    const stepName = await ask(`  ${c.boldWhite}Step ${order} name (or Enter to finish): ${c.reset}`)
    if (!stepName.trim()) break

    const description = await ask(`  ${c.boldWhite}Description: ${c.reset}`)
    const instruction = await ask(`  ${c.boldWhite}Instruction: ${c.reset}`)
    const durInput = await ask(`  ${c.boldWhite}Duration in seconds (Enter for untimed): ${c.reset}`)
    const duration = parseInt(durInput.trim()) || null

    steps.push(makeStep(order, stepName, description || stepName, instruction || stepName, duration))
    order++
    console.log(`  ${c.boldGreen}\u2713 Step added${c.reset}`)
  }

  if (steps.length === 0) {
    console.log(`  ${c.red}No steps added. Ritual cancelled.${c.reset}`)
    return
  }

  const ritual = createCustomRitual(name, purpose || name, steps, banishBefore, banishAfter)
  console.log('')
  console.log(`  ${c.boldGreen}\u235F Ritual "${ritual.name}" created with ${steps.length} steps.${c.reset}`)
  console.log(`  ${c.dim}ID: ${ritual.id}${c.reset}`)
}

export async function runRitualArchitect(): Promise<void> {
  printHeader()

  console.log(`  ${c.boldWhite}Choose an action:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} Use a ritual template`)
  console.log(`    ${c.yellow}2.${c.reset} Create custom ritual`)
  console.log('')

  const choice = await ask(`  ${c.boldCyan}\u235F ${c.reset}${c.boldWhite}Action: ${c.reset}`)

  switch (choice.trim()) {
    case '1': {
      const rituals = getAllRituals()
      console.log('')
      console.log(`  ${c.boldWhite}Available rituals:${c.reset}`)
      console.log('')
      rituals.forEach((r, i) => {
        console.log(`    ${c.yellow}${i + 1}.${c.reset} ${r.name}  ${c.dim}\u2014 ${r.purpose.slice(0, 50)}${c.reset}`)
      })
      console.log('')

      const ritualChoice = await ask(`  ${c.boldWhite}Select ritual: ${c.reset}`)
      const index = parseInt(ritualChoice.trim()) - 1
      const selected = rituals[Math.max(0, Math.min(index, rituals.length - 1))]
      if (selected) {
        await runRitualExecution(selected.id)
      }
      break
    }
    case '2':
      await createCustomRitualFlow()
      break
    default:
      console.log(`  ${c.dim}No action taken.${c.reset}`)
  }

  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}
