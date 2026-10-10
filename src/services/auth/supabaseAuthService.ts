import {
  createClient,
  isAuthApiError,
  isAuthRetryableFetchError,
  type Session,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js'
import type { AuthService } from './authService'
import { AuthError, type AuthErrorCode } from './authErrors'
import { env } from '@/config/env'
import { paths } from '@/config/routes'
import { absoluteAppUrl } from '@/utils/baseUrl'
import type { AuthSession, ParticipantPreferences, ProfileChanges, UserProfile } from '@/types/user'

/**
 * Autenticação real com Supabase Auth.
 * Usa apenas a URL e a chave pública (anon / publishable). A sessão (tokens JWT) é guardada
 * e renovada pelo próprio supabase-js; as senhas nunca passam por este código além do envio ao Supabase.
 *
 * Nome de exibição e respostas do onboarding ficam em `user_metadata`. Esses campos podem ser
 * alterados pela própria usuária, então não devem ser usados para decisões de permissão.
 */

interface ParticipantMetadata {
  display_name?: string
  onboarding_completed?: boolean
  preferences?: ParticipantPreferences
}

const errorCodeMap: Record<string, AuthErrorCode> = {
  invalid_credentials: 'invalid_credentials',
  user_already_exists: 'email_taken',
  email_exists: 'email_taken',
  weak_password: 'weak_password',
  email_not_confirmed: 'email_not_confirmed',
  email_address_invalid: 'invalid_email',
  validation_failed: 'invalid_email',
  same_password: 'same_password',
  signup_disabled: 'signup_disabled',
  over_email_send_rate_limit: 'rate_limited',
  over_request_rate_limit: 'rate_limited',
  session_not_found: 'session_missing',
}

function toAuthError(error: unknown): AuthError {
  if (isAuthRetryableFetchError(error)) return new AuthError('network', error)
  if (isAuthApiError(error)) {
    if (error.status === 429) return new AuthError('rate_limited', error)
    const code = error.code ? errorCodeMap[error.code] : undefined
    return new AuthError(code ?? 'unknown', error)
  }
  if (error instanceof Error && error.name === 'AuthSessionMissingError') return new AuthError('session_missing', error)
  if (error instanceof TypeError) return new AuthError('network', error)
  return new AuthError('unknown', error)
}

function toProfile(user: User): UserProfile {
  const metadata = (user.user_metadata ?? {}) as ParticipantMetadata
  return {
    id: user.id,
    email: user.email ?? '',
    displayName: metadata.display_name ?? '',
    onboardingCompleted: metadata.onboarding_completed ?? false,
    preferences: metadata.preferences ?? {},
  }
}

function toSession(session: Session | null): AuthSession | null {
  return session ? { user: toProfile(session.user), mode: 'supabase' } : null
}

const absoluteUrl = absoluteAppUrl

export function createSupabaseAuthService(): AuthService {
  const client: SupabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Lê a sessão que volta nos links de confirmação e de recuperação de senha.
      detectSessionInUrl: true,
    },
  })

  async function requireSession() {
    const { data, error } = await client.auth.getSession()
    if (error) throw toAuthError(error)
    const session = toSession(data.session)
    if (!session) throw new AuthError('session_missing')
    return session
  }

  return {
    mode: 'supabase',

    async getSession() {
      const { data, error } = await client.auth.getSession()
      if (error) throw toAuthError(error)
      return toSession(data.session)
    },

    onSessionChange(listener) {
      // Não chamar outros métodos do Supabase dentro deste callback (recomendação da biblioteca).
      const { data } = client.auth.onAuthStateChange((_event, session) => listener(toSession(session)))
      return () => data.subscription.unsubscribe()
    },

    async signUp({ email, password, displayName }) {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName.trim(), onboarding_completed: false } satisfies ParticipantMetadata,
          emailRedirectTo: absoluteUrl(paths.onboarding),
        },
      })
      if (error) throw toAuthError(error)
      // Com confirmação de e-mail ativa, o Supabase não devolve sessão (nem revela se o e-mail já existia).
      return { session: toSession(data.session), needsEmailConfirmation: !data.session }
    },

    async signIn({ email, password }) {
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) throw toAuthError(error)
      const session = toSession(data.session)
      if (!session) throw new AuthError('unknown')
      return session
    },

    async signOut() {
      const { error } = await client.auth.signOut()
      if (error) throw toAuthError(error)
    },

    async requestPasswordReset(email) {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: absoluteUrl(paths.resetPassword),
      })
      if (error) throw toAuthError(error)
    },

    async updatePassword(newPassword) {
      await requireSession()
      const { error } = await client.auth.updateUser({ password: newPassword })
      if (error) throw toAuthError(error)
    },

    async updateProfile(changes: ProfileChanges) {
      const current = await requireSession()
      const metadata: ParticipantMetadata = {}
      if (changes.displayName !== undefined) metadata.display_name = changes.displayName.trim()
      if (changes.onboardingCompleted !== undefined) metadata.onboarding_completed = changes.onboardingCompleted
      if (changes.preferences) metadata.preferences = { ...current.user.preferences, ...changes.preferences }

      const { data, error } = await client.auth.updateUser({ data: metadata })
      if (error) throw toAuthError(error)
      return { user: toProfile(data.user), mode: 'supabase' }
    },
  }
}
