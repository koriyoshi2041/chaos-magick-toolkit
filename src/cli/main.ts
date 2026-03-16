#!/usr/bin/env node
// Chaos Magick Practice Toolkit — CLI Entry Point

import * as readline from 'node:readline'
import { runSigilForge } from './sigil-flow.js'
import { runGnosisEngine } from './gnosis-flow.js'
import { runServitorLab } from './servitor-flow.js'
import { runChaosOracle } from './oracle-flow.js'
import { runRitualArchitect } from './ritual-flow.js'
import { runBlackBook } from './diary-flow.js'
import { CHAOS_QUOTES } from '../data/quotes.js'
import { randomInt } from 'node:crypto'

// ===== ANSI Colors =====

export const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  purple: '\x1b[35m',
  boldPurple: '\x1b[1;35m',
  red: '\x1b[31m',
  boldRed: '\x1b[1;31m',
  cyan: '\x1b[36m',
  boldCyan: '\x1b[1;36m',
  white: '\x1b[37m',
  boldWhite: '\x1b[1;37m',
  gray: '\x1b[90m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  boldYellow: '\x1b[1;33m',
  boldGreen: '\x1b[1;32m',
  boldBlue: '\x1b[1;34m',
}

// ===== Shared Utilities =====

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export function ask(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      rl.question(question, resolve)
    } catch {
      reject(new Error('Input stream closed'))
    }
  })
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ===== Chaosphere Banner =====

function printBanner(): void {
  console.log('')
  console.log(`${c.boldPurple}            ${c.dim}\\       |       /${c.reset}`)
  console.log(`${c.boldPurple}             ${c.dim}\\      |      /${c.reset}`)
  console.log(`${c.boldPurple}              ${c.dim}\\     |     /${c.reset}`)
  console.log(`${c.boldPurple}        ${c.dim}-------${c.reset}  ${c.boldPurple}\u25C9${c.reset}  ${c.dim}-------${c.reset}`)
  console.log(`${c.boldPurple}              ${c.dim}/     |     \\${c.reset}`)
  console.log(`${c.boldPurple}             ${c.dim}/      |      \\${c.reset}`)
  console.log(`${c.boldPurple}            ${c.dim}/       |       \\${c.reset}`)
  console.log('')
  console.log(`${c.boldPurple}        C H A O S   M A G I C K${c.reset}`)
  console.log('')
  const quoteIndex = randomInt(CHAOS_QUOTES.length)
  console.log(`${c.dim}   ${CHAOS_QUOTES[quoteIndex]}${c.reset}`)
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}

// ===== Main Menu =====

function showMainMenu(): void {
  console.log('')
  console.log(`${c.boldWhite}    Select a module:${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u26E7${c.reset}  ${c.yellow}1.${c.reset} Sigil Forge        ${c.dim}\u2014 Desire \u2192 Symbol${c.reset}`)
  console.log(`    ${c.boldPurple}\u25C9${c.reset}  ${c.yellow}2.${c.reset} Gnosis Engine      ${c.dim}\u2014 Silence the mind${c.reset}`)
  console.log(`    ${c.boldPurple}\u2295${c.reset}  ${c.yellow}3.${c.reset} Servitor Lab       ${c.dim}\u2014 Thought \u2192 Entity${c.reset}`)
  console.log(`    ${c.boldPurple}\u2726${c.reset}  ${c.yellow}4.${c.reset} Chaos Oracle       ${c.dim}\u2014 The void answers${c.reset}`)
  console.log(`    ${c.boldPurple}\u235F${c.reset}  ${c.yellow}5.${c.reset} Ritual Architect   ${c.dim}\u2014 Structure the formless${c.reset}`)
  console.log(`    ${c.boldPurple}\u2593${c.reset}  ${c.yellow}6.${c.reset} Black Book         ${c.dim}\u2014 Record the Work${c.reset}`)
  console.log('')
  console.log(`    ${c.gray}0.${c.reset} ${c.dim}Exit${c.reset}`)
  console.log('')
}

// ===== Module Router =====

async function routeModule(choice: string): Promise<boolean> {
  switch (choice) {
    case '1':
    case 'sigil':
      await runSigilForge()
      return true
    case '2':
    case 'gnosis':
      await runGnosisEngine()
      return true
    case '3':
    case 'servitor':
      await runServitorLab()
      return true
    case '4':
    case 'oracle':
      await runChaosOracle()
      return true
    case '5':
    case 'ritual':
      await runRitualArchitect()
      return true
    case '6':
    case 'diary':
      await runBlackBook()
      return true
    case '0':
    case 'exit':
    case 'quit':
      return false
    default:
      console.log(`  ${c.red}Unknown option. Try again.${c.reset}`)
      return true
  }
}

// ===== Entry Point =====

async function main(): Promise<void> {
  printBanner()

  const arg = process.argv[2]

  if (arg) {
    await routeModule(arg)
    rl.close()
    return
  }

  // Interactive menu loop
  let running = true
  while (running) {
    showMainMenu()
    const choice = await ask(`  ${c.boldCyan}\u2726 ${c.reset}${c.boldWhite}Choose: ${c.reset}`)
    running = await routeModule(choice.trim().toLowerCase())
  }

  console.log('')
  console.log(`  ${c.dim}The void reclaims its silence.${c.reset}`)
  console.log('')
  rl.close()
}

main().catch((err) => {
  console.error(`${c.boldRed}Fatal error:${c.reset}`, err)
  process.exit(1)
})
