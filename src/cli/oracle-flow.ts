// Chaos Oracle — Interactive CLI flow
// "The void answers"

import { c, ask, sleep } from './main.js'
import {
  chaosStarReading,
  eightColorsReading,
  binaryOracleReading,
  bibliomancyReading,
} from '../core/oracle.js'
import { EIGHT_COLORS } from '../data/colors.js'
import type { OracleResult } from '../types.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u2726 CHAOS ORACLE${c.reset} ${c.dim}\u2014 The void answers${c.reset}`)
  console.log('')
}

/** Dramatic spinning animation for oracle */
async function oracleAnimation(method: string): Promise<void> {
  const frames = method === 'chaos_star'
    ? ['\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199', '\u2190', '\u2196']
    : ['\u2591', '\u2592', '\u2593', '\u2588', '\u2593', '\u2592', '\u2591', ' ']

  console.log('')
  for (let round = 0; round < 3; round++) {
    for (const frame of frames) {
      process.stdout.write(`\r  ${c.boldPurple}  ${frame} ${c.dim}Consulting the void...${c.reset}    `)
      await sleep(80)
    }
  }
  console.log('')
}

/** Display oracle result with colored formatting */
function displayResult(result: OracleResult): void {
  console.log('')
  console.log(`  ${c.boldPurple}\u2726 READING${c.reset}`)
  console.log('')
  console.log(`  ${c.boldWhite}${result.reading}${c.reset}`)
  console.log('')
  for (const line of result.details) {
    if (line === '') {
      console.log('')
    } else if (line.startsWith('Oracle:') || line.startsWith('Reading:') || line.startsWith('Action:')) {
      console.log(`  ${c.boldCyan}${line}${c.reset}`)
    } else if (line.startsWith('Primary:') || line.startsWith('Secondary:') || line.startsWith('Color:')) {
      console.log(`  ${c.yellow}${line}${c.reset}`)
    } else {
      console.log(`  ${c.dim}${line}${c.reset}`)
    }
  }
  console.log('')
}

export async function runChaosOracle(): Promise<void> {
  printHeader()

  // Ask the question
  console.log(`  ${c.dim}Formulate your question clearly in your mind.${c.reset}`)
  console.log(`  ${c.dim}The oracle responds to clarity of intent.${c.reset}`)
  console.log('')
  const question = await ask(`  ${c.boldCyan}\u2726 ${c.reset}${c.boldWhite}Your question: ${c.reset}`)
  if (!question.trim()) {
    console.log(`  ${c.red}No question posed. The void remains silent.${c.reset}`)
    return
  }

  // Choose method
  console.log('')
  console.log(`  ${c.boldWhite}Choose a divination method:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} Chaos Star       ${c.dim}\u2014 Eight-pointed star, one direction${c.reset}`)
  console.log(`    ${c.yellow}2.${c.reset} Eight Colors      ${c.dim}\u2014 Two colors: situation + action${c.reset}`)
  console.log(`    ${c.yellow}3.${c.reset} Binary Oracle     ${c.dim}\u2014 Random byte pattern interpretation${c.reset}`)
  console.log(`    ${c.yellow}4.${c.reset} Bibliomancy       ${c.dim}\u2014 Random passage from Chaos texts${c.reset}`)
  console.log('')

  const methodChoice = await ask(`  ${c.boldCyan}\u2726 ${c.reset}${c.boldWhite}Method (1-4): ${c.reset}`)

  let result: OracleResult

  switch (methodChoice.trim()) {
    case '2':
      await oracleAnimation('eight_colors')
      result = eightColorsReading(question)
      break
    case '3':
      await oracleAnimation('binary')
      result = binaryOracleReading(question)
      break
    case '4':
      await oracleAnimation('bibliomancy')
      result = bibliomancyReading(question)
      break
    default:
      await oracleAnimation('chaos_star')
      result = chaosStarReading(question)
      break
  }

  displayResult(result)
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}
