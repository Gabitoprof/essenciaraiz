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
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-raiz-700 hover:bg-areia-100"
    >
      <LogOut aria-hidden="true" className="size-5" />
      Sair
    </button>
  )
}
