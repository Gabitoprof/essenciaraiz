import type { AudioPractice } from '@/types/library'

/**
 * Áudios da biblioteca. Nenhum arquivo foi fornecido ainda: todos estão como "pendente" e não têm player.
 * Para publicar: salve o arquivo em public/audios/, informe `src`, a duração real e troque o status para "publicado".
 */
export const audioPractices: AudioPractice[] = [
  {
    id: 'acolhimento-dia-1',
    title: 'Acolhimento: eu volto a me perceber',
    description: 'Prática da manhã do dia 1, com respiração e uma primeira pausa para perceber como você está.',
    category: 'Meditação',
    status: 'pendente',
    relatedDay: 1,
  },
  {
    id: 'relaxamento-dia-1',
    title: 'Relaxamento para encerrar o dia',
    description: 'Relaxamento noturno guiado, percorrendo o corpo e soltando o que for possível soltar.',
    category: 'Relaxamento',
    status: 'pendente',
    relatedDay: 1,
  },
  {
    id: 'escaneamento-dia-2',
    title: 'Escaneamento corporal noturno',
    description: 'Atenção a cada parte do corpo, dos pés à cabeça, para fechar o dia com gentileza.',
    category: 'Relaxamento',
    status: 'pendente',
    relatedDay: 2,
  },
  {
    id: 'ceu-e-nuvens-dia-3',
    title: 'O céu e as nuvens',
    description: 'Visualização guiada para observar os pensamentos passando, sem precisar segui-los.',
    category: 'Visualização guiada',
    status: 'pendente',
    relatedDay: 3,
  },
  {
    id: 'respiracao-lenta-guiada',
    title: 'Respiração lenta guiada',
    description: 'Alguns minutos de respiração com a expiração um pouco mais longa, para momentos de pausa.',
    category: 'Respiração',
    status: 'pendente',
  },
]
