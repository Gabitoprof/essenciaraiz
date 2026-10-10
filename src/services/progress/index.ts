import { localProgressService } from './localProgressService'

/** Implementação em uso. Quando houver tabelas no Supabase (etapa de persistência), a troca acontece aqui. */
export const progressService = localProgressService

export { ProgressError } from './progressService'
export type { ProgressService } from './progressService'
