// Sigil Forge — Interactive CLI flow for sigil creation
// "Desire becomes Symbol"

import { c, ask, sleep } from './main.js'
import { processIntent, createSigil, generateDestructionFrames } from '../core/sigil.js'
import type { SigilMethod } from '../types.js'
import { SPARE_ON_SIGILS } from '../data/quotes.js'

function printHeader(): void {
  console.log('')
  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
  console.log('')
  console.log(`    ${c.boldPurple}\u26E7 SIGIL FORGE${c.reset} ${c.dim}\u2014 Desire becomes Symbol${c.reset}`)
  console.log('')
}

/** Display Spare's guidance step by step */
async function showSpareGuidance(): Promise<void> {
  console.log(`  ${c.dim}Austin Osman Spare's method:${c.reset}`)
  for (const step of SPARE_ON_SIGILS) {
    await sleep(300)
    console.log(`  ${c.gray}\u2022${c.reset} ${c.dim}${step}${c.reset}`)
  }
  console.log('')
}

/** Show the letter reduction process with dramatic pacing */
async function showLetterReduction(intent: string): Promise<{
  readonly consonants: readonly string[]
  readonly uniqueLetters: readonly string[]
}> {
  const processed = processIntent(intent)

  console.log('')
  console.log(`  ${c.boldWhite}Statement of Intent:${c.reset}`)
  console.log(`  ${c.boldCyan}"${intent.toUpperCase()}"${c.reset}`)
  await sleep(500)

  console.log('')
  console.log(`  ${c.dim}Removing vowels (A, E, I, O, U)...${c.reset}`)
  await sleep(400)
  console.log(`  ${c.yellow}Consonants: ${processed.consonants.join(' ')}${c.reset}`)
  await sleep(400)

  console.log('')
  console.log(`  ${c.dim}Removing duplicates...${c.reset}`)
  await sleep(400)
  console.log(`  ${c.boldYellow}Unique letters: ${processed.uniqueLetters.join(' ')}${c.reset}`)
  console.log(`  ${c.dim}(${processed.uniqueLetters.length} symbols to forge the sigil)${c.reset}`)
  await sleep(300)

  return { consonants: processed.consonants, uniqueLetters: processed.uniqueLetters }
}

/** Let the user choose a sigil method */
async function chooseSigilMethod(): Promise<SigilMethod> {
  console.log('')
  console.log(`  ${c.boldWhite}Choose a sigil method:${c.reset}`)
  console.log('')
  console.log(`    ${c.yellow}1.${c.reset} Spare's Classic    ${c.dim}\u2014 Letter strokes overlaid into a glyph${c.reset}`)
  console.log(`    ${c.yellow}2.${c.reset} Witch Circle       ${c.dim}\u2014 Letters connected around a circle${c.reset}`)
  console.log(`    ${c.yellow}3.${c.reset} Magic Square       ${c.dim}\u2014 Path traced through Saturn's Kamea${c.reset}`)
  console.log('')

  const choice = await ask(`  ${c.boldCyan}\u2726 ${c.reset}${c.boldWhite}Method (1-3): ${c.reset}`)

  switch (choice.trim()) {
    case '2': return 'witch_circle'
    case '3': return 'magic_square'
    default: return 'spare'
  }
}

/** Display the generated sigil with framing */
function displaySigil(visual: readonly string[], method: SigilMethod): void {
  const methodNames: Record<SigilMethod, string> = {
    spare: "Spare's Classic",
    witch_circle: 'Witch Circle',
    magic_square: 'Magic Square (Kamea of Saturn)',
  }

  console.log('')
  console.log(`  ${c.boldPurple}\u2736 Sigil Generated \u2014 ${methodNames[method]}${c.reset}`)
  console.log('')
  console.log(`${c.purple}${'  \u2500'.repeat(18)}${c.reset}`)
  for (const line of visual) {
    console.log(`  ${c.boldWhite}${line}${c.reset}`)
  }
  console.log(`${c.purple}${'  \u2500'.repeat(18)}${c.reset}`)
  console.log('')
}

/** Charging guidance flow */
async function chargingFlow(): Promise<boolean> {
  console.log(`  ${c.boldCyan}Ready to charge the sigil?${c.reset}`)
  console.log(`  ${c.dim}Charging requires entering a state of gnosis \u2014${c.reset}`)
  console.log(`  ${c.dim}a shift in consciousness where the sigil can be${c.reset}`)
  console.log(`  ${c.dim}imprinted on the deep mind.${c.reset}`)
  console.log('')

  const choice = await ask(`  ${c.boldWhite}Charge now? (y/n): ${c.reset}`)
  if (choice.trim().toLowerCase() !== 'y') {
    console.log(`  ${c.dim}Sigil preserved. Charge it when you are ready.${c.reset}`)
    return false
  }

  console.log('')
  console.log(`  ${c.boldPurple}\u25C9 CHARGING SEQUENCE${c.reset}`)
  console.log('')

  console.log(`  ${c.cyan}Step 1:${c.reset} ${c.white}Focus on the sigil. Let it fill your vision.${c.reset}`)
  await sleep(2000)

  console.log(`  ${c.cyan}Step 2:${c.reset} ${c.white}Breathe deeply. In... hold... out...${c.reset}`)
  for (let i = 0; i < 3; i++) {
    await sleep(800)
    process.stdout.write(`  ${c.boldCyan}\u25B2 INHALE...${c.reset}`)
    await sleep(1500)
    process.stdout.write(` ${c.boldYellow}\u25CF HOLD...${c.reset}`)
    await sleep(1000)
    console.log(` ${c.boldPurple}\u25BC EXHALE${c.reset}`)
    await sleep(1200)
  }

  console.log('')
  console.log(`  ${c.cyan}Step 3:${c.reset} ${c.white}At the peak of focus \u2014 FIRE the sigil.${c.reset}`)
  await sleep(1000)
  console.log(`  ${c.boldRed}         \u2736 \u2736 \u2736  FIRED  \u2736 \u2736 \u2736${c.reset}`)
  await sleep(500)

  console.log('')
  console.log(`  ${c.cyan}Step 4:${c.reset} ${c.white}Laugh. Break the ritual state.${c.reset}`)
  await sleep(1000)

  return true
}

