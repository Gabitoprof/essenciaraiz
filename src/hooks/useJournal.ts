import { useCallback, useEffect, useState } from 'react'
import { journalService } from '@/services/journal'
import type { JournalDraft, JournalEntry } from '@/types/journal'
import { useAuth } from './useAuth'

type Loaded = { key: string; entries: JournalEntry[]; error: string | null }

function messageOf(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback
}

/** Registros do diário da participante logada, com as ações de criar, editar e excluir. */
export function useJournal() {
  const { session } = useAuth()
  const userId = session?.user.id
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${userId ?? ''}:${attempt}`
  const [loaded, setLoaded] = useState<Loaded | null>(null)

  useEffect(() => {
    if (!userId) return
    let active = true
    journalService
      .list(userId)
      .then((entries) => active && setLoaded({ key: requestKey, entries, error: null }))
      .catch((err: unknown) => active && setLoaded({ key: requestKey, entries: [], error: messageOf(err, 'Não foi possível abrir o diário.') }))
    return () => {
      active = false
    }
  }, [userId, requestKey])

  const isCurrent = loaded?.key === requestKey
  const status: 'loading' | 'ready' | 'error' = !isCurrent ? 'loading' : loaded.error ? 'error' : 'ready'
  const entries = isCurrent ? loaded.entries : []

  const refresh = useCallback(() => setAttempt((count) => count + 1), [])

  const requireUser = useCallback(() => {
    if (!userId) throw new Error('Sua sessão terminou. Entre novamente para continuar.')
    return userId
  }, [userId])

  const create = useCallback(
    async (draft: JournalDraft) => {
      const entry = await journalService.create(requireUser(), draft)
      refresh()
      return entry
    },
    [requireUser, refresh],
  )

  const update = useCallback(
    async (id: string, draft: JournalDraft) => {
      const entry = await journalService.update(requireUser(), id, draft)
      refresh()
      return entry
    },
    [requireUser, refresh],
  )

  const remove = useCallback(
    async (id: string) => {
      await journalService.remove(requireUser(), id)
      refresh()
    },
    [requireUser, refresh],
  )

  return {
    status,
    error: isCurrent ? loaded.error : null,
    entries,
    storage: journalService.storage,
    create,
    update,
    remove,
    reload: refresh,
  }
}
