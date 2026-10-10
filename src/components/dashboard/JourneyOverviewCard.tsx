import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { dashboardTexts } from '@/data/dashboard'
import { getJourneyDay } from '@/data/journey'
import { getPracticeMoment } from '@/data/practiceMoments'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'

/** Cartão principal do painel: dia atual, tema, progresso real e o botão para continuar. */
export function JourneyOverviewCard() {
  const { currentDay, completedDays, completedPractices, hasActivity, resumeTarget } = useJourneyProgress()
  const day = getJourneyDay(currentDay)
  const totalPractices = appConfig.journeyLength * 3
  const finished = completedDays.length === appConfig.journeyLength

  let resumeText = dashboardTexts.firstVisit
  if (finished) resumeText = dashboardTexts.journeyFinished
  else if (resumeTarget.inProgress && resumeTarget.moment)
    resumeText = `Você parou em ${getPracticeMoment(resumeTarget.moment).name}, no dia ${resumeTarget.day}. Pode retomar quando quiser.`
  else if (!resumeTarget.moment) resumeText = dashboardTexts.allDoneToday
  else if (hasActivity) resumeText = `Próximo passo: ${getPracticeMoment(resumeTarget.moment).name}, no dia ${resumeTarget.day}.`

  const resumeTo = finished
    ? paths.journey
    : `${paths.journeyDay(resumeTarget.day)}${resumeTarget.moment ? `#${resumeTarget.moment}` : ''}`

  return (
    <Card tone="verde" className="flex flex-col gap-6 sm:p-8">
      <div>
        <p className="text-legenda font-medium uppercase text-oliva-700">
          Dia {currentDay} de {appConfig.journeyLength}
        </p>
        <h2 id="dia-atual-titulo" className="mt-1 text-titulo-1">
          {day?.theme ?? `Dia ${currentDay}`}
        </h2>
        {day && <p className="mt-2 max-w-leitura text-tinta-suave">{day.summary}</p>}
      </div>

      <div>
        <ProgressIndicator
          label="Sua jornada"
          value={completedDays.length}
          max={appConfig.journeyLength}
          valueText={`${completedDays.length} de ${appConfig.journeyLength} dias concluídos`}
          showSteps
        />
        <p className="mt-3 text-apoio text-tinta-suave">
          {completedPractices === 1 ? '1 prática concluída' : `${completedPractices} práticas concluídas`} de {totalPractices}.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-oliva-600/15 pt-6">
        <p className="text-tinta">{resumeText}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink to={resumeTo} className="sm:self-start">
            {finished ? 'Rever a jornada' : 'Continuar minha jornada'}
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
          {!finished && (
            <Link to={paths.journey} className="text-apoio text-oliva-700 underline underline-offset-4 hover:text-oliva-600">
              Ver todos os dias
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
