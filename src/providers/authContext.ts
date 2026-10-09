import { createContext } from 'react'
import type { AuthSession, SignInCredentials, SignUpData } from '@/types/user'

export interface AuthContextValue {
  session: AuthSession | null
  isLoading: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(data: SignUpData): Promise<void>
  signOut(): Promise<void>
  requestPasswordReset(email: string): Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
