export interface UserProfile {
  id: string
  email: string
  name: string
  onboardingCompleted: boolean
}

export interface AuthSession {
  user: UserProfile
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpData extends SignInCredentials {
  name: string
}
