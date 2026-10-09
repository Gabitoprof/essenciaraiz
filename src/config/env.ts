/**
 * Leitura centralizada das variáveis de ambiente.
 * O Supabase ainda não está configurado: enquanto as variáveis estiverem vazias,
 * o app usa o serviço de autenticação local de desenvolvimento.
 */
export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
}

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
