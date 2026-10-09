import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { paths } from '@/config/routes'
import { Logo } from './Logo'

export function PublicHeader() {
  return (
    <header className="border-b border-areia-200/70">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Principal">
          <ButtonLink to={paths.login} variant="ghost">
            Entrar
          </ButtonLink>
        </nav>
      </Container>
    </header>
  )
}
