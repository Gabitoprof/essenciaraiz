import { Info } from 'lucide-react'
import { JourneyOverviewCard } from '@/components/dashboard/JourneyOverviewCard'
import { ShortcutCard } from '@/components/dashboard/ShortcutCard'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PracticeMomentCard } from '@/components/journey/PracticeMomentCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { dashboardShortcuts, dashboardTexts } from '@/data/dashboard'
import { isDayPublished } from '@/data/journey'
import { practiceMoments } from '@/data/practiceMoments'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'

export function DashboardPage() {
  useDocumentTitle('Painel')
  const { session } = useAuth()
  const progress = useJourneyProgress()
  const user = session?.user
  const firstName = (user?.preferences.preferredName || user?.displayName || '').trim().split(' ')[0]

  return (
    <section>
      <PageHeader
        eyebrow={dashboardTexts.eyebrow}
        title={firstName ? `Olá, ${firstName}` : 'Olá'}
        description={dashboardTexts.welcome}
      />

      {progress.status === 'loading' && <LoadingState title="Carregando sua jornada…" />}

      {progress.status === 'error' && (
        <ErrorState description={progress.error ?? undefined} onRetry={progress.reload} />
      )}

      {progress.status === 'ready' && (
        <div className="flex flex-col gap-12">
          <JourneyOverviewCard />

          <section aria-labelledby="praticas-titulo">
            <h2 id="praticas-titulo" className="text-titulo-2">
              Práticas do dia {progress.currentDay}
            </h2>
            <p className="mt-1 text-apoio text-tinta-suave">
              As durações são referências, não obrigações. Faça no seu ritmo, na ordem que funcionar para você.
            </p>
            <ul className="mt-6 grid gap-4 xl:grid-cols-3">
              {practiceMoments.map((moment) => (
                <li key={moment.id}>
                  <PracticeMomentCard
                    moment={moment}
                    day={progress.currentDay}
                    state={progress.getPracticeState(progress.currentDay, moment.id)}
                    to={`${paths.journeyDay(progress.currentDay)}#${moment.id}`}
                    published={isDayPublished(progress.currentDay)}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="areas-titulo">
            <h2 id="areas-titulo" className="text-titulo-2">
              Outras áreas
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {dashboardShortcuts.map((shortcut) => (
                <li key={shortcut.to}>
                  <ShortcutCard {...shortcut} />
                </li>
              ))}
            </ul>
          </section>

          {progress.storage === 'local' && (
            <p className="flex gap-2.5 text-apoio text-tinta-suave">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {dashboardTexts.localStorageNote}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
