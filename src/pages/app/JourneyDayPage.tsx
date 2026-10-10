import { ArrowLeft, Lock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/feedback/EmptyState'
import { FormAlert } from '@/components/feedback/FormAlert'
import { PracticeMomentSection } from '@/components/journey/PracticeMomentSection'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageHeader } from '@/components/ui/PageHeader'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { getJourneyDay } from '@/data/journey'
import { practiceMoments } from '@/data/practiceMoments'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'

export function JourneyDayPage() {
  const { day } = useParams()
  const journeyDay = getJourneyDay(Number(day))
  const progress = useJourneyProgress()
  useDocumentTitle(journeyDay ? `Dia ${journeyDay.day}` : 'Dia não encontrado')

  const isReady = progress.status === 'ready'
  const isLocked = journeyDay && isReady && !progress.isDayUnlocked(journeyDay.day)

  return (
    <section>
      <Link
        to={paths.journey}
        className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para a jornada
      </Link>

      {!journeyDay && (
        <EmptyState
          title="Dia não encontrado"
          description={`A jornada tem ${appConfig.journeyLength} dias. Escolha um dia na lista.`}
          action={<ButtonLink to={paths.journey}>Ver a jornada</ButtonLink>}
        />
      )}

      {journeyDay && isLocked && (
        <EmptyState
          icon={<Lock aria-hidden="true" className="size-6" strokeWidth={1.5} />}
          title={`O dia ${journeyDay.day} ainda não foi liberado`}
          description="Cada dia abre quando a prática da noite (Integrar) do dia anterior é concluída. Sem pressa."
          action={<ButtonLink to={paths.journeyDay(progress.currentDay)}>Ir para o dia {progress.currentDay}</ButtonLink>}
        />
      )}

      {journeyDay && !isLocked && (
        <>
          <PageHeader
            eyebrow={`Dia ${journeyDay.day} de ${appConfig.journeyLength}`}
            title={journeyDay.theme}
            description={journeyDay.summary}
          />
          {progress.error && (
            <div className="mb-6">
              <FormAlert>{progress.error}</FormAlert>
            </div>
          )}
          <div className="flex flex-col gap-6">
            {practiceMoments.map((moment) => (
              <PracticeMomentSection
                key={moment.id}
                moment={moment}
                state={progress.getPracticeState(journeyDay.day, moment.id)}
                record={progress.data.days[journeyDay.day]?.[moment.id]}
                canAct={isReady}
                onStart={() => void progress.startPractice(journeyDay.day, moment.id)}
                onComplete={() => void progress.completePractice(journeyDay.day, moment.id)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
