import type { HomeContent } from '@/types/content'

/**
 * Textos da página inicial pública.
 * Conteúdo provisório: substituir pelos textos definitivos da mentoria.
 */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'Mentoria feminina Essência Raiz | Consciência',
    title: 'Seu prazer pela vida de volta em 21 dias.',
    subtitle:
      'Uma jornada guiada, um dia de cada vez, para reconectar você com o seu corpo, a sua rotina e aquilo que faz sentido para você.',
    primaryCta: 'Quero começar a jornada',
    secondaryCta: 'Já participo',
  },
  benefits: [
    {
      title: 'Uma prática por dia',
      description: 'Conteúdos curtos para encaixar na sua rotina, sem pressa e sem cobrança.',
    },
    {
      title: 'Áudios e reflexões',
      description: 'Meditações, leituras e perguntas para você se escutar com mais atenção.',
    },
    {
      title: 'Seu ritmo, seu progresso',
      description: 'Acompanhe sua evolução e registre o que muda ao longo dos 21 dias.',
    },
  ],
  closing: {
    title: 'Pronta para voltar para você?',
    text: 'Crie sua conta e comece hoje o primeiro dia da sua jornada.',
    cta: 'Criar minha conta',
  },
}
