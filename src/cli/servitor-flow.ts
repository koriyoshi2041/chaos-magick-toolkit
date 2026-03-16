// Servitor Lab — Interactive CLI flow
// "Thought becomes Entity"

import { c, ask, sleep } from './main.js'
import {
  loadServitors,
  createServitor,
  feedServitor,
  dissolveServitor,
  getOverdueServitors,
  generateServitorName,
} from '../core/servitor.js'
import { createSigil } from '../core/sigil.js'
import type { Servitor, FeedingSchedule } from '../types.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u2295 SERVITOR LAB${c.reset} ${c.dim}\u2014 Thought becomes Entity${c.reset}`)
  console.log('')
}

function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function displayServitorList(servitors: readonly Servitor[]): void {
  if (servitors.length === 0) {
    console.log(`  ${c.dim}No servitors created yet.${c.reset}`)
    return
  }

  const overdue = getOverdueServitors(servitors)
  const overdueIds = new Set(overdue.map(s => s.id))

  for (const s of servitors) {
    const statusColor = s.status === 'active' ? c.boldGreen : s.status === 'dormant' ? c.yellow : c.gray
    const statusIcon = s.status === 'active' ? '\u25CF' : s.status === 'dormant' ? '\u25CB' : '\u2715'
    const overdueWarn = overdueIds.has(s.id) ? ` ${c.boldRed}[HUNGRY]${c.reset}` : ''
    console.log(`  ${statusColor}${statusIcon}${c.reset} ${c.boldWhite}${s.name}${c.reset} ${c.dim}\u2014 ${s.purpose}${c.reset}${overdueWarn}`)
    console.log(`    ${c.dim}Status: ${s.status} | Created: ${formatDate(s.createdAt)} | Fed: ${s.feedingSchedule.lastFed ? formatDate(s.feedingSchedule.lastFed) : 'never'}${c.reset}`)
  }
}

async function createServitorWizard(): Promise<void> {
  console.log('')
  console.log(`  ${c.boldPurple}\u2295 SERVITOR CREATION WIZARD${c.reset}`)
  console.log('')

  // Purpose
  const purpose = await ask(`  ${c.boldWhite}Purpose (what should it do?): ${c.reset}`)
  if (!purpose.trim()) {
    console.log(`  ${c.red}A servitor needs a purpose.${c.reset}`)
    return
  }

  // Name
  const suggested = generateServitorName()
  const nameInput = await ask(`  ${c.boldWhite}Name (default: ${suggested}): ${c.reset}`)
  const name = nameInput.trim() || suggested

  // Appearance
  const appearance = await ask(`  ${c.boldWhite}Describe its appearance: ${c.reset}`)

  // Housing — where does the servitor reside?
  console.log(`  ${c.dim}A servitor should be bound to a vessel — a physical or digital object.${c.reset}`)
  const housing = await ask(`  ${c.boldWhite}Housing (stone, drawing, sigil card, digital file, etc.): ${c.reset}`)

  // Activation trigger
  const trigger = await ask(`  ${c.boldWhite}Activation trigger (word, gesture, symbol): ${c.reset}`)

  // Feeding
  const feedMethod = await ask(`  ${c.boldWhite}Feeding method (meditation, offering, attention): ${c.reset}`)
  console.log(`  ${c.dim}Feeding frequency:${c.reset}`)
  console.log(`    ${c.yellow}1.${c.reset} Daily  ${c.yellow}2.${c.reset} Weekly  ${c.yellow}3.${c.reset} Monthly`)
  const freqChoice = await ask(`  ${c.boldWhite}Frequency (1-3): ${c.reset}`)
  const frequency = freqChoice.trim() === '1' ? 'daily' as const : freqChoice.trim() === '3' ? 'monthly' as const : 'weekly' as const
  const feedingSchedule: FeedingSchedule = { frequency, lastFed: null }

  // Dissolution
  const dissCondition = await ask(`  ${c.boldWhite}Dissolution condition (when should it end?): ${c.reset}`)
  const dissMethod = await ask(`  ${c.boldWhite}Dissolution method (burning, water, forgetting): ${c.reset}`)

  // Generate sigil from purpose
  console.log('')
  console.log(`  ${c.dim}Generating sigil from purpose...${c.reset}`)
  await sleep(500)
  const sigil = createSigil(purpose, 'spare')

  // Summary
  console.log('')
  console.log(`  ${c.boldPurple}\u2500\u2500\u2500 SERVITOR SUMMARY \u2500\u2500\u2500${c.reset}`)
  console.log(`  ${c.boldWhite}Name:${c.reset} ${name}`)
  console.log(`  ${c.boldWhite}Purpose:${c.reset} ${purpose}`)
  console.log(`  ${c.boldWhite}Appearance:${c.reset} ${appearance || 'Unspecified'}`)
  console.log(`  ${c.boldWhite}Housing:${c.reset} ${housing || 'Unbound'}`)
  console.log(`  ${c.boldWhite}Trigger:${c.reset} ${trigger || 'Unspecified'}`)
  console.log(`  ${c.boldWhite}Feeding:${c.reset} ${feedMethod || 'Attention'} (${frequency})`)
  console.log(`  ${c.boldWhite}Dissolution:${c.reset} ${dissCondition || 'When task complete'}`)
  console.log('')

  const confirm = await ask(`  ${c.boldWhite}Create this servitor? (y/n): ${c.reset}`)
  if (confirm.trim().toLowerCase() !== 'y') {
    console.log(`  ${c.dim}Creation cancelled.${c.reset}`)
    return
  }

  const servitor = createServitor({
    name,
    purpose,
    sigil,
    appearance: appearance || 'Formless',
    housing: housing || 'Unbound — exists in the practitioner\'s mind',
    activationTrigger: trigger || name,
    feedingMethod: feedMethod || 'Attention and visualization',
    feedingSchedule,
    lifespan: null,
    dissolutionCondition: dissCondition || 'When purpose is fulfilled',
    dissolutionMethod: dissMethod || 'Reabsorption',
  })

  console.log('')
  console.log(`  ${c.boldGreen}\u2295 Servitor "${servitor.name}" has been created.${c.reset}`)
  console.log(`  ${c.dim}ID: ${servitor.id}${c.reset}`)
  console.log(`  ${c.boldYellow}IMPORTANT:${c.reset} ${c.dim}Perform the Servitor Creation Ceremony (Ritual Architect, option 1)${c.reset}`)
  console.log(`  ${c.dim}to fully activate this entity. Data entry alone does not birth a servitor.${c.reset}`)
}

