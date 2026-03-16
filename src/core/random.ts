// Quantum-grade random number utilities
// Uses Node.js crypto (CSPRNG) backed by OS entropy pool

import { randomInt as cryptoRandomInt, randomBytes } from 'node:crypto'

/** Generate a random integer in [min, max] inclusive */
export function randomInt(min: number, max: number): number {
  return cryptoRandomInt(min, max + 1)
}

/** Generate a random float in [0, 1) */
export function randomFloat(): number {
  const bytes = randomBytes(4)
  return bytes.readUInt32BE(0) / 0x100000000
}

/** Pick a random element from an array */
export function randomPick<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from empty array')
  }
  return items[randomInt(0, items.length - 1)]
}

/** Shuffle an array using Fisher-Yates (returns new array) */
export function shuffle<T>(items: readonly T[]): readonly T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

/** Generate N random bits as a boolean array */
export function randomBits(n: number): readonly boolean[] {
  return Array.from({ length: n }, () => randomInt(0, 1) === 1)
}

/** Generate a random byte (0-255) */
export function randomByte(): number {
  return randomBytes(1)[0]
}
