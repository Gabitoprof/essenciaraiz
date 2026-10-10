import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RootLines } from '@/components/decor/RootLines'
import { homeSections, paths } from '@/config/routes'
import type { HomeContent } from '@/types/content'

export function HeroSection({ content }: { content: HomeContent['hero'] }) {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 id="hero-titulo" className="mt-5 text-display font-medium sm:text-[3.75rem] lg:text-[4.25rem]">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-tinta-suave sm:text-[1.125rem] lg:mx-0">{content.subtitle}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <ButtonLink to={paths.homeSection(homeSections.journey)}>{content.primaryCta}</ButtonLink>
            <ButtonLink to={paths.homeSection(homeSections.howItWorks)} variant="secondary">
              {content.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <EditorialImage
          src={content.image.src}
          alt={content.image.alt}
          className="mx-auto max-w-sm sm:max-w-md lg:max-w-none"
        />
      </Container>
      <RootLines className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32" />
    </section>
  )
}
