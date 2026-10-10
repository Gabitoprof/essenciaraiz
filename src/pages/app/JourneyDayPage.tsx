import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/feedback/EmptyState'
import { FormAlert } from '@/components/feedback/FormAlert'
import { DayMomentsContent } from '@/components/journey/DayMomentsContent'
import { DayNavigation } from '@/components/journey/DayNavigation'
import { DayReferences } from '@/components/journey/DayReferences'
import { PracticeMomentSection } from '@/components/journey/PracticeMomentSection'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { getJourneyDay, getJourneyWeek } from '@/data/journey'
import { practiceMoments } from '@/data/practiceMoments'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'

export function JourneyDayPage() {
  const { day } = useParams()
  const journeyDay = /^\d+$/.test(day ?? '') ? getJourneyDay(Number(day)) : undefined
  const progress = useJourneyProgress()
  useDocumentTitle(journeyDay ? `Dia ${journeyDay.day}: ${journeyDay.title}` : 'Dia não encontrado')

  const isReady = progress.status === 'ready'
  const isLocked = journeyDay && isReady && !progress.isDayUnlocked(journeyDay.day)
  const week = journeyDay && getJourneyWeek(journeyDay.week)
  const published = journeyDay?.status === 'publicado'

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
          headingLevel="h1"
          title="Dia não encontrado"
          description={`A jornada tem ${appConfig.journeyLength} dias. Escolha um dia na lista.`}
          action={<ButtonLink to={paths.journey}>Ver a jornada</ButtonLink>}
        />
      )}

      {journeyDay && isLocked && (
        <EmptyState
          headingLevel="h1"
          icon={<Lock aria-hidden="true" className="size-6" strokeWidth={1.5} />}
          title={`Dia ${journeyDay.day}: ${journeyDay.title}`}
          description="Este dia ainda não foi liberado. Cada dia abre quando a prática da noite (Integrar) do dia anterior é concluída. Sem pressa."
          action={<ButtonLink to={paths.journeyDay(progress.currentDay)}>Ir para o dia {progress.currentDay}</ButtonLink>}
        />
      )}

      {journeyDay && !isLocked && (
        <div className="flex flex-col gap-8">
          <header>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Eyebrow>
                Dia {journeyDay.day} de {appConfig.journeyLength}
                {week ? ` · Semana ${week.week}: ${week.title}` : ''}
              </Eyebrow>
              {isReady && journeyDay.day === progress.currentDay && <Badge>Dia atual</Badge>}
            </div>
            <h1 className="text-titulo-1 sm:text-[2.75rem]">{journeyDay.title}</h1>
            {published ? (
              <div className="mt-4 flex max-w-leitura flex-col gap-3">
                {journeyDay.theme && (
                  <p className="text-apoio text-terra-700">
                    <span className="font-medium">Tema:</span> {journeyDay.theme}
                  </p>
                )}
                {journeyDay.objective && (
                  <p className="text-apoio text-terra-700">
                    <span className="font-medium">Objetivo:</span> {journeyDay.objective}
                  </p>
                )}
                {journeyDay.introduction && <p className="text-tinta">{journeyDay.introduction}</p>}
              </div>
            ) : (
              <p className="mt-4 max-w-leitura rounded-campo border border-dashed border-areia-300 bg-bege-100/60 px-4 py-3 text-tinta-suave">
                O conteúdo deste dia ainda está em preparação. A estrutura já existe e as práticas aparecem aqui quando
                forem publicadas.
              </p>
            )}
          </header>

          {progress.error && <FormAlert>{progress.error}</FormAlert>}

          <p className="text-apoio text-tinta-suave">
            As durações são referências, não obrigações. Marque cada momento quando fizer sentido para você.
          </p>

          {practiceMoments.map((moment) => (
            <PracticeMomentSection
              key={moment.id}
              moment={moment}
              duration={journeyDay.durations[moment.id]}
              state={progress.getPracticeState(journeyDay.day, moment.id)}
              record={progress.data.days[journeyDay.day]?.[moment.id]}
              published={published}
              canAct={isReady}
              onStart={() => void progress.startPractice(journeyDay.day, moment.id)}
              onComplete={() => void progress.completePractice(journeyDay.day, moment.id)}
            >
              <DayMomentsContent day={journeyDay} moment={moment.id} />
            </PracticeMomentSection>
          ))}

          {journeyDay.references && journeyDay.references.length > 0 && (
            <DayReferences references={journeyDay.references} />
          )}

          <aside aria-label="Cuidado" className="flex gap-3 rounded-cartao border border-areia-300/70 p-5 text-apoio text-tinta-suave">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-oliva-700" strokeWidth={1.5} />
            <p>
              {journeyDay.careNote ? `${journeyDay.careNote} ` : ''}
              As meditações e visualizações da jornada são práticas de reflexão e bem-estar e não substituem acompanhamento
              profissional. Se algo trouxer desconforto intenso, pare e veja as{' '}
              <Link to={paths.safety} className="text-oliva-700 underline underline-offset-4">
                orientações de segurança
              </Link>
              .
            </p>
          </aside>

          {isReady && <DayNavigation day={journeyDay.day} isUnlocked={progress.isDayUnlocked} />}
        </div>
      )}
    </section>
  )
}
