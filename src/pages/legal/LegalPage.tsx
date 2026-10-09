import { PlaceholderPage } from '@/components/feedback/PlaceholderPage'
import { Container } from '@/components/ui/Container'

interface LegalPageProps {
  title: string
  description: string
}

/** Base das páginas institucionais. O texto jurídico definitivo ainda precisa ser fornecido. */
export function LegalPage({ title, description }: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <PlaceholderPage title={title} description={description} />
    </Container>
  )
}
