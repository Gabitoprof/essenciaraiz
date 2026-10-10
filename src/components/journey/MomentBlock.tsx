import type { ReactNode } from 'react'

/** Um bloco de conteúdo dentro de um momento do dia (ex.: "Meditação breve"). */
export function MomentBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-titulo-3 font-semibold">{title}</h3>
      <div className="mt-2 flex flex-col gap-3 text-tinta">{children}</div>
    </div>
  )
}

/** Observação discreta (áudio ainda não gravado, diário em preparação). */
export function MomentNote({ children }: { children: ReactNode }) {
  return <p className="text-apoio text-tinta-suave">{children}</p>
}
