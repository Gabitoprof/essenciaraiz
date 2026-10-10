import type { PracticeMoment } from '@/types/progress'

/** Pergunta fixa do Despertar, igual em todos os dias. */
export const MORNING_QUESTION = 'Como desejo estar presente hoje?'

/** Durações de referência quando o dia ainda não tem as suas. */
export const DEFAULT_DURATIONS: Record<PracticeMoment, string> = {
  despertar: '8 a 12 min',
  presenca: '1 a 5 min',
  integrar: '15 a 20 min',
}
