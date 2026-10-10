import { useContext } from 'react'
import { JourneyProgressContext } from '@/providers/journeyProgressContext'

/** Progresso real da participante na jornada (registrado por ela, nunca inventado). */
export function useJourneyProgress() {
  const context = useContext(JourneyProgressContext)
  if (!context) throw new Error('useJourneyProgress precisa estar dentro de <JourneyProgressProvider>.')
  return context
}
