import { appConfig } from '@/config/app'
import type { JourneyDay, JourneyWeek } from '@/types/journey'

/**
 * Estrutura da jornada de 21 dias.
 * Os títulos, temas e conteúdos são provisórios e devem ser trocados pelo material da mentoria.
 * No futuro estes dados podem vir do Supabase sem mudar os componentes que os exibem.
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

function placeholderDay(day: number): JourneyDay {
  return {
    day,
    title: `Dia ${day}`,
    theme: 'Tema a definir',
    summary: 'Descrição provisória do dia.',
    reflectionPrompt: 'Pergunta de reflexão a definir.',
    contents: [
      { id: `dia-${day}-audio`, kind: 'audio', title: 'Áudio do dia', durationMinutes: 10 },
      { id: `dia-${day}-pratica`, kind: 'exercicio', title: 'Prática do dia' },
    ],
  }
}

export const journeyDays: JourneyDay[] = Array.from({ length: appConfig.journeyLength }, (_, index) =>
  placeholderDay(index + 1),
)

export function getJourneyDay(day: number): JourneyDay | undefined {
  return journeyDays.find((item) => item.day === day)
}
