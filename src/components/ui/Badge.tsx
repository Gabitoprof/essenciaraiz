import type { ReactNode } from 'react'

type BadgeTone = 'oliva' | 'terra' | 'neutro'

const tones: Record<BadgeTone, string> = {
  oliva: 'bg-salvia-100 text-oliva-700',
  terra: 'bg-bege-100 text-terra-700',
  neutro: 'bg-white text-tinta-suave ring-1 ring-areia-300',
}

/** Etiqueta curta para status e categorias (ex.: "Concluído", "Áudio"). */
export function Badge({ children, tone = 'oliva' }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-legenda tracking-normal font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}
