import { NavLink } from 'react-router-dom'
import { appNav } from '@/data/navigation'

interface AppNavLinksProps {
  orientation: 'vertical' | 'horizontal'
}

/** Links do app. Vertical na barra lateral (tablet/computador) e horizontal na barra inferior (celular). */
export function AppNavLinks({ orientation }: AppNavLinksProps) {
  const vertical = orientation === 'vertical'

  return (
    <ul className={vertical ? 'flex flex-col gap-1' : 'grid grid-cols-6'}>
      {appNav.map(({ label, to, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex items-center rounded-botao transition-colors duration-200 ease-suave',
                vertical ? 'gap-3 px-3.5 py-2.5 text-apoio' : 'flex-col gap-1 px-0.5 py-2 text-[0.6875rem]',
                isActive
                  ? 'bg-salvia-100 font-medium text-oliva-700'
                  : 'text-tinta-suave hover:bg-bege-100 hover:text-tinta',
              ].join(' ')
            }
          >
            {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />}
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
