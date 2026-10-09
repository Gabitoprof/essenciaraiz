import { Outlet } from 'react-router-dom'
import { AppNavLinks } from '@/components/navigation/AppNavLinks'
import { Logo } from '@/components/navigation/Logo'
import { SignOutButton } from '@/components/navigation/SignOutButton'
import { MAIN_CONTENT_ID } from '@/components/navigation/SkipLink'
import { paths } from '@/config/routes'

/**
 * Área logada.
 * Celular: cabeçalho simples + barra de navegação fixa embaixo.
 * Tablet e computador: barra lateral fixa.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden w-64 shrink-0 flex-col gap-8 border-r border-areia-200 bg-white px-4 py-6 md:sticky md:top-0 md:flex md:h-screen">
        <Logo to={paths.dashboard} />
        <nav aria-label="Área da participante" className="flex-1">
          <AppNavLinks orientation="vertical" />
        </nav>
        <SignOutButton />
      </aside>

      <header className="flex h-14 items-center border-b border-areia-200 bg-white px-4 md:hidden">
        <Logo to={paths.dashboard} />
      </header>

      <main id={MAIN_CONTENT_ID} className="flex-1 px-4 pb-28 pt-8 sm:px-6 md:pb-12 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      <nav
        aria-label="Área da participante"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-areia-200 bg-white/95 backdrop-blur md:hidden"
      >
        <AppNavLinks orientation="horizontal" />
      </nav>
    </div>
  )
}
