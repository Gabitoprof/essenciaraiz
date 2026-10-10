import { isSupabaseConfigured } from '@/config/env'
import type { JournalService } from './journalService'
import { localJournalService } from './localJournalService'

/** Versão Supabase carregada sob demanda, como na autenticação. */
function createLazySupabaseJournalService(): JournalService {
  const ready = import('./supabaseJournalService').then((module) => module.createSupabaseJournalService())
  return {
    storage: 'supabase',
    list: (userId) => ready.then((service) => service.list(userId)),
    create: (userId, draft) => ready.then((service) => service.create(userId, draft)),
    update: (userId, id, draft) => ready.then((service) => service.update(userId, id, draft)),
    remove: (userId, id) => ready.then((service) => service.remove(userId, id)),
  }
}

/** Com o Supabase configurado, o diário vai para o banco (protegido por RLS); sem ele, fica neste navegador. */
export const journalService: JournalService = isSupabaseConfigured ? createLazySupabaseJournalService() : localJournalService

export { JournalError } from './journalService'
export type { JournalService } from './journalService'
