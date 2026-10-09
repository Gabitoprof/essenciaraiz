import type { ReactNode } from 'react'
import { Container } from './Container'

type SectionTone = 'claro' | 'bege' | 'verde'

interface SectionProps {
  children: ReactNode
  tone?: SectionTone
  labelledBy?: string
  className?: string
  containerClassName?: string
}

const tones: Record<SectionTone, string> = {
  claro: 'bg-branco-quente',
  bege: 'bg-bege-100',
  verde: 'bg-salvia-100',
}

/** Faixa de página com espaçamento vertical padrão e fundo da paleta. */
export function Section({ children, tone = 'claro', labelledBy, className = '', containerClassName = '' }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={`py-secao lg:py-secao-lg ${tones[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
