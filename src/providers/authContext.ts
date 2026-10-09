import { createContext } from 'react'
import type {
  AuthMode,
  AuthSession,
  ProfileChanges,
  SignInCredentials,
  SignUpData,
  SignUpResult,
} from '@/types/user'

export interface AuthContextValue {
  /** 'demo' enquanto o Supabase não estiver configurado. */
  mode: AuthMode
  session: AuthSession | null
  /** Verdadeiro enquanto a sessão salva ainda está sendo verificada. */
  isLoading: boolean
  signUp(data: SignUpData): Promise<SignUpResult>
  signIn(credentials: SignInCredentials): Promise<AuthSession>
  signOut(): Promise<void>
  requestPasswordReset(email: string): Promise<void>
  updatePassword(newPassword: string): Promise<void>
  updateProfile(changes: ProfileChanges): Promise<AuthSession>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
