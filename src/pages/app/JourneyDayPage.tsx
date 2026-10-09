import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PlaceholderNotice } from '@/components/feedback/PlaceholderNotice'
import { PageHeader } from '@/components/ui/PageHeader'
import { paths } from '@/config/routes'
import { getJourneyDay } from '@/data/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function JourneyDayPage() {
  const { day } = useParams()
  const journeyDay = getJourneyDay(Number(day))
  useDocumentTitle(journeyDay ? journeyDay.title : 'Dia não encontrado')

  return (
    <section>
      <Link to={paths.journey} className="mb-6 inline-flex items-center gap-2 text-sm text-terra-700 hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para a jornada
      </Link>
      {journeyDay ? (
        <>
          <PageHeader title={journeyDay.title} description={journeyDay.theme} />
          <PlaceholderNotice text="Áudio, prática e reflexão do dia serão desenvolvidos nas próximas etapas." />
        </>
      ) : (
        <PageHeader title="Dia não encontrado" description="A jornada tem 21 dias. Escolha um dia na lista." />
      )}
    </section>
  )
}
