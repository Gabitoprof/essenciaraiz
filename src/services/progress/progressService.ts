import type { JourneyProgressData, PracticeChange, ProgressStorage } from '@/types/progress'

/**
 * Contrato do armazenamento do progresso.
 * Duas implementações: local (este navegador, modo demonstração) e Supabase (tabela practice_progress, com RLS).
 */
export interface ProgressService {
  storage: ProgressStorage
  load(userId: string): Promise<JourneyProgressData>
  /** Grava o progresso completo; `change` diz qual prática acabou de mudar. */
  save(userId: string, data: JourneyProgressData, change: PracticeChange): Promise<void>
}

export class ProgressError extends Error {}
