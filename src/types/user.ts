/** De onde vem a sessão: Supabase Auth (real) ou modo demonstração (local, sem segurança). */
export type AuthMode = 'supabase' | 'demo'

export type Availability = 'manha' | 'tarde' | 'noite' | 'varia'

/** Respostas do onboarding. Todas opcionais: a participante pode pular. */
export interface ParticipantPreferences {
  preferredName?: string
  intention?: string
  availability?: Availability
}

export interface UserProfile {
  id: string
  email: string
  displayName: string
  onboardingCompleted: boolean
  preferences: ParticipantPreferences
}

export interface AuthSession {
  user: UserProfile
  mode: AuthMode
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpData extends SignInCredentials {
  displayName: string
}

export interface SignUpResult {
  /** Nulo quando o Supabase exige confirmação de e-mail antes da primeira entrada. */
  session: AuthSession | null
  needsEmailConfirmation: boolean
}

export type ProfileChanges = Partial<Pick<UserProfile, 'displayName' | 'onboardingCompleted' | 'preferences'>>
