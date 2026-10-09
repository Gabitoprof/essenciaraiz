import { BookHeart, Headphones, Home, LineChart, Map, UserRound } from 'lucide-react'
import { paths } from '@/config/routes'
import type { NavItem } from '@/types/navigation'

export const publicNav: NavItem[] = [
  { label: 'Entrar', to: paths.login },
]

export const appNav: NavItem[] = [
  { label: 'Painel', to: paths.dashboard, icon: Home, end: true },
  { label: 'Jornada', to: paths.journey, icon: Map },
  { label: 'Biblioteca', to: paths.library, icon: Headphones },
  { label: 'Diário', to: paths.journal, icon: BookHeart },
  { label: 'Progresso', to: paths.progress, icon: LineChart },
  { label: 'Perfil', to: paths.profile, icon: UserRound },
]

export const legalNav: NavItem[] = [
  { label: 'Privacidade', to: paths.privacy },
  { label: 'Termos de uso', to: paths.terms },
  { label: 'Orientações de segurança', to: paths.safety },
]
