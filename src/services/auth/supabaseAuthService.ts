import { isAuthApiError, isAuthRetryableFetchError, type Session, type User } from '@supabase/supabase-js'
import type { AuthService } from './authService'
import { AuthError, type AuthErrorCode } from './authErrors'
import { paths } from '@/config/routes'
import { absoluteAppUrl } from '@/utils/baseUrl'
import { getSupabaseClient, isMissingTable, isNetworkError } from '@/services/supabase/client'
import type { AuthSession, Availability, ParticipantPreferences, ProfileChanges, UserProfile } from '@/types/user'

/**
 * Autenticação real com Supabase Auth.
 * Usa apenas a URL e a chave pública (anon / publishable). A sessão (tokens JWT) é guardada
 * e renovada pelo próprio supabase-js; as senhas nunca passam por este código além do envio ao Supabase.
 *
 * Nome de exibição e respostas do onboarding ficam na tabela `profiles` (protegida por RLS).
 * Se as migrations ainda não foram aplicadas, cai no `user_metadata`, como antes.
 * Nenhum desses campos é usado para decisões de permissão.
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

/** Linha da tabela `profiles` (ver supabase/migrations). */
interface ProfileRow {
  display_name: string
  preferred_name: string | null
  intention: string | null
  availability: Availability | null
  onboarding_completed: boolean
}

const PROFILE_COLUMNS = 'display_name, preferred_name, intention, availability, onboarding_completed'

/** Perfil a partir da tabela `profiles`; sem ela (migrations não aplicadas), usa o `user_metadata`. */
function toProfile(user: User, row?: ProfileRow | null): UserProfile {
  const metadata = (user.user_metadata ?? {}) as ParticipantMetadata
  if (!row) {
    return {
      id: user.id,
      email: user.email ?? '',
      displayName: metadata.display_name ?? '',
      onboardingCompleted: metadata.onboarding_completed ?? false,
      preferences: metadata.preferences ?? {},
    }
  }
  const preferences: ParticipantPreferences = {}
  if (row.preferred_name) preferences.preferredName = row.preferred_name
  if (row.intention) preferences.intention = row.intention
  if (row.availability) preferences.availability = row.availability
  return {
    id: user.id,
    email: user.email ?? '',
    displayName: row.display_name,
    onboardingCompleted: row.onboarding_completed,
    preferences,
  }
}

function toRow(changes: ProfileChanges, current: UserProfile): Partial<ProfileRow> {
  const row: Partial<ProfileRow> = {}
  if (changes.displayName !== undefined) row.display_name = changes.displayName.trim().slice(0, 80)
  if (changes.onboardingCompleted !== undefined) row.onboarding_completed = changes.onboardingCompleted
  if (changes.preferences) {
    const preferences = { ...current.preferences, ...changes.preferences }
    row.preferred_name = preferences.preferredName?.trim().slice(0, 60) || null
    row.intention = preferences.intention || null
    row.availability = preferences.availability ?? null
  }
  return row
}

const absoluteUrl = absoluteAppUrl

