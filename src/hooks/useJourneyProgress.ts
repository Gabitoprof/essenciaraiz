import type { DayStatus } from '@/types/journey'

/**
 * Progresso da participante na jornada.
 * Provisório: ainda não há registro de dias concluídos (virá do Supabase).
 * Por enquanto a participante está sempre no dia 1.
 */
export function useJourneyProgress() {
  const completedDays: number[] = []
  const currentDay = 1

  function getDayStatus(day: number): DayStatus {
    if (completedDays.includes(day)) return 'concluido'
    if (day === currentDay) return 'hoje'
    return day < currentDay ? 'disponivel' : 'bloqueado'
  }

  return { completedDays, currentDay, getDayStatus }
}
