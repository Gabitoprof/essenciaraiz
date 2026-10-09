import { Check, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { journeyWeeks } from '@/data/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'
import type { DayStatus } from '@/types/journey'

const tileStyles: Record<DayStatus, string> = {
  concluido: 'bg-salvia-100 text-oliva-700',
  hoje: 'bg-oliva-600 text-branco-quente shadow-suave',
  disponivel: 'bg-white text-tinta ring-1 ring-areia-300 hover:ring-salvia-400',
  bloqueado: 'bg-bege-100 text-tinta-suave',
}

const statusText: Record<DayStatus, string> = {
  concluido: 'concluído',
  hoje: 'dia de hoje',
  disponivel: 'disponível',
  bloqueado: 'em breve',
}

export function JourneyPage() {
  useDocumentTitle('Jornada dos 21 dias')
  const { getDayStatus } = useJourneyProgress()

  return (
    <section>
      <PageHeader
        eyebrow="21 dias"
        title="Sua jornada"
        description="Três ciclos de sete dias. Os conteúdos ainda são provisórios."
      />
      <div className="flex flex-col gap-6">
        {journeyWeeks.map((week) => (
          <Card key={week.week}>
            <h2 className="text-titulo-2">{week.title}</h2>
            <p className="mt-1 text-apoio text-tinta-suave">{week.description}</p>
            <ol className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-7">
              {week.days.map((day) => {
                const status = getDayStatus(day)
                return (
                  <li key={day}>
                    <Link
                      to={paths.journeyDay(day)}
                      aria-label={`Dia ${day}, ${statusText[status]}`}
                      className={`relative flex aspect-square flex-col items-center justify-center rounded-botao font-serif text-titulo-3 font-semibold transition-shadow duration-200 ${tileStyles[status]}`}
                    >
                      {day}
                      {status === 'concluido' && <Check aria-hidden="true" className="absolute right-1.5 top-1.5 size-3.5" />}
                      {status === 'bloqueado' && <Lock aria-hidden="true" className="absolute right-1.5 top-1.5 size-3" />}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </Card>
        ))}
      </div>
    </section>
  )
}
