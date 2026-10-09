import { localAuthService } from './localAuthService'
import type { AuthService } from './authService'

/** Ponto único de troca: substituir por um serviço Supabase na etapa de autenticação. */
export const authService: AuthService = localAuthService

export type { AuthService } from './authService'
