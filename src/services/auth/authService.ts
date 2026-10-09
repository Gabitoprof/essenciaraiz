import type { AuthSession, SignInCredentials, SignUpData } from '@/types/user'

/**
 * Contrato do serviço de autenticação.
 * A implementação atual é local (desenvolvimento). Quando o Supabase for integrado,
 * basta criar uma nova implementação deste contrato e trocá-la em `services/auth/index.ts`.
 */
export interface AuthService {
  getSession(): Promise<AuthSession | null>
  signIn(credentials: SignInCredentials): Promise<AuthSession>
  signUp(data: SignUpData): Promise<AuthSession>
  signOut(): Promise<void>
  requestPasswordReset(email: string): Promise<void>
}
