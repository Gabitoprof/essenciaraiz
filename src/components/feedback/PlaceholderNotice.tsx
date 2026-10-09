import { Sprout } from 'lucide-react'

/** Aviso usado nas páginas que ainda serão desenvolvidas nas próximas etapas. */
export function PlaceholderNotice({ text = 'Esta página será desenvolvida nas próximas etapas.' }: { text?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-areia-200 bg-areia-100/60 p-5 text-raiz-700">
      <Sprout aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-folha-600" />
      <p>{text}</p>
    </div>
  )
}
