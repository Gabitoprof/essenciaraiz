import { Link } from 'react-router-dom'
import { BotanicalDivider } from '@/components/decor/BotanicalDivider'
import { Container } from '@/components/ui/Container'
import { appConfig } from '@/config/app'
import { legalNav } from '@/data/navigation'
import { Logo } from './Logo'

const currentYear = new Date().getFullYear()

/** Rodapé das páginas públicas. */
export function SiteFooter() {
  return (
    <footer className="bg-bege-100 pb-10 pt-14 text-apoio text-tinta-suave">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4">Seu prazer pela vida de volta em 21 dias.</p>
          </div>
          <nav aria-label="Informações e contato">
            <ul className="flex flex-col gap-3">
              {legalNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-oliva-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <BotanicalDivider className="my-8" />
        <p className="text-legenda tracking-normal">
          © {currentYear} {appConfig.fullName}. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  )
}
