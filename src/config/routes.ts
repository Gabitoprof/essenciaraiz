/** Âncoras das seções da página inicial. */
export const homeSections = {
  howItWorks: 'como-funciona',
  journey: 'a-jornada',
  faq: 'perguntas-frequentes',
} as const

/** Todos os caminhos do app em um só lugar, para não espalhar strings pelas páginas. */
export const paths = {
  home: '/',
  login: '/entrar',
  signup: '/cadastro',
  forgotPassword: '/recuperar-senha',
  /** Destino do link de recuperação enviado por e-mail (Supabase). */
  resetPassword: '/redefinir-senha',
  privacy: '/privacidade',
  terms: '/termos',
  safety: '/orientacoes-de-seguranca',
  contact: '/contato',
  homeSection: (id: string) => `/#${id}`,
  /** Só existe em desenvolvimento (npm run dev). */
  styleGuide: '/guia-visual',

  onboarding: '/app/boas-vindas',
  dashboard: '/app',
  journey: '/app/jornada',
  journeyDay: (day: number | string) => `/app/jornada/dia/${day}`,
  library: '/app/biblioteca',
  libraryAudios: '/app/biblioteca/audios',
  libraryContents: '/app/biblioteca/conteudos',
  journal: '/app/diario',
  progress: '/app/progresso',
  profile: '/app/perfil',
} as const
