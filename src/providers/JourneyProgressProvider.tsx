import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { isDayPublished } from '@/data/journey'
import { useAuth } from '@/hooks/useAuth'
import { progressService } from '@/services/progress'
import type { JourneyProgressData, PracticeMoment } from '@/types/progress'
import {
  countCompletedPractices,
  getCompletedDays,
  getCurrentDay,
  getDayStatus,
  getPracticeState,
  getResumeTarget,
  hasAnyActivity,
  isDayUnlocked,
  withPracticeState,
} from '@/utils/journeyProgress'
import { JourneyProgressContext, type JourneyProgressContextValue } from './journeyProgressContext'

const EMPTY: JourneyProgressData = { days: {} }

/** Carrega o progresso da participante logada e oferece as ações de iniciar e concluir práticas. */
export function JourneyProgressProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const userId = session?.user.id
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${userId ?? ''}:${attempt}`
  // Resultado da última leitura, marcado com a chave do pedido: se a conta ou a tentativa mudar, volta a "carregando".
  const [loaded, setLoaded] = useState<{ key: string; error: string | null } | null>(null)
  const [data, setData] = useState<JourneyProgressData>(EMPTY)
  const [saveError, setSaveError] = useState<string | null>(null)
  const dataRef = useRef(data)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    if (!userId) return
    let active = true
    progressService
      .load(userId)
      .then((result) => {
        if (!active) return
        setData(result)
        setLoaded({ key: requestKey, error: null })
      })
      .catch((err: unknown) => {
        if (!active) return
        const message = err instanceof Error ? err.message : 'Não foi possível carregar o seu progresso.'
        setLoaded({ key: requestKey, error: message })
      })
    return () => {
      active = false
    }
  }, [userId, requestKey])

  const isCurrent = loaded?.key === requestKey
  const status: JourneyProgressContextValue['status'] = !isCurrent ? 'loading' : loaded.error ? 'error' : 'ready'
  const error = (isCurrent && loaded.error) || saveError
  // Enquanto carrega (ou se a leitura falhou) nada antigo aparece: só o que pertence à conta atual.
  const visible = status === 'ready' ? data : EMPTY

  const update = useCallback(
    async (day: number, moment: PracticeMoment, state: 'iniciado' | 'concluido') => {
      // Só registra em dias liberados e com conteúdo publicado.
      if (!userId || !isDayUnlocked(dataRef.current, day) || !isDayPublished(day)) return
      const previous = dataRef.current
      const next = withPracticeState(previous, day, moment, state, new Date().toISOString())
      if (next === previous) return
      setData(next)
      dataRef.current = next
      setSaveError(null)
      try {
        await progressService.save(userId, next, { day, moment })
      } catch (err) {
        setData(previous)
        dataRef.current = previous
        setSaveError(err instanceof Error ? err.message : 'Não foi possível salvar agora.')
      }
    },
    [userId],
  )

  const value = useMemo<JourneyProgressContextValue>(
    () => ({
      status,
      error,
      storage: progressService.storage,
      data: visible,
      currentDay: getCurrentDay(visible),
      completedDays: getCompletedDays(visible),
      completedPractices: countCompletedPractices(visible),
      hasActivity: hasAnyActivity(visible),
      resumeTarget: getResumeTarget(visible),
      getDayStatus: (day) => getDayStatus(visible, day),
      isDayUnlocked: (day) => isDayUnlocked(visible, day),
      getPracticeState: (day, moment) => getPracticeState(visible, day, moment),
      startPractice: (day, moment) => update(day, moment, 'iniciado'),
      completePractice: (day, moment) => update(day, moment, 'concluido'),
      reload: () => {
        setSaveError(null)
        setAttempt((count) => count + 1)
      },
    }),
    [status, error, visible, update],
  )

  return <JourneyProgressContext.Provider value={value}>{children}</JourneyProgressContext.Provider>
}
