import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { paths } from '@/config/routes'
import { publicNav } from '@/data/navigation'

/**
 * Menu do celular: botão que abre um painel abaixo do cabeçalho.
 * Fecha com Esc, ao escolher um link ou ao mudar de página; devolve o foco ao botão ao fechar com Esc.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const [lastLocation, setLastLocation] = useState(location)

  // Fecha o menu quando a navegação acontece (inclusive âncoras da mesma página).
  if (location !== lastLocation) {
    setLastLocation(location)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="grid size-11 place-items-center rounded-botao text-tinta transition-colors hover:bg-salvia-100"
      >
        {isOpen ? <X aria-hidden="true" className="size-6" strokeWidth={1.5} /> : <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />}
        <span className="sr-only">{isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-areia-300/60 bg-branco-quente px-5 pb-6 pt-2 shadow-elevada"
      >
        <ul className="flex flex-col">
          {publicNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="block border-b border-areia-300/50 py-4 text-corpo text-tinta hover:text-oliva-700">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to={paths.login} className="block py-4 text-corpo text-tinta hover:text-oliva-700">
              Entrar
            </Link>
          </li>
        </ul>
        <ButtonLink to={paths.signup} fullWidth className="mt-2">
          Quero começar
        </ButtonLink>
      </div>
    </div>
  )
}
