import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'

export function SignOutButton() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleClick() {
    await signOut()
    navigate(paths.home)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-botao px-3.5 py-2.5 text-apoio text-tinta-suave transition-colors hover:bg-bege-100 hover:text-tinta"
    >
      <LogOut aria-hidden="true" className="size-5" strokeWidth={1.5} />
      Sair
    </button>
  )
}
