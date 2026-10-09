import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'

/** Encerra a sessão e volta para a página inicial. `compact` mostra só o ícone (cabeçalho do celular). */
export function SignOutButton({ compact = false }: { compact?: boolean }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleClick() {
    setIsSigningOut(true)
    try {
      await signOut()
    } finally {
      navigate(paths.home, { replace: true })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSigningOut}
      className={[
        'flex items-center gap-3 rounded-botao text-apoio text-tinta-suave transition-colors hover:bg-bege-100 hover:text-tinta disabled:opacity-60',
        compact ? 'size-11 justify-center' : 'w-full px-3.5 py-2.5',
      ].join(' ')}
    >
      <LogOut aria-hidden="true" className="size-5" strokeWidth={1.5} />
      <span className={compact ? 'sr-only' : undefined}>{isSigningOut ? 'Saindo…' : 'Sair'}</span>
    </button>
  )
}
