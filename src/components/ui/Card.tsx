import type { HTMLAttributes } from 'react'

type CardTone = 'claro' | 'bege' | 'verde'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone
  /** Aumenta a sombra ao passar o mouse; usar quando o cartão inteiro é clicável. */
  interactive?: boolean
}

const tones: Record<CardTone, string> = {
  claro: 'bg-white/80 border-areia-300/70',
  bege: 'bg-bege-100 border-transparent',
  verde: 'bg-salvia-100 border-transparent',
}

/** Superfície base de todos os cartões: pouco ruído, borda fina e sombra quase imperceptível. */
export function Card({ tone = 'claro', interactive, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-cartao border p-5 sm:p-6',
        tones[tone],
        tone === 'claro' ? 'shadow-suave' : '',
        interactive ? 'transition-shadow duration-200 ease-suave hover:shadow-elevada' : '',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
