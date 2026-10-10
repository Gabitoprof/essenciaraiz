import type { JourneyProgressData, ProgressStorage } from '@/types/progress'

/**
 * Contrato do armazenamento do progresso.
 * Hoje há só a versão local (este navegador). A versão com Supabase vai implementar o mesmo contrato.
 */
export interface ProgressService {
  storage: ProgressStorage
  load(userId: string): Promise<JourneyProgressData>
  save(userId: string, data: JourneyProgressData): Promise<void>
}

export class ProgressError extends Error {}
