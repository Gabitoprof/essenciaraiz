/** Grau de evidência de uma categoria, para não misturar ciência, filosofia e tradição como se fossem a mesma coisa. */
export type EvidenceLevel = 'ciencia' | 'ciencia-em-desenvolvimento' | 'filosofia' | 'pratica-tradicional' | 'evidencia-limitada'

export type PublicationStatus = 'publicado' | 'pendente'

export interface LibraryCategory {
  id: string
  name: string
  evidence: EvidenceLevel
  description: string
  /** Limites e incertezas do tema. */
  limits: string
}

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
}

export interface LibraryArticle {
  id: string
  categoryId: string
  title: string
  summary: string
  status: PublicationStatus
  readingMinutes?: number
  sections?: ArticleSection[]
}

export interface AudioPractice {
  id: string
  title: string
  description: string
  category: string
  /** Só quando a duração real do arquivo for conhecida. */
  durationMinutes?: number
  /** Caminho de um arquivo real (ex.: '/audios/acolhimento-dia-1.mp3'). Sem arquivo, o áudio aparece como pendente. */
  src?: string
  status: PublicationStatus
  /** Dia da jornada que tem o roteiro deste áudio. */
  relatedDay?: number
}
