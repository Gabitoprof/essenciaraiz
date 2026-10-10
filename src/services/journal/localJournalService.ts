import { appConfig } from '@/config/app'
import type { JournalEntry } from '@/types/journal'
import { localKeys } from '@/services/localKeys'
import { cleanDraft, JournalError, type JournalService } from './journalService'


function isEntry(value: unknown): value is JournalEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.id === 'string' &&
    typeof entry.body === 'string' &&
    typeof entry.createdAt === 'string' &&
    typeof entry.updatedAt === 'string' &&
    (entry.title === undefined || typeof entry.title === 'string') &&
    (entry.prompt === undefined || typeof entry.prompt === 'string') &&
    (entry.day === undefined || (Number.isInteger(entry.day) && (entry.day as number) >= 1 && (entry.day as number) <= appConfig.journeyLength))
  )
}

function read(userId: string): JournalEntry[] {
  let raw: string | null
  try {
    raw = localStorage.getItem(localKeys.journal(userId))
  } catch {
    throw new JournalError('Não foi possível abrir o diário neste navegador.')
  }
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isEntry) : []
  } catch {
    throw new JournalError('Os registros salvos neste navegador não puderam ser lidos.')
  }
}

function write(userId: string, entries: JournalEntry[]) {
  try {
    localStorage.setItem(localKeys.journal(userId), JSON.stringify(entries))
  } catch {
    throw new JournalError('Não foi possível salvar. O armazenamento do navegador pode estar cheio ou bloqueado.')
  }
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

/** Guarda o diário no localStorage deste navegador, separado por conta. Nada sai do aparelho. */
export const localJournalService: JournalService = {
  storage: 'local',

  async list(userId) {
    return read(userId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },

  async create(userId, draft) {
    const data = cleanDraft(draft)
    if (!data.body) throw new JournalError('Escreva algo antes de salvar.')
    const now = new Date().toISOString()
    const entry: JournalEntry = { id: newId(), ...data, createdAt: now, updatedAt: now }
    write(userId, [entry, ...read(userId)])
    return entry
  },

  async update(userId, id, draft) {
    const data = cleanDraft(draft)
    if (!data.body) throw new JournalError('Escreva algo antes de salvar.')
    const entries = read(userId)
    const current = entries.find((entry) => entry.id === id)
    if (!current) throw new JournalError('Este registro não foi encontrado. Ele pode ter sido excluído.')
    const updated: JournalEntry = { ...current, ...data, updatedAt: new Date().toISOString() }
    write(userId, entries.map((entry) => (entry.id === id ? updated : entry)))
    return updated
  },

  async remove(userId, id) {
    write(userId, read(userId).filter((entry) => entry.id !== id))
  },
}
