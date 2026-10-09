import type { ReactNode } from 'react'

type ContainerSize = 'pagina' | 'leitura'

interface ContainerProps {
  children: ReactNode
  /** "pagina" para layouts amplos, "leitura" para blocos de texto (linhas curtas). */
  size?: ContainerSize
  className?: string
}

const sizes: Record<ContainerSize, string> = {
  pagina: 'max-w-pagina',
  leitura: 'max-w-leitura',
}

/** Container de página: largura máxima e respiro lateral consistentes em todas as telas. */
export function Container({ children, size = 'pagina', className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${sizes[size]} ${className}`}>{children}</div>
}
