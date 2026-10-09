import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon?: LucideIcon
  /** Marca o item como ativo só na rota exata (útil para o painel). */
  end?: boolean
}
