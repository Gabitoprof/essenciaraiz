import { useState, type ReactNode } from 'react'
import { BotanicalDivider } from '@/components/decor/BotanicalDivider'
import { LeafMark } from '@/components/decor/LeafMark'
import { RootLines } from '@/components/decor/RootLines'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ContentCard } from '@/components/journey/ContentCard'
import { DailyPracticeCard } from '@/components/journey/DailyPracticeCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { TextAreaField } from '@/components/ui/TextAreaField'
import { TextField } from '@/components/ui/TextField'
import { paths } from '@/config/routes'
import { journeyDays } from '@/data/journey'
import type { JourneyContent } from '@/types/journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** Tokens de cor exibidos no guia. Os valores ficam só em `styles/theme.css`. */
const colorTokens = [
  { token: 'oliva-600', role: 'Ação principal, links' },
  { token: 'salvia-400', role: 'Ornamentos e detalhes' },
  { token: 'salvia-100', role: 'Fundos suaves, destaque' },
  { token: 'bege-100', role: 'Seções alternadas' },
  { token: 'areia-300', role: 'Bordas e divisores' },
  { token: 'terra-600', role: 'Detalhes quentes, sobretítulos' },
  { token: 'branco-quente', role: 'Fundo principal' },
  { token: 'tinta', role: 'Texto principal' },
]

function GuideSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-areia-300/60 py-12">
      <h2 className="mb-8 text-titulo-2">{title}</h2>
      {children}
    </section>
  )
}

/**
 * Guia visual: vitrine dos tokens e componentes.
 * Disponível só em desenvolvimento (rota /guia-visual).
 */
/** Exemplos só para o guia: não são conteúdos publicados. */
const sampleContents: JourneyContent[] = [
  { id: 'exemplo-audio', kind: 'audio', title: 'Exemplo de áudio', durationMinutes: 10 },
  { id: 'exemplo-pratica', kind: 'exercicio', title: 'Exemplo de prática' },
]

export function StyleGuidePage() {
  useDocumentTitle('Guia visual')
  const [isLoading, setIsLoading] = useState(false)

  function simulateLoading() {
    setIsLoading(true)
    window.setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <Container className="py-12">
      <Eyebrow>Somente em desenvolvimento</Eyebrow>
      <h1 className="mt-3 text-display sm:text-[3.5rem]">Guia visual</h1>
      <p className="mt-4 max-w-leitura text-tinta-suave">
        Cores, tipografia e componentes da Essência Raiz | Consciência. Todos os tokens ficam em
        <code className="mx-1 rounded bg-bege-100 px-1.5 py-0.5 text-apoio">src/styles/theme.css</code>.
      </p>

      <GuideSection title="Cores">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colorTokens.map(({ token, role }) => (
            <li key={token}>
              <div
                className="h-20 rounded-cartao ring-1 ring-areia-300/70"
                style={{ background: `var(--color-${token})` }}
              />
              <p className="mt-2 text-apoio font-medium">{token}</p>
              <p className="text-legenda tracking-normal text-tinta-suave">{role}</p>
            </li>
          ))}
        </ul>
      </GuideSection>

      <GuideSection title="Tipografia">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-display">Display · Cormorant Garamond</p>
          <p className="font-serif text-titulo-1">Título 1 · Seu prazer pela vida de volta</p>
          <p className="font-serif text-titulo-2">Título 2 · Semana 1: Raiz</p>
          <p className="font-serif text-titulo-3 font-semibold">Título 3 · Uma prática por dia</p>
          <p className="max-w-leitura text-corpo">
            Corpo · Inter 17px. Conteúdos curtos para encaixar na sua rotina, sem pressa e sem cobrança, com linhas
            confortáveis de ler no celular.
          </p>
          <p className="text-apoio text-tinta-suave">Apoio · textos secundários e descrições.</p>
          <Eyebrow>Legenda · sobretítulo</Eyebrow>
        </div>
      </GuideSection>

      <GuideSection title="Botões">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="ghost">Discreto</Button>
          <Button size="sm">Pequeno</Button>
          <Button isLoading={isLoading} onClick={simulateLoading}>
            {isLoading ? 'Salvando' : 'Clique para carregar'}
          </Button>
          <Button disabled>Desabilitado</Button>
          <ButtonLink to={paths.journey} variant="secondary">
            Link como botão
          </ButtonLink>
        </div>
      </GuideSection>

      <GuideSection title="Campos de formulário">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <TextField label="Nome" placeholder="Como você gosta de ser chamada" />
          <TextField label="E-mail" type="email" hint="Usaremos só para o seu acesso." />
          <TextField label="Senha" type="password" error="A senha precisa ter pelo menos 8 caracteres." />
          <TextAreaField label="Reflexão do dia" className="sm:col-span-2" placeholder="O que você sentiu hoje?" />
        </div>
      </GuideSection>

      <GuideSection title="Cartões">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>Cartão claro</Card>
          <Card tone="bege">Cartão bege</Card>
          <Card tone="verde">Cartão verde</Card>
        </div>
        <h3 className="mb-4 mt-10 text-titulo-3 font-semibold">Cartão de conteúdo</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {sampleContents.map((content) => (
            <ContentCard key={content.id} content={content} to={paths.library} />
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-titulo-3 font-semibold">Cartão de prática diária</h3>
        <div className="grid gap-4 lg:grid-cols-3">
          <DailyPracticeCard day={journeyDays[0]} status="concluido" to={paths.journeyDay(1)} />
          <DailyPracticeCard day={journeyDays[1]} status="hoje" to={paths.journeyDay(2)} />
          <DailyPracticeCard day={journeyDays[2]} status="bloqueado" to={paths.journeyDay(3)} />
        </div>
      </GuideSection>

      <GuideSection title="Progresso e etiquetas">
        <div className="grid max-w-2xl gap-8">
          <ProgressIndicator label="Sua jornada" value={8} max={21} valueText="8 de 21 dias" showSteps />
          <ProgressIndicator label="Áudio" value={3} max={10} valueText="3 de 10 min" />
          <div className="flex flex-wrap gap-2">
            <Badge>Concluído</Badge>
            <Badge tone="terra">Em breve</Badge>
            <Badge tone="neutro">Áudio</Badge>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Estados">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <LoadingState description="Preparando a sua prática." />
          </Card>
          <Card>
            <ErrorState onRetry={() => undefined} />
          </Card>
          <EmptyState
            title="Seu diário ainda está em branco"
            description="Quando você escrever a primeira reflexão, ela aparece aqui."
            action={<Button variant="secondary">Escrever agora</Button>}
          />
        </div>
      </GuideSection>

      <GuideSection title="Ornamentos">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-6 text-oliva-600">
            <LeafMark className="size-10" />
            <LeafMark className="size-6 text-salvia-400" />
          </div>
          <BotanicalDivider className="max-w-md" />
          <div className="relative h-32 overflow-hidden rounded-cartao bg-bege-100">
            <RootLines className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </GuideSection>
    </Container>
  )
}
