import { appConfig } from '@/config/app'
import type { JournalDraft, JournalEntry } from '@/types/journal'
import type { ProgressStorage } from '@/types/progress'

/**
 * Contrato do armazenamento do diário.
 * Duas implementações: local (este navegador, modo demonstração) e Supabase (tabela journal_entries),
 * com Row Level Security para que cada participante acesse apenas os próprios registros.
 * Nenhuma das duas registra o conteúdo no console.
 */
export interface JournalService {
  storage: ProgressStorage
  list(userId: string): Promise<JournalEntry[]>
  create(userId: string, draft: JournalDraft): Promise<JournalEntry>
  update(userId: string, id: string, draft: JournalDraft): Promise<JournalEntry>
  remove(userId: string, id: string): Promise<void>
}

export class JournalError extends Error {}

/** Limpa o rascunho: tira espaços, descarta campos vazios e dias inválidos. */
export function cleanDraft(draft: JournalDraft): JournalDraft {
  const title = draft.title?.trim()
  const prompt = draft.prompt?.trim()
  const day = draft.day && Number.isInteger(draft.day) && draft.day >= 1 && draft.day <= appConfig.journeyLength ? draft.day : undefined
  return { title: title || undefined, body: draft.body.trim(), day, prompt: prompt || undefined }
}
