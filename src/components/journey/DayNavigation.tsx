import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { getJourneyDay } from '@/data/journey'

interface DayNavigationProps {
  day: number
  isUnlocked(day: number): boolean
}

const linkClasses =
  'flex min-h-12 flex-1 items-center gap-3 rounded-botao border border-areia-300/80 bg-white/70 px-4 py-3 text-apoio transition-colors duration-200 hover:border-salvia-400 hover:bg-salvia-100'

/** Dia anterior e próximo. O próximo só aparece como link quando já foi liberado. */
export function DayNavigation({ day, isUnlocked }: DayNavigationProps) {
  const previous = day > 1 ? getJourneyDay(day - 1) : undefined
  const next = day < appConfig.journeyLength ? getJourneyDay(day + 1) : undefined

  return (
    <nav aria-label="Navegação entre os dias" className="flex flex-col gap-3 sm:flex-row">
      {previous ? (
        <Link to={paths.journeyDay(previous.day)} className={linkClasses}>
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-oliva-700" />
          <span>
            <span className="block text-legenda uppercase text-terra-600">Dia {previous.day}</span>
            {previous.title}
          </span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next &&
        (isUnlocked(next.day) ? (
          <Link to={paths.journeyDay(next.day)} className={`${linkClasses} justify-end text-right`}>
            <span>
              <span className="block text-legenda uppercase text-terra-600">Dia {next.day}</span>
              {next.title}
            </span>
            <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-oliva-700" />
          </Link>
        ) : (
          <p className="flex flex-1 items-center justify-end px-4 py-3 text-right text-apoio text-tinta-suave">
            O dia {next.day} abre quando você concluir a prática Integrar deste dia.
          </p>
        ))}
    </nav>
  )
}
