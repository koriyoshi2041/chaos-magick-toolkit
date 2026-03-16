// Black Book (Magickal Diary) — Interactive CLI flow
// "Record the Work"

import { c, ask } from './main.js'
import { createEntry, listEntries, searchEntries, getStatistics, loadEntries } from '../core/diary.js'
import { getMoonPhase } from '../core/moon.js'
import type { MagicEquation } from '../types.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u2593 BLACK BOOK${c.reset} ${c.dim}\u2014 Record the Work${c.reset}`)
  console.log('')
}

function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
}

async function newEntryFlow(): Promise<void> {
  console.log('')
  const moon = getMoonPhase()
  console.log(`  ${c.dim}Date: ${formatDate(new Date())} | Moon: ${moon.emoji} ${moon.name}${c.reset}`)
  console.log('')

  const bodyState = await ask(`  ${c.boldWhite}Body state (physical condition): ${c.reset}`)
  const mentalState = await ask(`  ${c.boldWhite}Mental state (mood, focus): ${c.reset}`)
  const technique = await ask(`  ${c.boldWhite}Technique used: ${c.reset}`)
  const intent = await ask(`  ${c.boldWhite}Intent / purpose: ${c.reset}`)
  const symbols = await ask(`  ${c.boldWhite}Symbols encountered: ${c.reset}`)
  const result = await ask(`  ${c.boldWhite}Result / outcome: ${c.reset}`)
  const dreams = await ask(`  ${c.boldWhite}Dreams (if any): ${c.reset}`)
  const notes = await ask(`  ${c.boldWhite}Additional notes: ${c.reset}`)
  const tagsInput = await ask(`  ${c.boldWhite}Tags (comma-separated): ${c.reset}`)
  const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0)

  // Optional Magic Equation (Carroll's M = G*L*(1-A)*(1-R))
  let magicEquation: MagicEquation | undefined
  const doEquation = await ask(`  ${c.boldWhite}Calculate Magic Equation? (y/n): ${c.reset}`)
  if (doEquation.trim().toLowerCase() === 'y') {
    console.log('')
    console.log(`  ${c.dim}Rate each factor 0-10:${c.reset}`)
    const gInput = await ask(`  ${c.boldWhite}Gnosis depth (0-10): ${c.reset}`)
    const lInput = await ask(`  ${c.boldWhite}Symbolic link strength (0-10): ${c.reset}`)
    const aInput = await ask(`  ${c.boldWhite}Conscious awareness of intent (0=forgot, 10=fixated): ${c.reset}`)
    const rInput = await ask(`  ${c.boldWhite}Psychic resistance (0=none, 10=total): ${c.reset}`)

    const gnosis = Math.max(0, Math.min(10, parseInt(gInput) || 0))
    const link = Math.max(0, Math.min(10, parseInt(lInput) || 0))
    const awareness = Math.max(0, Math.min(10, parseInt(aInput) || 0))
    const resistance = Math.max(0, Math.min(10, parseInt(rInput) || 0))
    const magicForce = (gnosis / 10) * (link / 10) * (1 - awareness / 10) * (1 - resistance / 10)

    magicEquation = { gnosis, link, awareness, resistance, magicForce }
    console.log(`  ${c.boldPurple}M = ${magicForce.toFixed(3)}${c.reset}`)
  }

  const entry = createEntry({
    bodyState: bodyState || '',
    mentalState: mentalState || '',
    technique: technique || '',
    symbols: symbols || '',
    intent: intent || '',
    result: result || '',
    dreams: dreams || '',
    notes: notes || '',
    tags,
    magicEquation,
  })

  console.log('')
  console.log(`  ${c.boldGreen}\u2593 Entry recorded.${c.reset}`)
  console.log(`  ${c.dim}ID: ${entry.id} | Moon: ${moon.name}${c.reset}`)
}

