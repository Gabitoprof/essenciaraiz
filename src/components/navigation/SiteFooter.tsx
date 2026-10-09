import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { appConfig } from '@/config/app'
import { legalNav } from '@/data/navigation'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-areia-200/70 py-8 text-sm text-raiz-700">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear} {appConfig.fullName}
        </p>
        <nav aria-label="Informações legais">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-terra-700 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