async function feedServitorFlow(): Promise<void> {
  const servitors = loadServitors().filter(s => s.status === 'active')
  if (servitors.length === 0) {
    console.log(`  ${c.dim}No active servitors to feed.${c.reset}`)
    return
  }

  console.log('')
  console.log(`  ${c.boldWhite}Active servitors:${c.reset}`)
  servitors.forEach((s, i) => {
    console.log(`    ${c.yellow}${i + 1}.${c.reset} ${s.name} ${c.dim}\u2014 ${s.purpose}${c.reset}`)
  })

  const choice = await ask(`  ${c.boldWhite}Select servitor to feed: ${c.reset}`)
  const index = parseInt(choice.trim()) - 1
  const servitor = servitors[Math.max(0, Math.min(index, servitors.length - 1))]

  const notes = await ask(`  ${c.boldWhite}Feeding notes: ${c.reset}`)

  console.log('')
  console.log(`  ${c.dim}Feeding ${servitor.name}...${c.reset}`)
  await sleep(500)

  const updated = feedServitor(servitor.id, notes || 'Regular feeding')
  if (updated) {
    console.log(`  ${c.boldGreen}\u25CF ${updated.name} has been fed.${c.reset}`)
  }
}

async function dissolveServitorFlow(): Promise<void> {
  const servitors = loadServitors().filter(s => s.status !== 'dissolved')
  if (servitors.length === 0) {
    console.log(`  ${c.dim}No servitors to dissolve.${c.reset}`)
    return
  }

  console.log('')
  console.log(`  ${c.boldRed}WARNING: Dissolution is permanent.${c.reset}`)
  console.log('')
  servitors.forEach((s, i) => {
    console.log(`    ${c.yellow}${i + 1}.${c.reset} ${s.name} ${c.dim}[${s.status}]${c.reset}`)
  })

  const choice = await ask(`  ${c.boldWhite}Select servitor to dissolve: ${c.reset}`)
  const index = parseInt(choice.trim()) - 1
  const servitor = servitors[Math.max(0, Math.min(index, servitors.length - 1))]

  const confirm = await ask(`  ${c.boldRed}Dissolve ${servitor.name}? Type its name to confirm: ${c.reset}`)
  if (confirm.trim().toLowerCase() !== servitor.name.toLowerCase()) {
    console.log(`  ${c.dim}Dissolution cancelled.${c.reset}`)
    return
  }

  const reason = await ask(`  ${c.boldWhite}Reason for dissolution: ${c.reset}`)
  dissolveServitor(servitor.id, reason || 'Purpose fulfilled')

  console.log('')
  console.log(`  ${c.dim}${servitor.name} dissolves back into the void...${c.reset}`)
  await sleep(800)
  console.log(`  ${c.gray}\u2591\u2592\u2593\u2588\u2593\u2592\u2591 ${c.reset}`)
  console.log(`  ${c.dim}It is done.${c.reset}`)
}

export async function runServitorLab(): Promise<void> {
  printHeader()

  // Check for overdue feedings
  const allServitors = loadServitors()
  const overdue = getOverdueServitors(allServitors)
  if (overdue.length > 0) {
    console.log(`  ${c.boldRed}\u26A0 ${overdue.length} servitor(s) need feeding:${c.reset}`)
    for (const s of overdue) {
      console.log(`    ${c.red}\u2022 ${s.name}${c.reset}`)
    }
    console.log('')
  }

  console.log(`  ${c.boldWhite}Choose an action:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} Create new servitor`)
  console.log(`    ${c.yellow}2.${c.reset} List servitors`)
  console.log(`    ${c.yellow}3.${c.reset} Feed a servitor`)
  console.log(`    ${c.yellow}4.${c.reset} Dissolve a servitor`)
  console.log('')

  const choice = await ask(`  ${c.boldCyan}\u2295 ${c.reset}${c.boldWhite}Action: ${c.reset}`)

  switch (choice.trim()) {
    case '1':
      await createServitorWizard()
      break
    case '2':
      console.log('')
      displayServitorList(allServitors)
      break
    case '3':
      await feedServitorFlow()
      break
    case '4':
      await dissolveServitorFlow()
      break
    default:
      console.log(`  ${c.dim}No action taken.${c.reset}`)
  }

  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}
