import type { JournalDraft, JournalEntry } from '@/types/journal'

/**
 * Contrato do armazenamento do diário.
 * Hoje há só a versão local (este navegador). A versão com Supabase vai implementar o mesmo contrato,
 * com Row Level Security para que cada participante acesse apenas os próprios registros.
 */
export interface JournalService {
  storage: 'local'
  list(userId: string): Promise<JournalEntry[]>
  create(userId: string, draft: JournalDraft): Promise<JournalEntry>
  update(userId: string, id: string, draft: JournalDraft): Promise<JournalEntry>
  remove(userId: string, id: string): Promise<void>
}

export class JournalError extends Error {}
