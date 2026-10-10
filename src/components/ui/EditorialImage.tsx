import { LeafMark } from '@/components/decor/LeafMark'
import { publicAsset } from '@/utils/baseUrl'

interface EditorialImageProps {
  /** Caminho da foto. Sem foto, mostra um espaço reservado com a mesma proporção. */
  src?: string
  alt: string
  className?: string
}

/**
 * Imagem editorial com cantos suaves e proporção fixa (4:5).
 * Enquanto não houver fotografia, exibe uma composição botânica discreta no lugar,
 * escondida de leitores de tela por ser apenas decorativa.
 */
export function EditorialImage({ src, alt, className = '' }: EditorialImageProps) {
  const frame = `relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] ${className}`

  if (src) {
    return (
      <div className={frame}>
        <img src={publicAsset(src)} alt={alt} loading="eager" className="size-full object-cover" />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      data-placeholder="imagem-editorial"
      className={`${frame} bg-gradient-to-br from-salvia-100 via-bege-100 to-areia-300/70`}
    >
      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-salvia-400/25 blur-2xl" />
      <div className="absolute -bottom-20 -left-10 size-72 rounded-full bg-branco-quente/70 blur-2xl" />
      <LeafMark className="absolute bottom-10 right-10 size-28 text-oliva-600/35" />
      <LeafMark className="absolute left-10 top-12 size-12 -rotate-12 text-terra-600/30" />
    </div>
  )
}
