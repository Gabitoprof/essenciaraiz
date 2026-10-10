import type { JourneyDay, JourneyWeek } from '@/types/journey'
import { dia01 } from './days/dia-01'
import { dia02 } from './days/dia-02'
import { dia03 } from './days/dia-03'
import { DEFAULT_DURATIONS } from './shared'

/**
 * Jornada de 21 dias: um único modelo de página (JourneyDayPage) alimentado por estes dados.
 * Dias com status "pendente" só têm número, semana e título; a página mostra que o conteúdo está em preparação.
 * Para publicar um dia: crie days/dia-XX.ts no formato de dia-01.ts e troque a linha dele abaixo.
 */
export const journeyWeeks: JourneyWeek[] = [
  {
    week: 1,
    title: 'Voltar para si',
    description: 'Desacelerar, perceber o corpo e reconhecer, com gentileza, como você está hoje.',
    days: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    week: 2,
    title: 'Cultivar novas possibilidades',
    description: 'Observar seus padrões sem julgamento e experimentar pequenas escolhas diferentes.',
    days: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    week: 3,
    title: 'Florescer com autonomia',
    description: 'Integrar o que fez sentido e levar esses momentos de cuidado para a sua rotina.',
    days: [15, 16, 17, 18, 19, 20, 21],
  },
]

function pendingDay(day: number, title: string): JourneyDay {
  return { day, week: Math.ceil(day / 7), title, status: 'pendente', durations: DEFAULT_DURATIONS }
}

export const journeyDays: JourneyDay[] = [
  dia01,
  dia02,
  dia03,
  pendingDay(4, 'Eu reconheço meus padrões'),
  pendingDay(5, 'Eu posso experimentar uma nova resposta'),
  pendingDay(6, 'Eu treino minha presença'),
  pendingDay(7, 'Eu escolho o que quero cultivar'),
  pendingDay(8, 'Começar pequeno'),
  pendingDay(9, 'Meu ambiente pode me ajudar'),
  pendingDay(10, 'Eu posso mudar minha linguagem interna'),
  pendingDay(11, 'Eu vivo meus valores'),
  pendingDay(12, 'Eu me permito receber'),
  pendingDay(13, 'Eu posso colocar limites'),
  pendingDay(14, 'Eu reconheço minhas conquistas'),
  pendingDay(15, 'O que está sob meu controle?'),
  pendingDay(16, 'Eu não preciso ser perfeita'),
  pendingDay(17, 'Eu escolho o que me traz vida'),
  pendingDay(18, 'Eu cuido da minha energia'),
  pendingDay(19, 'Eu cultivo o futuro que desejo'),
  pendingDay(20, 'Eu honro minhas raízes'),
  pendingDay(21, 'Eu escolho continuar florescendo'),
]

export function getJourneyDay(day: number): JourneyDay | undefined {
  return journeyDays.find((item) => item.day === day)
}

export function getJourneyWeek(week: number): JourneyWeek | undefined {
  return journeyWeeks.find((item) => item.week === week)
}

/** Um momento só pode ser marcado quando o dia tem conteúdo publicado. */
export function isDayPublished(day: number): boolean {
  return getJourneyDay(day)?.status === 'publicado'
}
