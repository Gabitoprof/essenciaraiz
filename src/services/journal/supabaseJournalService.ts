import type { JournalEntry } from '@/types/journal'
import { getSupabaseClient, isNetworkError } from '@/services/supabase/client'
import { cleanDraft, JournalError, type JournalService } from './journalService'

interface EntryRow {
  id: string
  title: string | null
  body: string
  day: number | null
  prompt: string | null
  created_at: string
  updated_at: string
}

const COLUMNS = 'id, title, body, day, prompt, created_at, updated_at'

function toEntry(row: EntryRow): JournalEntry {
  const entry: JournalEntry = { id: row.id, body: row.body, createdAt: row.created_at, updatedAt: row.updated_at }
  if (row.title) entry.title = row.title
  if (row.day) entry.day = row.day
  if (row.prompt) entry.prompt = row.prompt
  return entry
}

/** Mensagem amigável. O erro original fica em `cause`, sem o texto do diário. */
function failure(fallback: string, error: unknown) {
  return new JournalError(
    isNetworkError(error) ? 'Sem conexão com o servidor. Seu texto não foi perdido: verifique a internet e tente salvar de novo.' : fallback,
    { cause: error },
  )
}

/** Diário na tabela `journal_entries`. O RLS garante que cada conta só vê e altera os próprios registros. */
export function createSupabaseJournalService(): JournalService {
  const client = getSupabaseClient()

  return {
    storage: 'supabase',

    async list(userId) {
      const { data, error } = await client
        .from('journal_entries')
        .select(COLUMNS)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
      if (error) throw failure('Não foi possível abrir o diário agora.', error)
      return ((data ?? []) as EntryRow[]).map(toEntry)
    },

    async create(userId, draft) {
      const clean = cleanDraft(draft)
      if (!clean.body) throw new JournalError('Escreva algo antes de salvar.')
      const { data, error } = await client
        .from('journal_entries')
        .insert({ user_id: userId, title: clean.title ?? null, body: clean.body, day: clean.day ?? null, prompt: clean.prompt ?? null })
        .select(COLUMNS)
        .single()
      if (error) throw failure('Não foi possível salvar o registro agora.', error)
      return toEntry(data as EntryRow)
    },

    async update(userId, id, draft) {
      const clean = cleanDraft(draft)
      if (!clean.body) throw new JournalError('Escreva algo antes de salvar.')
      const { data, error } = await client
        .from('journal_entries')
        .update({ title: clean.title ?? null, body: clean.body, day: clean.day ?? null, prompt: clean.prompt ?? null })
        .eq('id', id)
        .eq('user_id', userId)
        .select(COLUMNS)
        .maybeSingle()
      if (error) throw failure('Não foi possível salvar as alterações agora.', error)
      if (!data) throw new JournalError('Este registro não foi encontrado. Ele pode ter sido excluído.')
      return toEntry(data as EntryRow)
    },

    async remove(userId, id) {
      const { error } = await client.from('journal_entries').delete().eq('id', id).eq('user_id', userId)
      if (error) throw failure('Não foi possível excluir o registro agora.', error)
    },
  }
}
