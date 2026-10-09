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
                'flex items-center rounded-xl transition-colors',
                vertical ? 'gap-3 px-3 py-2.5 text-sm' : 'flex-col gap-1 px-1 py-2 text-[11px]',
                isActive ? 'bg-areia-100 font-semibold text-terra-700' : 'text-raiz-700 hover:bg-areia-100',
              ].join(' ')
            }
          >
            {Icon && <Icon aria-hidden="true" className="size-5" />}
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
