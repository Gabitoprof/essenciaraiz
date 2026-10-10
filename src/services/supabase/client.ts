import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

/**
 * Cliente Supabase único do app (autenticação, perfil, progresso e diário usam o mesmo).
 * Só a URL e a chave pública (anon / publishable) entram aqui. O acesso aos dados é
 * limitado no banco pelo Row Level Security, não por este código.
 *
 * Este módulo só é importado sob demanda, quando o Supabase está configurado.
 */
let client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  client ??= createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Lê a sessão que volta nos links de confirmação e de recuperação de senha.
      detectSessionInUrl: true,
    },
  })
  return client
}

/** Erro devolvido pelo PostgREST ou pela rede. */
export interface DatabaseErrorLike {
  code?: string
  message?: string
}

/** A tabela ainda não existe no projeto (migrations não aplicadas). */
export function isMissingTable(error: DatabaseErrorLike | null | undefined) {
  return error?.code === 'PGRST205' || error?.code === '42P01'
}

/** Falha de conexão (sem internet, servidor fora do ar). */
export function isNetworkError(error: unknown) {
  if (error instanceof TypeError) return true
  const message = (error as DatabaseErrorLike | null)?.message ?? ''
  return /fetch|network|Failed to fetch|Load failed/i.test(message)
}
