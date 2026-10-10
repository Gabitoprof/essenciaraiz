import { Outlet } from 'react-router-dom'
import { DemoModeBanner } from '@/components/feedback/DemoModeBanner'
import { AppNavLinks } from '@/components/navigation/AppNavLinks'
import { Logo } from '@/components/navigation/Logo'
import { SignOutButton } from '@/components/navigation/SignOutButton'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'
import { paths } from '@/config/routes'
import { JourneyProgressProvider } from '@/providers/JourneyProgressProvider'

/**
 * Área logada.
 * Celular: cabeçalho simples (com botão de sair) + barra de navegação fixa embaixo.
 * Tablet e computador: barra lateral fixa.
 */
export function AppLayout() {
  return (
    <>
      <DemoModeBanner />
      <div className="min-h-screen md:flex">
        <aside className="hidden w-68 shrink-0 flex-col gap-10 border-r border-areia-300/60 bg-bege-100/60 px-5 py-8 md:sticky md:top-0 md:flex md:h-screen">
          <Logo to={paths.dashboard} />
          <nav aria-label="Área da participante" className="flex-1">
            <AppNavLinks orientation="vertical" />
          </nav>
          <SignOutButton />
        </aside>

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-areia-300/60 bg-branco-quente/90 px-5 backdrop-blur-md md:hidden">
          <Logo to={paths.dashboard} />
          <SignOutButton compact />
        </header>

        <main id={MAIN_CONTENT_ID} className="min-w-0 flex-1 px-5 pb-32 pt-10 sm:px-8 md:pb-16 md:pt-14 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <JourneyProgressProvider>
              <Outlet />
            </JourneyProgressProvider>
          </div>
        </main>

        <nav
          aria-label="Área da participante"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-areia-300/60 bg-branco-quente/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        >
          <AppNavLinks orientation="horizontal" />
        </nav>
      </div>
    </>
  )
}
