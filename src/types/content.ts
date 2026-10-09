import type { LucideIcon } from 'lucide-react'

export interface DailyMoment {
  name: string
  period: string
  duration: string
  description: string
}

export interface Offering {
  title: string
  description: string
  icon: LucideIcon
}

export interface FaqItem {
  question: string
  answer: string
}

export interface HomeContent {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    /** Imagem editorial da seção principal. Sem `src`, a página mostra um espaço reservado. */
    image: { src?: string; alt: string }
  }
  welcome: {
    eyebrow: string
    title: string
    situations: string[]
    closing: string
  }
  howItWorks: {
    eyebrow: string
    title: string
    intro: string
    moments: DailyMoment[]
    note: string
  }
  journey: {
    eyebrow: string
    title: string
    intro: string
    cta: string
  }
  offerings: {
    eyebrow: string
    title: string
    items: Offering[]
  }
  faq: {
    eyebrow: string
    title: string
    items: FaqItem[]
  }
  closing: {
    title: string
    text: string
    cta: string
  }
}
