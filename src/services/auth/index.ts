import { isSupabaseConfigured } from '@/config/env'
import type { AuthService } from './authService'
import { demoAuthService } from './demoAuthService'

/**
 * Supabase carregado sob demanda: a biblioteca só é baixada pelo navegador quando o Supabase
 * está configurado, então o modo demonstração não carrega esse peso.
 */
function createLazySupabaseAuthService(): AuthService {
  const ready = import('./supabaseAuthService').then((module) => module.createSupabaseAuthService())

  return {
    mode: 'supabase',
    getSession: () => ready.then((service) => service.getSession()),
    onSessionChange(listener) {
      let unsubscribe: (() => void) | undefined
      let cancelled = false
      void ready.then((service) => {
        if (!cancelled) unsubscribe = service.onSessionChange(listener)
      })
      return () => {
        cancelled = true
        unsubscribe?.()
      }
    },
    signUp: (data) => ready.then((service) => service.signUp(data)),
    signIn: (credentials) => ready.then((service) => service.signIn(credentials)),
    signOut: () => ready.then((service) => service.signOut()),
    requestPasswordReset: (email) => ready.then((service) => service.requestPasswordReset(email)),
    updatePassword: (password) => ready.then((service) => service.updatePassword(password)),
    updateProfile: (changes) => ready.then((service) => service.updateProfile(changes)),
    deleteAccount: () => ready.then((service) => service.deleteAccount()),
  }
}

/**
 * Ponto único de escolha do fornecedor:
 * com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY definidas, usa o Supabase Auth;
 * sem elas, cai no modo demonstração (claramente sinalizado na interface).
 */
export const authService: AuthService = isSupabaseConfigured ? createLazySupabaseAuthService() : demoAuthService

export type { AuthService } from './authService'
export { AuthError, authErrorMessage, type AuthErrorCode } from './authErrors'
