import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import { publicNav } from '@/data/navigation'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

/** Cabeçalho das páginas públicas: fixo no topo, translúcido e discreto. Menu próprio no celular. */
export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-areia-300/50 bg-branco-quente/90 backdrop-blur-md">
      <Container className="relative flex h-18 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex lg:gap-3">
          <ul className="flex items-center gap-1 lg:gap-2">
            {publicNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-botao px-3 py-2 text-apoio text-tinta-suave transition-colors hover:text-oliva-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink to={paths.login} variant="ghost" size="sm">
            Entrar
          </ButtonLink>
          <ButtonLink to={paths.signup} size="sm">
            Quero começar
          </ButtonLink>
        </nav>
        <MobileMenu />
      </Container>
    </header>
  )
}
