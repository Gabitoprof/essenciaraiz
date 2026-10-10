import type { JourneyProgressData, PracticeMoment, PracticeRecord } from '@/types/progress'
import { getSupabaseClient, isNetworkError } from '@/services/supabase/client'
import { ProgressError, type ProgressService } from './progressService'

interface ProgressRow {
  day: number
  moment: PracticeMoment
  state: PracticeRecord['state']
  started_at: string
  completed_at: string | null
  updated_at: string
}

function failure(action: 'ler' | 'salvar', error: unknown) {
  return new ProgressError(
    isNetworkError(error)
      ? 'Sem conexão com o servidor. Verifique sua internet e tente novamente.'
      : action === 'ler'
        ? 'Não foi possível carregar o seu progresso agora.'
        : 'Não foi possível salvar agora. Tente novamente.',
    { cause: error },
  )
}

/** Progresso na tabela `practice_progress`. O RLS garante que cada conta só lê e grava as próprias linhas. */
export function createSupabaseProgressService(): ProgressService {
  const client = getSupabaseClient()

  return {
    storage: 'supabase',

    async load(userId) {
      const { data, error } = await client
        .from('practice_progress')
        .select('day, moment, state, started_at, completed_at, updated_at')
        .eq('user_id', userId)
      if (error) throw failure('ler', error)

      const result: JourneyProgressData = { days: {} }
      for (const row of (data ?? []) as ProgressRow[]) {
        const record: PracticeRecord = { state: row.state, startedAt: row.started_at }
        if (row.completed_at) record.completedAt = row.completed_at
        result.days[row.day] = { ...result.days[row.day], [row.moment]: record }
        if (!result.lastActivity || row.updated_at > result.lastActivity.at) {
          result.lastActivity = { day: row.day, moment: row.moment, at: row.updated_at }
        }
      }
      return result
    },

    async save(userId, data, { day, moment }) {
      const record = data.days[day]?.[moment]
      if (!record) return
      const { error } = await client.from('practice_progress').upsert(
        {
          user_id: userId,
          day,
          moment,
          state: record.state,
          started_at: record.startedAt,
          completed_at: record.completedAt ?? null,
        },
        { onConflict: 'user_id,day,moment' },
      )
      if (error) throw failure('salvar', error)
    },
  }
}
