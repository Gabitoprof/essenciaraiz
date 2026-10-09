import { useEffect } from 'react'
import { appConfig } from '@/config/app'

/** Atualiza o título da aba, importante para leitores de tela ao trocar de página. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${appConfig.name}` : appConfig.fullName
  }, [title])
}
