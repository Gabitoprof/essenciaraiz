import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import type { HomeContent } from '@/types/content'

export function ClosingSection({ content }: { content: HomeContent['closing'] }) {
  return (
    <section aria-labelledby="chamada-final-titulo" className="py-16 sm:py-20">
      <Container className="max-w-2xl rounded-3xl bg-areia-100 px-6 py-12 text-center sm:px-10">
        <h2 id="chamada-final-titulo" className="text-3xl font-semibold">
          {content.title}
        </h2>
        <p className="mt-3 text-raiz-700">{content.text}</p>
        <ButtonLink to={paths.signup} className="mt-8">
          {content.cta}
        </ButtonLink>
      </Container>
    </section>
  )
}
