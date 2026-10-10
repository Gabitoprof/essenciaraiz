import { BookHeart, BookOpen, Headphones, LineChart, UserRound, type LucideIcon } from 'lucide-react'
import { paths } from '@/config/routes'

export const dashboardTexts = {
  eyebrow: 'Seu espaço',
  welcome: 'Você não precisa fazer tudo perfeitamente. Hoje, basta encontrar um pequeno espaço para estar consigo.',
  firstVisit: 'Quando quiser, comece pelo Despertar. Não existe hora certa: o importante é chegar como você está.',
  allDoneToday: 'Você passou pelos três momentos de hoje. Descanse e volte quando sentir vontade.',
  journeyFinished: 'Você percorreu os 21 dias. Pode rever qualquer prática sempre que quiser.',
  localStorageNote:
    'Seu progresso fica salvo apenas neste navegador. Ainda não há sincronização entre aparelhos: em outro celular ou computador, ele não aparece.',
}

export interface DashboardShortcut {
  label: string
  description: string
  to: string
  icon: LucideIcon
  inPreparation?: boolean
}

/** Atalhos para as outras áreas. `inPreparation` marca as que ainda serão desenvolvidas. */
export const dashboardShortcuts: DashboardShortcut[] = [
  { label: 'Diário pessoal', description: 'Um espaço privado para escrever.', to: paths.journal, icon: BookHeart },
  { label: 'Biblioteca de áudios', description: 'Meditações e práticas guiadas.', to: paths.libraryAudios, icon: Headphones },
  { label: 'Biblioteca de conteúdos', description: 'Leituras de apoio à jornada.', to: paths.libraryContents, icon: BookOpen },
  { label: 'Minha evolução', description: 'O caminho que você já percorreu.', to: paths.progress, icon: LineChart },
  { label: 'Meu perfil', description: 'Seus dados e preferências.', to: paths.profile, icon: UserRound },
]
