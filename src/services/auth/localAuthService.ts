import type { AuthService } from './authService'
import type { AuthSession, UserProfile } from '@/types/user'

const STORAGE_KEY = 'essencia-raiz:dev-session'

/**
 * Autenticação SOMENTE para desenvolvimento.
 * Guarda uma sessão falsa no navegador e não verifica senha.
 * Não usar em produção: será substituída pelo Supabase.
 */
function readSession(): AuthSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

function writeSession(session: AuthSession | null) {
  try {
    if (session) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Armazenamento indisponível (ex.: navegação privada): a sessão dura só até recarregar.
  }
}

function nameFromEmail(email: string) {
  const local = email.split('@')[0] ?? ''
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : 'Participante'
}

function createUser(email: string, name?: string): UserProfile {
  return {
    id: 'dev-user',
    email,
    name: name || nameFromEmail(email),
    onboardingCompleted: false,
  }
}

export const localAuthService: AuthService = {
  async getSession() {
    return readSession()
  },
  async signIn({ email }) {
    const session = { user: readSession()?.user ?? createUser(email) }
    writeSession(session)
    return session
  },
  async signUp({ email, name }) {
    const session = { user: createUser(email, name) }
    writeSession(session)
    return session
  },
  async signOut() {
    writeSession(null)
  },
  async requestPasswordReset() {
    // Sem envio de e-mail em desenvolvimento.
  },
}
