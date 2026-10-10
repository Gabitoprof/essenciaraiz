/** Os três momentos de cada dia da jornada. */
export type PracticeMoment = 'despertar' | 'presenca' | 'integrar'

/** Situação de uma prática: só muda quando a participante age (nunca ao abrir a página). */
export type PracticeState = 'disponivel' | 'iniciado' | 'concluido'

export interface PracticeRecord {
  state: Exclude<PracticeState, 'disponivel'>
  /** Datas em ISO 8601. */
  startedAt: string
  completedAt?: string
}

export type DayRecord = Partial<Record<PracticeMoment, PracticeRecord>>

/**
 * Tudo o que a participante registrou na jornada.
 * Formato pensado para virar linhas de uma tabela no Supabase (dia, momento, estado, datas).
 */
export interface JourneyProgressData {
  /** Chave: número do dia (1 a 21). */
  days: Record<number, DayRecord>
  /** Última prática em que a participante mexeu, para "continuar de onde parou". */
  lastActivity?: { day: number; moment: PracticeMoment; at: string }
}

/** Onde o progresso fica guardado. Hoje só existe a opção local. */
export type ProgressStorage = 'local'
