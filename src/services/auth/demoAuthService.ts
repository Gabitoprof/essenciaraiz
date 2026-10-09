import type { AuthService } from './authService'
import { AuthError } from './authErrors'
import type { AuthSession, ProfileChanges, UserProfile } from '@/types/user'

/**
 * MODO DEMONSTRAÇÃO — não é autenticação real.
 *
 * Usado apenas enquanto o Supabase não está configurado, para navegar e testar as telas.
 * - As "contas" ficam só no localStorage deste navegador e qualquer pessoa com acesso a ele pode vê-las.
 * - A senha NUNCA é guardada (nem em texto puro, nem de outra forma) e por isso não é verificada.
 * - Nenhum e-mail é enviado.
 * A interface mostra um aviso permanente enquanto este modo está ativo.
 */

const ACCOUNTS_KEY = 'essencia-raiz:demo:contas'
const SESSION_KEY = 'essencia-raiz:demo:sessao'
/** Pequena pausa para os estados de carregamento serem visíveis, como em uma chamada real. */
const SIMULATED_DELAY_MS = 350

type DemoAccounts = Record<string, UserProfile>

const listeners = new Set<(session: AuthSession | null) => void>()

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Armazenamento indisponível (ex.: navegação privada): a demonstração dura só até recarregar.
  }
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()
const wait = () => new Promise((resolve) => window.setTimeout(resolve, SIMULATED_DELAY_MS))

function readAccounts(): DemoAccounts {
  return read<DemoAccounts>(ACCOUNTS_KEY) ?? {}
}

function currentSession(): AuthSession | null {
  const email = read<string>(SESSION_KEY)
  const user = email ? readAccounts()[email] : undefined
  return user ? { user, mode: 'demo' } : null
}

function setCurrentEmail(email: string | null) {
  write(SESSION_KEY, email)
  const session = currentSession()
  listeners.forEach((listener) => listener(session))
}

export const demoAuthService: AuthService = {
  mode: 'demo',

  async getSession() {
    return currentSession()
  },

  onSessionChange(listener) {
    listeners.add(listener)
    // Mantém abas diferentes do mesmo navegador sincronizadas.
    const onStorage = (event: StorageEvent) => {
      if (event.key === SESSION_KEY || event.key === ACCOUNTS_KEY) listener(currentSession())
    }
    window.addEventListener('storage', onStorage)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
  },

  async signUp({ email, displayName }) {
    await wait()
    const key = normalizeEmail(email)
    const accounts = readAccounts()
    if (accounts[key]) throw new AuthError('email_taken')
    accounts[key] = {
      id: `demo-${crypto.randomUUID()}`,
      email: key,
      displayName: displayName.trim(),
      onboardingCompleted: false,
      preferences: {},
    }
    write(ACCOUNTS_KEY, accounts)
    setCurrentEmail(key)
    return { session: currentSession(), needsEmailConfirmation: false }
  },

  async signIn({ email }) {
    await wait()
    const key = normalizeEmail(email)
    if (!readAccounts()[key]) throw new AuthError('demo_account_not_found')
    setCurrentEmail(key)
    return currentSession() as AuthSession
  },

  async signOut() {
    setCurrentEmail(null)
  },

  async requestPasswordReset() {
    await wait()
    throw new AuthError('not_available_in_demo')
  },

  async updatePassword() {
    await wait()
    throw new AuthError('not_available_in_demo')
  },

  async updateProfile(changes: ProfileChanges) {
    await wait()
    const session = currentSession()
    if (!session) throw new AuthError('session_missing')
    const accounts = readAccounts()
    accounts[session.user.email] = {
      ...session.user,
      ...changes,
      preferences: { ...session.user.preferences, ...changes.preferences },
    }
    write(ACCOUNTS_KEY, accounts)
    setCurrentEmail(session.user.email)
    return currentSession() as AuthSession
  },
}
