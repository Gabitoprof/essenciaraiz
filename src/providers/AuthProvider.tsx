import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/services/auth'
import type { AuthSession } from '@/types/user'
import { AuthContext, type AuthContextValue } from './authContext'

/**
 * Mantém a sessão da participante em um só lugar.
 * Verifica a sessão salva ao abrir o site e acompanha mudanças (entrada, saída, renovação
 * automática do token e expiração) pelo `onSessionChange` do serviço.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    authService
      .getSession()
      .then((current) => {
        if (active) setSession(current)
      })
      .catch(() => {
        // Sessão ilegível ou expirada: segue como visitante.
        if (active) setSession(null)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    const unsubscribe = authService.onSessionChange((current) => {
      if (active) setSession(current)
    })
    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      mode: authService.mode,
      session,
      isLoading,
      async signUp(data) {
        const result = await authService.signUp(data)
        if (result.session) setSession(result.session)
        return result
      },
      async signIn(credentials) {
        const next = await authService.signIn(credentials)
        setSession(next)
        return next
      },
      async signOut() {
        try {
          await authService.signOut()
        } finally {
          // Mesmo se o servidor falhar, a sessão local é encerrada.
          setSession(null)
        }
      },
      requestPasswordReset: (email) => authService.requestPasswordReset(email),
      updatePassword: (newPassword) => authService.updatePassword(newPassword),
      async updateProfile(changes) {
        const next = await authService.updateProfile(changes)
        setSession(next)
        return next
      },
    }),
    [session, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
