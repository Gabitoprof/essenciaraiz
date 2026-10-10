import { Check, ChevronRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { getJourneyDay, journeyWeeks } from '@/data/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'
import type { DayStatus } from '@/types/journey'

const numberStyles: Record<DayStatus, string> = {
  concluido: 'bg-salvia-100 text-oliva-700',
  hoje: 'bg-oliva-600 text-branco-quente',
  disponivel: 'bg-white text-tinta ring-1 ring-areia-300',
  bloqueado: 'bg-bege-100 text-tinta-suave',
}

const statusText: Record<DayStatus, string> = {
  concluido: 'Concluído',
  hoje: 'Dia atual',
  disponivel: 'Disponível',
  bloqueado: 'Ainda não liberado',
}

export function JourneyPage() {
  useDocumentTitle('Jornada dos 21 dias')
  const { getDayStatus, status } = useJourneyProgress()
  const isReady = status === 'ready'

  return (
    <section>
      <PageHeader
        eyebrow="21 dias"
        title="Sua jornada"
        description="Três semanas, um dia de cada vez. Cada dia abre quando a prática da noite do dia anterior é concluída."
      />
      <div className="flex flex-col gap-6">
        {journeyWeeks.map((week) => (
          <Card key={week.week}>
            <Eyebrow>Semana {week.week}</Eyebrow>
            <h2 className="mt-1 text-titulo-2">{week.title}</h2>
            <p className="mt-1 text-apoio text-tinta-suave">{week.description}</p>
            <ol className="mt-6 flex flex-col gap-2">
              {week.days.map((dayNumber) => {
                const day = getJourneyDay(dayNumber)
                if (!day) return null
                const dayStatus = isReady ? getDayStatus(dayNumber) : 'bloqueado'
                return (
                  <li key={dayNumber}>
                    <Link
                      to={paths.journeyDay(dayNumber)}
                      className={`flex items-center gap-4 rounded-botao px-2 py-2 transition-colors duration-200 hover:bg-bege-100 ${dayStatus === 'hoje' ? 'bg-salvia-100/60' : ''}`}
                    >
                      <span
                        className={`relative grid size-11 shrink-0 place-items-center rounded-full font-serif text-titulo-3 font-semibold ${numberStyles[dayStatus]}`}
                        aria-hidden="true"
                      >
                        {dayNumber}
                        {dayStatus === 'concluido' && <Check className="absolute -right-0.5 -top-0.5 size-4 rounded-full bg-oliva-600 p-0.5 text-branco-quente" />}
                        {dayStatus === 'bloqueado' && <Lock className="absolute -right-0.5 -top-0.5 size-4 rounded-full bg-white p-0.5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="sr-only">Dia {dayNumber}: </span>
                        <span className="block text-tinta">{day.title}</span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-2 text-legenda tracking-normal text-tinta-suave">
                          {isReady && statusText[dayStatus]}
                          {day.status === 'pendente' && <Badge tone="terra">Em preparação</Badge>}
                        </span>
                      </span>
                      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-tinta-suave" />
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
