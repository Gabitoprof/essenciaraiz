import { appConfig } from '@/config/app'
import type { DayRecord, JourneyProgressData, PracticeMoment, PracticeRecord } from '@/types/progress'
import { localKeys } from '@/services/localKeys'
import { ProgressError, type ProgressService } from './progressService'

const MOMENTS: PracticeMoment[] = ['despertar', 'presenca', 'integrar']

function emptyProgress(): JourneyProgressData {
  return { days: {} }
}

function isRecord(value: unknown): value is PracticeRecord {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return (
    (record.state === 'iniciado' || record.state === 'concluido') &&
    typeof record.startedAt === 'string' &&
    (record.completedAt === undefined || typeof record.completedAt === 'string')
  )
}

/** Aceita só o formato esperado; qualquer coisa estranha no localStorage é descartada. */
function sanitize(raw: unknown): JourneyProgressData {
  if (!raw || typeof raw !== 'object') return emptyProgress()
  const source = raw as { days?: unknown; lastActivity?: unknown }
  const days: Record<number, DayRecord> = {}

  if (source.days && typeof source.days === 'object') {
    for (const [key, value] of Object.entries(source.days as Record<string, unknown>)) {
      const day = Number(key)
      if (!Number.isInteger(day) || day < 1 || day > appConfig.journeyLength || !value || typeof value !== 'object') continue
      const record: DayRecord = {}
      for (const moment of MOMENTS) {
        const item = (value as Record<string, unknown>)[moment]
        if (isRecord(item)) record[moment] = item
      }
      if (Object.keys(record).length > 0) days[day] = record
    }
  }

  const last = source.lastActivity as JourneyProgressData['lastActivity'] | undefined
  const lastActivity =
    last && Number.isInteger(last.day) && MOMENTS.includes(last.moment) && typeof last.at === 'string' ? last : undefined

  return { days, lastActivity }
}

/** Guarda o progresso no localStorage deste navegador, separado por conta. */
export const localProgressService: ProgressService = {
  storage: 'local',

  async load(userId) {
    try {
      const stored = localStorage.getItem(localKeys.progress(userId))
      return stored ? sanitize(JSON.parse(stored)) : emptyProgress()
    } catch {
      throw new ProgressError('Não foi possível ler o progresso salvo neste navegador.')
    }
  },

  async save(userId, data) {
    try {
      localStorage.setItem(localKeys.progress(userId), JSON.stringify(data))
    } catch {
      throw new ProgressError('Não foi possível salvar o progresso neste navegador.')
    }
  },
}
