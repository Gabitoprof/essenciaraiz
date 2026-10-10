/**
 * Leitura centralizada das variáveis de ambiente públicas.
 *
 * Só entram aqui valores que o Supabase autoriza expor no navegador:
 * a URL do projeto e a chave pública (anon / publishable). A chave `service_role`
 * (ou qualquer chave secreta) NUNCA deve ir para variáveis `VITE_`, porque tudo que
 * começa com `VITE_` acaba no código enviado ao navegador.
 *
 * Enquanto as duas variáveis estiverem vazias, o app roda em modo demonstração.
 */
export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
}

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
