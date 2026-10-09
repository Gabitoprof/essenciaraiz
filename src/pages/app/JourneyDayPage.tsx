import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/feedback/EmptyState'
import { PlaceholderNotice } from '@/components/feedback/PlaceholderNotice'
import { ContentCard } from '@/components/journey/ContentCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
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
      <Link
        to={paths.journey}
        className="mb-8 inline-flex items-center gap-2 text-apoio text-oliva-700 underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para a jornada
      </Link>
      {journeyDay ? (
        <>
          <PageHeader eyebrow={`Dia ${journeyDay.day} de 21`} title={journeyDay.theme} description={journeyDay.summary} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {journeyDay.contents.map((content) => (
              <li key={content.id}>
                <ContentCard content={content} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <PlaceholderNotice text="O player de áudio, a prática guiada e a reflexão do dia serão desenvolvidos nas próximas etapas." />
          </div>
        </>
      ) : (
        <EmptyState
          title="Dia não encontrado"
          description="A jornada tem 21 dias. Escolha um dia na lista."
          action={<ButtonLink to={paths.journey}>Ver a jornada</ButtonLink>}
        />
      )}
    </section>
  )
}
