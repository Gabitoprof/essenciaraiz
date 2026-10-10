import { createContext } from 'react'
import type { DayStatus } from '@/types/journey'
import type { JourneyProgressData, PracticeMoment, PracticeState, ProgressStorage } from '@/types/progress'
import type { ResumeTarget } from '@/utils/journeyProgress'

export interface JourneyProgressContextValue {
  status: 'loading' | 'ready' | 'error'
  /** Mensagem amigável quando a leitura ou a gravação falha. */
  error: string | null
  storage: ProgressStorage
  data: JourneyProgressData
  currentDay: number
  completedDays: number[]
  completedPractices: number
  hasActivity: boolean
  resumeTarget: ResumeTarget
  getDayStatus(day: number): DayStatus
  isDayUnlocked(day: number): boolean
  getPracticeState(day: number, moment: PracticeMoment): PracticeState
  startPractice(day: number, moment: PracticeMoment): Promise<void>
  completePractice(day: number, moment: PracticeMoment): Promise<void>
  reload(): void
}

export const JourneyProgressContext = createContext<JourneyProgressContextValue | null>(null)
