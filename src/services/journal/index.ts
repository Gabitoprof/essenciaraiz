import { localJournalService } from './localJournalService'

/** Implementação em uso. Quando houver tabelas no Supabase (etapa de persistência), a troca acontece aqui. */
export const journalService = localJournalService

export { JournalError } from './journalService'
export type { JournalService } from './journalService'
