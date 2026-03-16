// File-based JSON storage for ~/.chaos-magick/

import * as fs from 'node:fs'
import * as path from 'node:path'
import { homedir } from 'node:os'

const STORAGE_DIR = path.join(homedir(), '.chaos-magick')

/** Ensure the storage directory exists */
export function ensureStorageDir(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true })
  }
}

/** Read a JSON store file, returning defaultValue if it doesn't exist */
export function readStore<T>(filename: string, defaultValue: T): T {
  ensureStorageDir()
  const filePath = path.join(STORAGE_DIR, filename)
  if (!fs.existsSync(filePath)) {
    return defaultValue
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

/** Write data to a JSON store file (complete overwrite) */
export function writeStore<T>(filename: string, data: T): void {
  ensureStorageDir()
  const filePath = path.join(STORAGE_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/** Get the full path to a storage file */
export function getStoragePath(filename: string): string {
  return path.join(STORAGE_DIR, filename)
}
