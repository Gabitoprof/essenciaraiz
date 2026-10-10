import type { EvidenceLevel, LibraryCategory } from '@/types/library'

export const evidenceInfo: Record<EvidenceLevel, { label: string; description: string }> = {
  ciencia: {
    label: 'Base científica',
    description: 'Tema com pesquisa científica consistente. Mesmo assim, nada aqui é diagnóstico ou tratamento.',
  },
  'ciencia-em-desenvolvimento': {
    label: 'Ciência em desenvolvimento',
    description: 'Área de pesquisa ativa, com muitas perguntas ainda em aberto.',
  },
  filosofia: {
    label: 'Filosofia',
    description: 'Reflexões de tradições filosóficas. São ideias para pensar a vida, não afirmações científicas.',
  },
  'pratica-tradicional': {
    label: 'Prática e tradição',
    description: 'Práticas valorizadas pela experiência e por tradições. O grau de evidência científica varia.',
  },
  'evidencia-limitada': {
    label: 'Evidência limitada',
    description: 'Há poucos estudos de boa qualidade. O foco aqui é o uso seguro.',
  },
}

export const libraryCategories: LibraryCategory[] = [
  {
    id: 'neurociencia',
    name: 'Neurociência e neuroplasticidade',
    evidence: 'ciencia',
    description: 'Como o cérebro e o sistema nervoso mudam com a experiência e o aprendizado.',
    limits: 'A neuroplasticidade é real, mas as mudanças variam muito entre pessoas e não seguem prazos garantidos.',
  },
  {
    id: 'habitos',
    name: 'Hábitos e comportamento',
    evidence: 'ciencia',
    description: 'Como pequenas ações repetidas se tornam parte da rotina.',
    limits: 'O tempo para formar um hábito varia bastante de pessoa para pessoa e de hábito para hábito.',
  },
  {
    id: 'atencao-plena',
    name: 'Atenção plena e meditação',
    evidence: 'ciencia',
    description: 'Práticas de atenção ao momento presente e o que a pesquisa diz sobre elas.',
    limits: 'Os efeitos estudados costumam ser moderados e variam entre pessoas. Meditação não substitui tratamento.',
  },
  {
    id: 'respiracao',
    name: 'Respiração e relaxamento',
    evidence: 'ciencia',
    description: 'Técnicas simples de respiração e relaxamento para momentos de pausa.',
    limits: 'Os resultados variam. Pare se sentir tontura ou desconforto.',
  },
  {
    id: 'estoicismo',
    name: 'Filosofia estoica',
    evidence: 'filosofia',
    description: 'Ideias da filosofia estoica sobre escolhas, virtude e o que está sob o nosso controle.',
    limits: 'São reflexões filosóficas, não técnicas clínicas.',
  },
  {
    id: 'integrativas',
    name: 'Práticas integrativas e contemplativas',
    evidence: 'pratica-tradicional',
    description: 'Práticas de diferentes tradições que convidam à pausa, ao silêncio e à contemplação.',
    limits: 'O valor dessas práticas está na experiência pessoal. Elas não substituem acompanhamento profissional.',
  },
  {
    id: 'aromaterapia',
    name: 'Aromaterapia e cuidados de segurança',
    evidence: 'evidencia-limitada',
    description: 'O uso de aromas em momentos de cuidado, com atenção à segurança.',
    limits: 'A pesquisa sobre efeitos específicos é limitada. Óleos essenciais exigem cuidados de uso.',
  },
  {
    id: 'epigenetica',
    name: 'Epigenética',
    evidence: 'ciencia-em-desenvolvimento',
    description: 'Como fatores do ambiente podem influenciar a forma como os genes são usados pelo corpo.',
    limits: 'É uma área recente. Muitos resultados vêm de estudos iniciais e são exagerados fora da ciência.',
  },
  {
    id: 'fisica-quantica',
    name: 'Fundamentos de física quântica',
    evidence: 'ciencia',
    description: 'O que a física quântica descreve, de forma acessível.',
    limits: 'A física quântica descreve partículas muito pequenas. Ela não mostra que pensamentos atraem acontecimentos.',
  },
]

export function getLibraryCategory(id: string) {
  return libraryCategories.find((category) => category.id === id)
}
