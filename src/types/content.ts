export interface HomeBenefit {
  title: string
  description: string
}

export interface HomeContent {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
  benefits: HomeBenefit[]
  closing: {
    title: string
    text: string
    cta: string
  }
}
