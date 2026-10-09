import { Eyebrow } from '@/components/ui/Eyebrow'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  align?: 'center' | 'left'
}

/** Sobretítulo + título (+ introdução) usados no topo de cada seção da home. */
export function SectionHeading({ id, eyebrow, title, intro, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-leitura text-center' : 'max-w-leitura'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-titulo-1 sm:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-tinta-suave">{intro}</p>}
    </div>
  )
}
