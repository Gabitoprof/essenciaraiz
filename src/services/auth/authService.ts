import type {
  AuthMode,
  AuthSession,
  ProfileChanges,
  SignInCredentials,
  SignUpData,
  SignUpResult,
} from '@/types/user'

/**
 * Contrato do serviço de autenticação. As páginas só conhecem este contrato,
 * nunca o fornecedor: hoje há duas implementações, Supabase Auth e demonstração.
 * Todos os métodos rejeitam com `AuthError` (mensagem já em português).
 */
export interface AuthService {
  readonly mode: AuthMode
  /** Sessão atual, ou nula se ninguém entrou (ou se a sessão expirou). */
  getSession(): Promise<AuthSession | null>
  /** Avisa sempre que a sessão muda (entrada, saída, renovação, expiração). Devolve a função para cancelar. */
  onSessionChange(listener: (session: AuthSession | null) => void): () => void
  signUp(data: SignUpData): Promise<SignUpResult>
  signIn(credentials: SignInCredentials): Promise<AuthSession>
  signOut(): Promise<void>
  /** Envia o e-mail com o link para criar uma nova senha. */
  requestPasswordReset(email: string): Promise<void>
  /** Troca a senha de quem está com sessão ativa (inclusive a sessão aberta pelo link de recuperação). */
  updatePassword(newPassword: string): Promise<void>
  /** Atualiza nome e respostas do onboarding. */
  updateProfile(changes: ProfileChanges): Promise<AuthSession>
}
