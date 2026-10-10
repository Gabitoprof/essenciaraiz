import { Badge } from '@/components/ui/Badge'
import type { ContentReference, EvidenceKind } from '@/types/journey'

const kindLabel: Record<EvidenceKind, string> = {
  cientifica: 'Base científica',
  filosofica: 'Reflexão filosófica',
  experiencial: 'Prática experiencial',
}

/** "Sobre as bases deste dia": separa o que vem da ciência, da filosofia e da experiência. */
export function DayReferences({ references }: { references: ContentReference[] }) {
  return (
    <section aria-labelledby="bases-titulo" className="rounded-cartao bg-bege-100 p-5 sm:p-8">
      <h2 id="bases-titulo" className="text-titulo-3 font-serif font-semibold">
        Sobre as bases deste dia
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {references.map((reference) => (
          <li key={reference.text} className="flex flex-col items-start gap-1.5">
            <Badge tone={reference.kind === 'cientifica' ? 'oliva' : 'neutro'}>{kindLabel[reference.kind]}</Badge>
            <p className="text-apoio text-tinta">{reference.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
