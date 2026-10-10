import { appConfig } from '@/config/app'
import { journalService } from '@/services/journal'
import { progressService } from '@/services/progress'
import type { AuthSession } from '@/types/user'

/**
 * Reúne todos os dados pessoais da participante num único JSON (direito de acesso e portabilidade, LGPD).
 * Lido direto do armazenamento em uso (navegador ou Supabase) e baixado no próprio aparelho.
 */
export async function buildMyDataExport(session: AuthSession): Promise<string> {
  const { user } = session
  const [progress, journal] = await Promise.all([progressService.load(user.id), journalService.list(user.id)])
  const data = {
    exportadoEm: new Date().toISOString(),
    plataforma: appConfig.name,
    armazenamento: progressService.storage === 'supabase' ? 'conta (Supabase)' : 'somente este navegador (modo demonstração)',
    perfil: {
      email: user.email,
      nomeDeExibicao: user.displayName,
      comoPrefereSerChamada: user.preferences.preferredName ?? null,
      intencao: user.preferences.intention ?? null,
      periodoPreferido: user.preferences.availability ?? null,
      onboardingConcluido: user.onboardingCompleted,
    },
    progresso: Object.entries(progress.days).flatMap(([day, record]) =>
      Object.entries(record).map(([moment, practice]) => ({ dia: Number(day), momento: moment, ...practice })),
    ),
    diario: journal,
  }
  return JSON.stringify(data, null, 2) + '\n'
}
