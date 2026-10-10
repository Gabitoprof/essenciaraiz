import { appConfig } from '@/config/app'
import type { DayStatus } from '@/types/journey'
import type { JourneyProgressData, PracticeMoment, PracticeState } from '@/types/progress'

/**
 * Regras da jornada, sem React: tudo é calculado a partir do que a participante registrou.
 * - O dia 1 está sempre liberado.
 * - Um dia é liberado quando a prática noturna (Integrar) do dia anterior é concluída.
 * - Um dia conta como concluído quando os três momentos foram concluídos.
 */
export const MOMENT_ORDER: PracticeMoment[] = ['despertar', 'presenca', 'integrar']

export function getPracticeState(data: JourneyProgressData, day: number, moment: PracticeMoment): PracticeState {
  return data.days[day]?.[moment]?.state ?? 'disponivel'
}

export function isDayComplete(data: JourneyProgressData, day: number): boolean {
  return MOMENT_ORDER.every((moment) => getPracticeState(data, day, moment) === 'concluido')
}

export function isDayUnlocked(data: JourneyProgressData, day: number): boolean {
  if (day < 1 || day > appConfig.journeyLength) return false
  return day === 1 || getPracticeState(data, day - 1, 'integrar') === 'concluido'
}

/** Dia atual: o último dia liberado. */
export function getCurrentDay(data: JourneyProgressData): number {
  let day = 1
  while (day < appConfig.journeyLength && isDayUnlocked(data, day + 1)) day += 1
  return day
}

export function getDayStatus(data: JourneyProgressData, day: number): DayStatus {
  if (isDayComplete(data, day)) return 'concluido'
  if (day === getCurrentDay(data)) return 'hoje'
  return isDayUnlocked(data, day) ? 'disponivel' : 'bloqueado'
}

export function getCompletedDays(data: JourneyProgressData): number[] {
  return Array.from({ length: appConfig.journeyLength }, (_, index) => index + 1).filter((day) => isDayComplete(data, day))
}

export function countCompletedPractices(data: JourneyProgressData): number {
  return Object.values(data.days).reduce(
    (total, record) => total + MOMENT_ORDER.filter((moment) => record[moment]?.state === 'concluido').length,
    0,
  )
}

export function hasAnyActivity(data: JourneyProgressData): boolean {
  return Object.keys(data.days).length > 0
}

export interface ResumeTarget {
  day: number
  /** Ausente quando todos os momentos do dia já foram concluídos. */
  moment?: PracticeMoment
  /** Verdadeiro quando é uma prática que a participante começou e não terminou. */
  inProgress: boolean
}

/**
 * Para onde "Continuar minha jornada" leva:
 * a prática iniciada mais recentemente; se não houver, o próximo momento não concluído do dia atual.
 */
export function getResumeTarget(data: JourneyProgressData): ResumeTarget {
  let latest: { day: number; moment: PracticeMoment; startedAt: string } | undefined
  for (const [key, record] of Object.entries(data.days)) {
    const day = Number(key)
    if (!isDayUnlocked(data, day)) continue
    for (const moment of MOMENT_ORDER) {
      const item = record[moment]
      if (item?.state === 'iniciado' && (!latest || item.startedAt > latest.startedAt)) {
        latest = { day, moment, startedAt: item.startedAt }
      }
    }
  }
  if (latest) return { day: latest.day, moment: latest.moment, inProgress: true }

  const day = getCurrentDay(data)
  const moment = MOMENT_ORDER.find((item) => getPracticeState(data, day, item) !== 'concluido')
  return { day, moment, inProgress: false }
}

/** Devolve uma cópia com a prática atualizada. Nunca rebaixa uma prática concluída para "iniciada". */
export function withPracticeState(
  data: JourneyProgressData,
  day: number,
  moment: PracticeMoment,
  state: 'iniciado' | 'concluido',
  now: string,
): JourneyProgressData {
  const current = data.days[day]?.[moment]
  if (current?.state === 'concluido') return data
  if (state === 'iniciado' && current) return data

  const record =
    state === 'concluido'
      ? { state, startedAt: current?.startedAt ?? now, completedAt: now }
      : { state, startedAt: now }

  return {
    days: { ...data.days, [day]: { ...data.days[day], [moment]: record } },
    lastActivity: { day, moment, at: now },
  }
}
