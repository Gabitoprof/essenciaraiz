import { PageHeader } from '@/components/ui/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PlaceholderNotice } from './PlaceholderNotice'

interface PlaceholderPageProps {
  title: string
  description?: string
}

/** Página provisória: já tem rota, título e layout, mas o conteúdo vem nas próximas etapas. */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  useDocumentTitle(title)
  return (
    <section>
      <PageHeader title={title} description={description} />
      <PlaceholderNotice />
    </section>
  )
}
