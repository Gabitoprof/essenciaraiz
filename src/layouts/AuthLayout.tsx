import { Outlet } from 'react-router-dom'
import { RootLines } from '@/components/decor/RootLines'
import { Logo } from '@/components/navigation/Logo'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'

/** Layout centralizado e enxuto para cadastro, login e recuperação de senha. */
export function AuthLayout() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center overflow-hidden bg-bege-100 px-5 py-10 sm:py-14">
      <Logo />
      <main id={MAIN_CONTENT_ID} className="mt-10 w-full max-w-md">
        <Outlet />
      </main>
      <RootLines className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full" />
    </div>
  )
}
