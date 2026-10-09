import type { ReactNode } from 'react'
import { Container } from './Container'

type SectionTone = 'claro' | 'bege' | 'verde'

interface SectionProps {
  children: ReactNode
  /** Âncora da seção; o espaçamento extra evita que o cabeçalho fixo cubra o título. */
  id?: string
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
export function Section({ children, id, tone = 'claro', labelledBy, className = '', containerClassName = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-18 py-secao lg:py-secao-lg ${tones[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
