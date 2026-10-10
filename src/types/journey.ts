import type { PracticeMoment } from './progress'

export type ContentKind = 'audio' | 'texto' | 'exercicio'

/** Item da biblioteca (áudio, leitura ou prática). */
export interface JourneyContent {
  id: string
  kind: ContentKind
  title: string
  description?: string
  /** Duração aproximada em minutos. */
  durationMinutes?: number
}

/** Situação de um dia para a participante. */
export type DayStatus = 'concluido' | 'hoje' | 'disponivel' | 'bloqueado'

/** "publicado": conteúdo revisado e completo. "pendente": só a estrutura existe; nada é mostrado como finalizado. */
export type DayContentStatus = 'publicado' | 'pendente'

/** De onde vem uma ideia usada no dia, para não misturar ciência, filosofia e experiência. */
export type EvidenceKind = 'cientifica' | 'filosofica' | 'experiencial'

export interface ContentReference {
  kind: EvidenceKind
  text: string
}

/** Manhã: Despertar. Sem leitura obrigatória. */
export interface MorningContent {
  /** Texto de acolhimento ou prática guiada (roteiro do áudio, enquanto ele não existe). */
  welcome: string
  /** Passos da meditação breve. */
  meditation: string[]
  affirmation: string
  question: string
}

/** Durante o dia: Presença. */
export interface DaytimeContent {
  name: string
  instruction: string
  /** Como encaixar em uma atividade do dia a dia. */
  fitInRoutine: string
  /** Para quem não pode parar ou ficar em silêncio. */
  alternative: string
}

export type NightAudioKind = 'relaxamento' | 'visualizacao' | 'ensaio-mental'

/** Noite: Integrar. */
export interface NightContent {
  reflection: string
  integrationQuestion: string
  writingPrompt: string
  audio: {
    kind: NightAudioKind
    title: string
    /** Roteiro do áudio. Ainda não há arquivo de áudio gravado. */
    script: string
  }
}

export interface JourneyDay {
  day: number
  week: number
  title: string
  status: DayContentStatus
  theme?: string
  objective?: string
  introduction?: string
  morning?: MorningContent
  daytime?: DaytimeContent
  night?: NightContent
  /** Durações sugeridas: referências flexíveis, não obrigações. */
  durations: Record<PracticeMoment, string>
  references?: ContentReference[]
  /** Aviso de cuidado específico do dia, quando o tema pede. */
  careNote?: string
}

export interface JourneyWeek {
  week: number
  title: string
  description: string
  days: number[]
}