/** Forgetting / destruction flow */
async function forgettingFlow(visual: readonly string[]): Promise<void> {
  console.log('')
  console.log(`  ${c.boldPurple}\u2593 THE FORGETTING${c.reset}`)
  console.log(`  ${c.dim}The sigil must now be forgotten. Its power lies${c.reset}`)
  console.log(`  ${c.dim}in the subconscious, beyond conscious recall.${c.reset}`)
  console.log('')

  const choice = await ask(`  ${c.boldWhite}Destroy the sigil visually? (y/n): ${c.reset}`)
  if (choice.trim().toLowerCase() !== 'y') {
    console.log(`  ${c.dim}Remember: do not lust for results.${c.reset}`)
    return
  }

  console.log('')
  const frames = generateDestructionFrames(visual)
  for (const frame of frames) {
    // Clear previous frame (move cursor up)
    if (frame !== frames[0]) {
      process.stdout.write(`\x1b[${visual.length}A`)
    }
    for (const line of frame) {
      console.log(`  ${c.dim}${line}${c.reset}`)
    }
    await sleep(400)
  }

  console.log('')
  console.log(`  ${c.boldPurple}The sigil dissolves into the void.${c.reset}`)
  console.log(`  ${c.dim}It is done. Do not think of it again.${c.reset}`)
  console.log(`  ${c.dim}"Do not lust for results." \u2014 Spare${c.reset}`)
  console.log('')
}

// ===== Main Sigil Forge Flow =====

export async function runSigilForge(): Promise<void> {
  printHeader()
  await showSpareGuidance()

  // Get statement of intent
  console.log(`  ${c.dim}Frame your intent as a declaration of will:${c.reset}`)
  console.log(`  ${c.dim}  "IT IS MY WILL TO..."  or  "THIS MY WISH TO OBTAIN..."${c.reset}`)
  console.log(`  ${c.dim}Declaring shifts the mind from wanting to commanding.${c.reset}`)
  console.log('')
  const intent = await ask(`  ${c.boldCyan}\u2726 ${c.reset}${c.boldWhite}Statement of Intent: ${c.reset}`)
  if (!intent.trim()) {
    console.log(`  ${c.red}No intent provided. A sigil requires desire.${c.reset}`)
    return
  }

  // Ethics check
  console.log('')
  console.log(`  ${c.yellow}\u26A0 Ethical consideration:${c.reset}`)
  console.log(`  ${c.dim}Chaos Magick operates on the principle of personal sovereignty.${c.reset}`)
  console.log(`  ${c.dim}Ensure your intent respects the autonomy and consent of others.${c.reset}`)
  const ethicsConfirm = await ask(`  ${c.boldWhite}Proceed with this intent? (y/n): ${c.reset}`)
  if (ethicsConfirm.trim().toLowerCase() !== 'y') {
    console.log(`  ${c.dim}Reconsider and return when ready.${c.reset}`)
    return
  }

  // Show letter reduction
  const { uniqueLetters } = await showLetterReduction(intent)

  if (uniqueLetters.length === 0) {
    console.log(`  ${c.red}No consonants remain. Rephrase your intent.${c.reset}`)
    return
  }

  // Choose method
  const method = await chooseSigilMethod()

  // Generate sigil
  console.log('')
  console.log(`  ${c.dim}Forging sigil...${c.reset}`)
  await sleep(800)

  const sigil = createSigil(intent, method)
  displaySigil(sigil.visual, method)

  // Seed reframing — the sigil is now an autonomous symbol
  console.log(`  ${c.dim}The sigil is now a seed planted in the deep mind.${c.reset}`)
  console.log(`  ${c.dim}It is no longer your desire — it is a living symbol,${c.reset}`)
  console.log(`  ${c.dim}independent of its origin. Let it work in silence.${c.reset}`)
  console.log('')

  // Charging
  const charged = await chargingFlow()

  // Forgetting (only if charged)
  if (charged) {
    await forgettingFlow(sigil.visual)
  }

  console.log(`${c.gray}${'\u2500'.repeat(52)}${c.reset}`)
}
