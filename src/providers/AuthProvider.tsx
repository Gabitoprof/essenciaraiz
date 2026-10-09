import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/services/auth'
import type { AuthSession } from '@/types/user'
import { AuthContext, type AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    authService.getSession().then((current) => {
      if (!active) return
      setSession(current)
      setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      async signIn(credentials) {
        setSession(await authService.signIn(credentials))
      },
      async signUp(data) {
        setSession(await authService.signUp(data))
      },
      async signOut() {
        await authService.signOut()
        setSession(null)
      },
      requestPasswordReset: (email) => authService.requestPasswordReset(email),
    }),
    [session, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
