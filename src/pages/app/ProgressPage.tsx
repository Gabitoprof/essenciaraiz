import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { dashboardTexts } from '@/data/dashboard'
import { getJourneyDay, journeyWeeks } from '@/data/journey'
import { practiceMoments } from '@/data/practiceMoments'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'
import type { PracticeMoment } from '@/types/progress'
import { formatDateTime } from '@/utils/dates'

const RECENT_LIMIT = 8

/** O caminho já percorrido: números gerais, semanas e as últimas práticas concluídas. Só mostra o que foi registrado. */
export function ProgressPage() {
  useDocumentTitle('Minha evolução')
  const progress = useJourneyProgress()

  const header = (
    <PageHeader
      eyebrow="Seu caminho"
      title="Minha evolução"
      description="O que você já viveu na jornada. Não é uma nota: cada prática conta, no seu ritmo."
    />
  )

  if (progress.status === 'loading') return <section>{header}<LoadingState title="Carregando o seu caminho…" /></section>
  if (progress.status === 'error') {
    return (
      <section>
        {header}
        <ErrorState description={progress.error ?? undefined} onRetry={progress.reload} />
      </section>
    )
  }

  const completed = new Set(progress.completedDays)
  const recent = Object.entries(progress.data.days)
    .flatMap(([day, record]) =>
      Object.entries(record).flatMap(([moment, practice]) =>
        practice?.state === 'concluido' && practice.completedAt
          ? [{ day: Number(day), moment: moment as PracticeMoment, at: practice.completedAt }]
          : [],
      ),
    )
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, RECENT_LIMIT)

  const stats = [
    { value: progress.completedDays.length, label: `de ${appConfig.journeyLength} dias concluídos` },
    { value: progress.completedPractices, label: `de ${appConfig.journeyLength * 3} práticas concluídas` },
    { value: progress.currentDay, label: 'é o seu dia atual' },
  ]

  return (
    <section>
      {header}

      {!progress.hasActivity ? (
        <Card className="text-center">
          <p className="text-tinta-suave">
            Ainda não há práticas registradas. Quando você iniciar ou concluir uma prática, ela aparece aqui.
          </p>
          <div className="mt-6">
            <ButtonLink to={paths.journeyDay(1)}>Começar pelo dia 1</ButtonLink>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-8">
          <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {stats.map((stat) => (
              <li key={stat.label}>
                <Card className="h-full">
                  <p className="font-serif text-[2.5rem] leading-none font-semibold text-oliva-700">{stat.value}</p>
                  <p className="mt-2 text-apoio text-tinta-suave">{stat.label}</p>
                </Card>
              </li>
            ))}
          </ul>

          <Card>
            <h2 className="text-titulo-2">Semanas</h2>
            <ul className="mt-5 flex flex-col gap-5">
              {journeyWeeks.map((week) => {
                const done = week.days.filter((day) => completed.has(day)).length
                return (
                  <li key={week.week}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">
                        Semana {week.week}: {week.title}
                      </p>
                      <p className="text-apoio text-tinta-suave">
                        {done} de {week.days.length} dias
                      </p>
                    </div>
                    <div
                      className="mt-2 h-2 overflow-hidden rounded-full bg-bege-100"
                      role="progressbar"
                      aria-label={`Semana ${week.week}`}
                      aria-valuemin={0}
                      aria-valuemax={week.days.length}
                      aria-valuenow={done}
                    >
                      <div className="h-full rounded-full bg-oliva-600" style={{ width: `${(done / week.days.length) * 100}%` }} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card>
            <h2 className="text-titulo-2">Últimas práticas concluídas</h2>
            {recent.length === 0 ? (
              <p className="mt-3 text-tinta-suave">Você já começou. Assim que concluir uma prática, ela aparece aqui.</p>
            ) : (
              <ol className="mt-4 divide-y divide-areia-300/60">
                {recent.map((item) => {
                  const moment = practiceMoments.find((entry) => entry.id === item.moment)
                  return (
                    <li key={`${item.day}-${item.moment}`} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                      <Link
                        to={`${paths.journeyDay(item.day)}#${item.moment}`}
                        className="underline-offset-4 hover:underline"
                      >
                        Dia {item.day} · {moment?.name ?? item.moment}
                        <span className="text-tinta-suave"> · {getJourneyDay(item.day)?.title}</span>
                      </Link>
                      <span className="text-apoio text-tinta-suave">{formatDateTime(item.at)}</span>
                    </li>
                  )
                })}
              </ol>
            )}
          </Card>
        </div>
      )}

      {progress.storage === 'local' && (
        <p className="mt-10 flex gap-2.5 text-apoio text-tinta-suave">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {dashboardTexts.localStorageNote}
        </p>
      )}
    </section>
  )
}
