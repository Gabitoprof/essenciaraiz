import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { paths } from '@/config/routes'
import type { HomeContent } from '@/types/content'

export function HeroSection({ content }: { content: HomeContent['hero'] }) {
  return (
    <section aria-labelledby="hero-titulo" className="py-16 sm:py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-folha-600">{content.eyebrow}</p>
        <h1 id="hero-titulo" className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-raiz-700">{content.subtitle}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to={paths.signup}>{content.primaryCta}</ButtonLink>
          <ButtonLink to={paths.login} variant="secondary">
            {content.secondaryCta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
