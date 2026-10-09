import { PlaceholderNotice } from '@/components/feedback/PlaceholderNotice'
import { DailyPracticeCard } from '@/components/journey/DailyPracticeCard'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { appConfig } from '@/config/app'
import { paths } from '@/config/routes'
import { getJourneyDay } from '@/data/journey'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useJourneyProgress } from '@/hooks/useJourneyProgress'

export function DashboardPage() {
  useDocumentTitle('Painel')
  const { session } = useAuth()
  const { completedDays, currentDay, getDayStatus } = useJourneyProgress()
  const today = getJourneyDay(currentDay)
  const firstName = session?.user.name.split(' ')[0]

  return (
    <section>
      <PageHeader
        eyebrow="Seu espaço"
        title={firstName ? `Olá, ${firstName}` : 'Olá'}
        description="Um dia de cada vez. Este é o seu lugar para voltar para você."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {today && (
          <DailyPracticeCard day={today} status={getDayStatus(today.day)} to={paths.journeyDay(today.day)} />
        )}
        <Card tone="bege" className="flex flex-col justify-center">
          <ProgressIndicator
            label="Sua jornada"
            value={completedDays.length}
            max={appConfig.journeyLength}
            valueText={`${completedDays.length} de ${appConfig.journeyLength} dias`}
            showSteps
          />
        </Card>
      </div>

      <div className="mt-10">
        <PlaceholderNotice text="Atalhos para a biblioteca, o diário e os próximos dias serão desenvolvidos nas próximas etapas." />
      </div>
    </section>
  )
}
