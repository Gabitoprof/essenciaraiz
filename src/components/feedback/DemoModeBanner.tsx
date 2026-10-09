import { FlaskConical } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

/**
 * Aviso fixo de que a autenticação ainda é de demonstração.
 * Some sozinho quando o Supabase estiver configurado.
 */
export function DemoModeBanner() {
  const { mode } = useAuth()
  if (mode !== 'demo') return null
  return (
    <aside aria-label="Aviso de modo demonstração" className="w-full bg-terra-700 px-4 py-2.5 text-center text-legenda tracking-normal text-branco-quente">
      <FlaskConical aria-hidden="true" className="mr-1.5 inline size-4 align-[-3px]" strokeWidth={1.5} />
      <strong className="font-semibold">Modo demonstração.</strong> Não é uma conta real: os dados ficam só neste
      navegador, a senha não é verificada nem guardada e nenhum e-mail é enviado.
    </aside>
  )
}