export function createSupabaseAuthService(): AuthService {
  const client = getSupabaseClient()
  /** Perfis já lidos da tabela, por conta. `null` = tabela indisponível, usar metadata. */
  const profiles = new Map<string, ProfileRow | null>()

  async function loadProfile(user: User): Promise<UserProfile> {
    if (!profiles.has(user.id)) {
      const { data, error } = await client.from('profiles').select(PROFILE_COLUMNS).eq('id', user.id).maybeSingle()
      if (error && !isMissingTable(error)) {
        // Falha temporária: mostra o que está no token e tenta de novo na próxima leitura.
        return toProfile(user)
      }
      profiles.set(user.id, (data as ProfileRow | null) ?? null)
    }
    return toProfile(user, profiles.get(user.id))
  }

  async function toFullSession(session: Session | null): Promise<AuthSession | null> {
    return session ? { user: await loadProfile(session.user), mode: 'supabase' } : null
  }

  async function requireSession() {
    const { data, error } = await client.auth.getSession()
    if (error) throw toAuthError(error)
    if (!data.session) throw new AuthError('session_missing')
    return { session: data.session, current: await loadProfile(data.session.user) }
  }

  return {
    mode: 'supabase',

    async getSession() {
      const { data, error } = await client.auth.getSession()
      if (error) throw toAuthError(error)
      return toFullSession(data.session)
    },

    onSessionChange(listener) {
      let latest: string | null = null
      // Não chamar outros métodos do Supabase dentro deste callback (recomendação da biblioteca):
      // avisa já com o que está em cache e lê o perfil logo depois, fora do callback.
      const { data } = client.auth.onAuthStateChange((_event, session) => {
        latest = session?.user.id ?? null
        if (!session) {
          listener(null)
          return
        }
        const user = session.user
        if (profiles.has(user.id)) {
          listener({ user: toProfile(user, profiles.get(user.id)), mode: 'supabase' })
          return
        }
        window.setTimeout(() => {
          void loadProfile(user).then((profile) => {
            if (latest === user.id) listener({ user: profile, mode: 'supabase' })
          })
        }, 0)
      })
      return () => data.subscription.unsubscribe()
    },

    async signUp({ email, password, displayName }) {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          // O nome vai no cadastro e o banco cria o perfil a partir dele (gatilho handle_new_user).
          data: { display_name: displayName.trim(), onboarding_completed: false } satisfies ParticipantMetadata,
          emailRedirectTo: absoluteUrl(paths.onboarding),
        },
      })
      if (error) throw toAuthError(error)
      // Com confirmação de e-mail ativa, o Supabase não devolve sessão (nem revela se o e-mail já existia).
      return { session: await toFullSession(data.session), needsEmailConfirmation: !data.session }
    },

    async signIn({ email, password }) {
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) throw toAuthError(error)
      const session = await toFullSession(data.session)
      if (!session) throw new AuthError('unknown')
      return session
    },

    async signOut() {
      const { error } = await client.auth.signOut()
      profiles.clear()
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
      const { session, current } = await requireSession()
      const userId = session.user.id

      if (profiles.get(userId) === null) {
        // Tabela `profiles` ainda não criada: guarda no user_metadata, como antes da etapa 8.
        const metadata: ParticipantMetadata = {}
        if (changes.displayName !== undefined) metadata.display_name = changes.displayName.trim()
        if (changes.onboardingCompleted !== undefined) metadata.onboarding_completed = changes.onboardingCompleted
        if (changes.preferences) metadata.preferences = { ...current.preferences, ...changes.preferences }
        const { data, error } = await client.auth.updateUser({ data: metadata })
        if (error) throw toAuthError(error)
        return { user: toProfile(data.user), mode: 'supabase' }
      }

      const row = toRow(changes, current)
      const updated = await client.from('profiles').update(row).eq('id', userId).select(PROFILE_COLUMNS).maybeSingle()
      let result = updated.data as ProfileRow | null
      if (updated.error) throw new AuthError(isNetworkError(updated.error) ? 'network' : 'unknown', updated.error)
      if (!result) {
        // Conta criada antes das migrations: o perfil ainda não existe, então é criado agora.
        const inserted = await client
          .from('profiles')
          .insert({ id: userId, display_name: current.displayName, ...row })
          .select(PROFILE_COLUMNS)
          .single()
        if (inserted.error) throw new AuthError(isNetworkError(inserted.error) ? 'network' : 'unknown', inserted.error)
        result = inserted.data as ProfileRow
      }
      profiles.set(userId, result)
      return { user: toProfile(session.user, result), mode: 'supabase' }
    },

    async deleteAccount() {
      await requireSession()
      const { error } = await client.rpc('delete_my_account')
      if (error) throw new AuthError(isNetworkError(error) ? 'network' : 'delete_failed', error)
      profiles.clear()
      // A conta já não existe no servidor: encerra só a sessão deste navegador.
      await client.auth.signOut({ scope: 'local' })
    },
  }
}
