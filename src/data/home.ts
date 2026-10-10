import { BookOpen, Headphones, HeartHandshake, Leaf, PenLine } from 'lucide-react'
import type { HomeContent } from '@/types/content'

/**
 * Textos da página inicial pública.
 * Todo o conteúdo fica aqui, separado da apresentação: para mudar um texto, edite só este arquivo.
 * Regras editoriais: sem depoimentos, resultados, preços ou promessas clínicas inventados.
 */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'Mentoria feminina',
    title: 'Seu prazer pela vida de volta em 21 dias.',
    subtitle:
      'Uma jornada de reconexão consigo mesma, criada para mulheres que desejam viver com mais presença, reconhecer seus padrões e cultivar pequenos momentos de cuidado na rotina que já existe.',
    primaryCta: 'Conhecer a jornada',
    secondaryCta: 'Como funciona',
    image: {
      // Para usar uma foto: coloque o arquivo em /public/imagens e informe o caminho, ex.: '/imagens/hero.jpg'.
      src: undefined,
      alt: 'Mulher em um momento de pausa, em meio à natureza.',
    },
  },
  welcome: {
    eyebrow: 'Talvez você se reconheça',
    title: 'Às vezes a vida segue, e a gente fica para depois',
    situations: [
      'Os dias passam no automático, e você mal percebe o que sentiu.',
      'Você cuida de tudo e de todos, e quase sempre se coloca por último.',
      'Sente falta de um espaço só seu, mesmo que pequeno.',
      'Pequenos prazeres do dia a dia parecem ter perdido a cor.',
    ],
    closing:
      'Se algo disso faz sentido para você, a Essência Raiz é um convite para voltar a si, com calma e no seu tempo.',
  },
  howItWorks: {
    eyebrow: 'Como funciona',
    title: 'Três momentos de cuidado ao longo do dia',
    intro: 'Cada dia da jornada propõe três práticas curtas, pensadas para acompanhar o ritmo natural do seu dia.',
    moments: [
      {
        name: 'Despertar',
        period: 'Pela manhã',
        duration: '8 a 12 minutos',
        description: 'Um áudio guiado para começar o dia com intenção e presença.',
      },
      {
        name: 'Presença',
        period: 'Durante o dia',
        duration: '1 a 5 minutos',
        description: 'Uma microprática para voltar ao corpo e ao momento, onde você estiver.',
      },
      {
        name: 'Integrar',
        period: 'À noite',
        duration: '15 a 20 minutos',
        description: 'Reflexão e escrita para perceber o que o dia trouxe e acolher o que ficou.',
      },
    ],
    note: 'As práticas foram pensadas para caber na vida real. Não é preciso ter uma rotina perfeita, nem tempo sobrando: os horários são sugestões, e você pode adaptá-los ao seu dia.',
  },
  journey: {
    eyebrow: 'A jornada',
    title: '21 dias, três semanas, um caminho de volta para você',
    intro: 'Cada semana tem um tema, e os dias se constroem um sobre o outro.',
    cta: 'Quero começar',
  },
  offerings: {
    eyebrow: 'O que você vai encontrar',
    title: 'Tudo o que acompanha a sua jornada',
    items: [
      {
        title: 'Áudios guiados',
        description: 'Para começar o dia e para os momentos de pausa.',
        icon: Headphones,
      },
      {
        title: 'Micropráticas',
        description: 'Pequenos gestos de presença que cabem em poucos minutos.',
        icon: Leaf,
      },
      {
        title: 'Reflexões inspiradas em livros',
        description: 'Ideias de leituras escolhidas para provocar novos olhares.',
        icon: BookOpen,
      },
      {
        title: 'Escrita consciente',
        description: 'Um diário para registrar o que você percebe ao longo dos dias.',
        icon: PenLine,
      },
      {
        title: 'Acompanhamento pessoal',
        description: 'Um espaço para acompanhar seu caminho e o que muda em você.',
        icon: HeartHandshake,
      },
    ],
  },
  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Ficou alguma dúvida?',
    items: [
      {
        question: 'Quanto tempo dura a jornada?',
        answer:
          'A jornada tem 21 dias, organizados em três semanas. Em cada dia há três momentos de prática: pela manhã (8 a 12 minutos), durante o dia (1 a 5 minutos) e à noite (15 a 20 minutos).',
      },
      {
        question: 'Como funciona no dia a dia?',
        answer:
          'Você acessa a sua área pessoal no site, onde encontra os áudios, as micropráticas, as reflexões e o seu diário de cada dia. É só seguir o dia em que você está.',
      },
      {
        question: 'E se eu não conseguir praticar todos os momentos?',
        answer:
          'Tudo bem. As práticas foram pensadas para a vida real, e os horários são apenas sugestões. A proposta é cultivar pequenos momentos de cuidado, não cumprir uma rotina perfeita.',
      },
      {
        question: 'A mentoria substitui terapia ou acompanhamento médico?',
        answer:
          'Não. A Essência Raiz tem natureza educativa e reflexiva, e não substitui acompanhamento psicológico, médico ou terapêutico. Se você estiver passando por um momento difícil, procure um profissional de saúde.',
      },
      {
        question: 'Vou sair transformada em 21 dias?',
        answer:
          'Cada pessoa vive a jornada de um jeito, e não há resultado garantido. Os 21 dias são um convite para observar, experimentar e cuidar de si com mais presença.',
      },
    ],
  },
  closing: {
    title: 'Que tal começar por você?',
    text: 'Um dia de cada vez, no seu ritmo. Crie sua conta e dê o primeiro passo da sua jornada.',
    cta: 'Quero começar',
  },
}