function browseEntries(): void {
  const entries = listEntries()
  if (entries.length === 0) {
    console.log(`  ${c.dim}No diary entries yet. Begin your practice.${c.reset}`)
    return
  }

  console.log('')
  console.log(`  ${c.boldWhite}Recent entries (${entries.length} total):${c.reset}`)
  console.log('')

  // Show last 10 entries
  const recent = entries.slice(-10).reverse()
  for (const entry of recent) {
    const date = formatDate(entry.date)
    const moon = entry.moonPhase.replace('_', ' ')
    const tagStr = entry.tags.length > 0 ? ` ${c.cyan}[${entry.tags.join(', ')}]${c.reset}` : ''
    console.log(`  ${c.yellow}${date}${c.reset} ${c.dim}(${moon})${c.reset}${tagStr}`)
    if (entry.technique) {
      console.log(`    ${c.dim}Technique: ${entry.technique}${c.reset}`)
    }
    if (entry.intent) {
      console.log(`    ${c.dim}Intent: ${entry.intent}${c.reset}`)
    }
    if (entry.result) {
      console.log(`    ${c.dim}Result: ${entry.result}${c.reset}`)
    }
    console.log('')
  }
}

function showStatistics(): void {
  const entries = loadEntries()
  if (entries.length === 0) {
    console.log(`  ${c.dim}No entries to analyze.${c.reset}`)
    return
  }

  const stats = getStatistics(entries)

  console.log('')
  console.log(`  ${c.boldPurple}\u2593 PRACTICE STATISTICS${c.reset}`)
  console.log('')
  console.log(`  ${c.boldWhite}Total entries:${c.reset} ${stats.totalEntries}`)
  console.log(`  ${c.boldWhite}Current streak:${c.reset} ${stats.currentStreak} days`)
  console.log(`  ${c.boldWhite}Longest streak:${c.reset} ${stats.longestStreak} days`)
  console.log('')

  if (stats.uniqueTechniques.length > 0) {
    console.log(`  ${c.boldWhite}Techniques used:${c.reset}`)
    const sorted = Object.entries(stats.techniqueCounts).sort((a, b) => b[1] - a[1])
    for (const [tech, count] of sorted) {
      const bar = '\u2593'.repeat(Math.min(count, 20))
      console.log(`    ${c.yellow}${tech}${c.reset} ${c.dim}(${count})${c.reset} ${c.purple}${bar}${c.reset}`)
    }
    console.log('')
  }

  if (Object.keys(stats.moonPhaseCounts).length > 0) {
    console.log(`  ${c.boldWhite}Moon phases:${c.reset}`)
    for (const [phase, count] of Object.entries(stats.moonPhaseCounts)) {
      console.log(`    ${c.dim}${phase.replace('_', ' ')}: ${count}${c.reset}`)
    }
    console.log('')
  }

  if (Object.keys(stats.tagCounts).length > 0) {
    console.log(`  ${c.boldWhite}Top tags:${c.reset}`)
    const sortedTags = Object.entries(stats.tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10)
    for (const [tag, count] of sortedTags) {
      console.log(`    ${c.cyan}#${tag}${c.reset} ${c.dim}(${count})${c.reset}`)
    }
  }
}

async function searchFlow(): Promise<void> {
  const query = await ask(`  ${c.boldWhite}Search query: ${c.reset}`)
  if (!query.trim()) return

  const results = searchEntries(query)
  if (results.length === 0) {
    console.log(`  ${c.dim}No entries match "${query}".${c.reset}`)
    return
  }

  console.log('')
  console.log(`  ${c.boldWhite}Found ${results.length} entries:${c.reset}`)
  console.log('')
  for (const entry of results.slice(0, 10)) {
    const date = formatDate(entry.date)
    console.log(`  ${c.yellow}${date}${c.reset} ${c.dim}\u2014 ${entry.technique || 'no technique'} \u2014 ${entry.intent || 'no intent'}${c.reset}`)
  }
}

export async function runBlackBook(): Promise<void> {
  printHeader()

  console.log(`  ${c.boldWhite}Choose an action:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} New entry`)
  console.log(`    ${c.yellow}2.${c.reset} Browse entries`)
  console.log(`    ${c.yellow}3.${c.reset} Statistics`)
  console.log(`    ${c.yellow}4.${c.reset} Search`)
  console.log('')

  const choice = await ask(`  ${c.boldCyan}\u2593 ${c.reset}${c.boldWhite}Action: ${c.reset}`)

  switch (choice.trim()) {
    case '1':
      await newEntryFlow()
      break
    case '2':
      browseEntries()
      break
    case '3':
      showStatistics()
      break
    case '4':
      await searchFlow()
      break
    default:
      console.log(`  ${c.dim}No action taken.${c.reset}`)
  }

  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}
