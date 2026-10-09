export type ContentKind = 'audio' | 'texto' | 'exercicio'

export interface JourneyContent {
  id: string
  kind: ContentKind
  title: string
  description?: string
  /** Duração aproximada em minutos. */
  durationMinutes?: number
}

/** Situação de um dia para a participante. */
export type DayStatus = 'concluido' | 'hoje' | 'disponivel' | 'bloqueado'

export interface JourneyDay {
  day: number
  title: string
  theme: string
  summary: string
  reflectionPrompt: string
  contents: JourneyContent[]
}

export interface JourneyWeek {
  week: number
  title: string
  description: string
  days: number[]
}
