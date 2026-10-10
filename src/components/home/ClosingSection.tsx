import { BotanicalDivider } from '@/components/decor/BotanicalDivider'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Section } from '@/components/ui/Section'
import { paths } from '@/config/routes'
import type { HomeContent } from '@/types/content'

export function ClosingSection({ content }: { content: HomeContent['closing'] }) {
  return (
    <Section labelledBy="chamada-final-titulo" containerClassName="max-w-leitura text-center">
      <BotanicalDivider className="mx-auto mb-10 max-w-xs" />
      <h2 id="chamada-final-titulo" className="text-titulo-1 sm:text-[2.75rem]">
        {content.title}
      </h2>
      <p className="mt-4 text-tinta-suave">{content.text}</p>
      <ButtonLink to={paths.signup} className="mt-10">
        {content.cta}
      </ButtonLink>
    </Section>
  )
}
