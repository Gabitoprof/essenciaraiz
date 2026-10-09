import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import { Logo } from './Logo'

/** Cabeçalho das páginas públicas: fixo no topo, translúcido e discreto. */
export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-areia-300/50 bg-branco-quente/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-2">
          <ButtonLink to={paths.login} variant="ghost" size="sm">
            Entrar
          </ButtonLink>
          <span className="hidden sm:block">
            <ButtonLink to={paths.signup} size="sm">
              Começar a jornada
            </ButtonLink>
          </span>
        </nav>
      </Container>
    </header>
  )
}
