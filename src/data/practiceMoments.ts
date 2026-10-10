import { Moon, Sun, Wind, type LucideIcon } from 'lucide-react'
import type { PracticeMoment } from '@/types/progress'

export interface PracticeMomentInfo {
  id: PracticeMoment
  name: string
  period: string
  /** Referência flexível, não obrigação. */
  duration: string
  description: string
  icon: LucideIcon
}

/** Os três momentos do dia, na ordem em que acontecem. */
export const practiceMoments: PracticeMomentInfo[] = [
  {
    id: 'despertar',
    name: 'Despertar',
    period: 'Manhã',
    duration: '8 a 12 min',
    description: 'Um começo de dia com acolhimento, presença e intenção.',
    icon: Sun,
  },
  {
    id: 'presenca',
    name: 'Presença',
    period: 'Durante o dia',
    duration: '1 a 5 min',
    description: 'Uma microprática simples para encaixar na rotina.',
    icon: Wind,
  },
  {
    id: 'integrar',
    name: 'Integrar',
    period: 'Noite',
    duration: '15 a 20 min',
    description: 'Reflexão, escrita e relaxamento para fechar o dia.',
    icon: Moon,
  },
]

export function getPracticeMoment(id: PracticeMoment): PracticeMomentInfo {
  return practiceMoments.find((moment) => moment.id === id) ?? practiceMoments[0]
}
