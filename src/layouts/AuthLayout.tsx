import { Outlet } from 'react-router-dom'
import { RootLines } from '@/components/decor/RootLines'
import { DemoModeBanner } from '@/components/feedback/DemoModeBanner'
import { Logo } from '@/components/navigation/Logo'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'

interface AuthLayoutProps {
  /** "largo" para o onboarding, que tem mais conteúdo por tela. */
  width?: 'estreito' | 'largo'
}

/** Layout centralizado e enxuto para cadastro, login, recuperação de senha e onboarding. */
export function AuthLayout({ width = 'estreito' }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoModeBanner />
      <div className="relative isolate flex flex-1 flex-col items-center overflow-hidden bg-bege-100 px-5 py-10 sm:py-14">
        <header>
          <Logo />
        </header>
        <main id={MAIN_CONTENT_ID} className={`mt-10 w-full ${width === 'largo' ? 'max-w-xl' : 'max-w-md'}`}>
          <Outlet />
        </main>
        <RootLines className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full" />
      </div>
    </div>
  )
}
