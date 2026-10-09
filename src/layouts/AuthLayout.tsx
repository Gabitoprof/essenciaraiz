import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/navigation/Logo'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'

/** Layout centralizado e enxuto para cadastro, login e recuperação de senha. */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-areia-100 px-4 py-10">
      <Logo />
      <main id={MAIN_CONTENT_ID} className="mt-8 w-full max-w-md">
        <Outlet />
      </main>
    </div>
  )
}
