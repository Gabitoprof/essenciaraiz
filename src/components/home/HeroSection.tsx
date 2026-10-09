import { RootLines } from '@/components/decor/RootLines'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { paths } from '@/config/routes'
import type { HomeContent } from '@/types/content'

export function HeroSection({ content }: { content: HomeContent['hero'] }) {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden pb-28 pt-16 sm:pb-36 sm:pt-24">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-salvia-100/70 blur-3xl sm:size-[36rem]"
      />
      <Container size="leitura" className="text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h1 id="hero-titulo" className="mt-5 text-display font-medium sm:text-[3.75rem] lg:text-[4.5rem]">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[34rem] text-tinta-suave sm:text-[1.125rem]">{content.subtitle}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to={paths.signup}>{content.primaryCta}</ButtonLink>
          <ButtonLink to={paths.login} variant="secondary">
            {content.secondaryCta}
          </ButtonLink>
        </div>
      </Container>
      <RootLines className="absolute inset-x-0 bottom-0 -z-10 h-28 w-full sm:h-36" />
    </section>
  )
}
