import { isSupabaseConfigured } from '@/config/env'

/** Deixa claro, durante o desenvolvimento, que o login ainda não é real. */
export function DevAuthNotice() {
  if (isSupabaseConfigured) return null
  return (
    <p className="mt-6 rounded-xl bg-areia-100 p-3 text-xs text-raiz-700">
      Modo de desenvolvimento: qualquer e-mail e senha entram. A autenticação real será feita com o Supabase.
    </p>
  )
}
