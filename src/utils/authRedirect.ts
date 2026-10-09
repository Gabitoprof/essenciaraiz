import { paths } from '@/config/routes'
import type { AuthSession } from '@/types/user'

/** Estado que a proteção de rotas envia ao login para lembrar a página pedida. */
export interface AuthRedirectState {
  from?: string
}

/**
 * Para onde levar a participante depois de entrar:
 * primeiro o onboarding (se ainda não fez), depois a página que ela tentou abrir, ou o painel.
 */
export function destinationAfterAuth(session: AuthSession, from?: string) {
  if (!session.user.onboardingCompleted) return paths.onboarding
  // Só aceita caminhos internos da área logada, para não redirecionar para fora do site.
  if (from && from.startsWith('/app') && !from.startsWith('//')) return from
  return paths.dashboard
}
