import { isSupabaseConfigured } from '@/config/env'
import { localProgressService } from './localProgressService'
import type { ProgressService } from './progressService'

/** Versão Supabase carregada sob demanda, como na autenticação. */
function createLazySupabaseProgressService(): ProgressService {
  const ready = import('./supabaseProgressService').then((module) => module.createSupabaseProgressService())
  return {
    storage: 'supabase',
    load: (userId) => ready.then((service) => service.load(userId)),
    save: (userId, data, change) => ready.then((service) => service.save(userId, data, change)),
  }
}

/** Com o Supabase configurado, o progresso vai para o banco; sem ele, fica neste navegador (modo demonstração). */
export const progressService: ProgressService = isSupabaseConfigured ? createLazySupabaseProgressService() : localProgressService

export { ProgressError } from './progressService'
export type { ProgressService } from './progressService'
