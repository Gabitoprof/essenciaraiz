import { PenLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/components/ui/buttonStyles'
import { paths } from '@/config/routes'
import { MomentBlock, MomentNote } from './MomentBlock'
import type { DaytimeContent, JourneyDay, MorningContent, NightAudioKind, NightContent } from '@/types/journey'
import type { PracticeMoment } from '@/types/progress'

const AUDIO_NOT_RECORDED = 'O áudio desta prática ainda não foi gravado. Por enquanto, leia o texto com calma, no seu ritmo.'

const audioKindLabel: Record<NightAudioKind, string> = {
  relaxamento: 'Relaxamento',
  visualizacao: 'Visualização guiada',
  'ensaio-mental': 'Ensaio mental',
}

export function MorningMoment({ content }: { content: MorningContent }) {
  return (
    <div className="flex flex-col gap-6">
      <MomentBlock title="Acolhimento">
        <p>{content.welcome}</p>
        <MomentNote>{AUDIO_NOT_RECORDED}</MomentNote>
      </MomentBlock>
      <MomentBlock title="Meditação breve">
        <ol className="flex list-decimal flex-col gap-2 pl-5 marker:text-terra-600">
          {content.meditation.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </MomentBlock>
      <MomentBlock title="Intenção do dia">
        <p className="border-l-2 border-salvia-400 pl-4 font-serif text-titulo-3 italic text-oliva-700">{content.affirmation}</p>
      </MomentBlock>
      <MomentBlock title="Pergunta da manhã">
        <p className="font-medium">{content.question}</p>
      </MomentBlock>
    </div>
  )
}

export function DaytimeMoment({ content }: { content: DaytimeContent }) {
  return (
    <div className="flex flex-col gap-6">
      <MomentBlock title={content.name}>
        <p>{content.instruction}</p>
      </MomentBlock>
      <MomentBlock title="Onde encaixar">
        <p>{content.fitInRoutine}</p>
      </MomentBlock>
      <MomentBlock title="Se você não puder parar">
        <p>{content.alternative}</p>
      </MomentBlock>
    </div>
  )
}

export function NightMoment({ content, day }: { content: NightContent; day: number }) {
  return (
    <div className="flex flex-col gap-6">
      <MomentBlock title="Reflexão">
        <p>{content.reflection}</p>
      </MomentBlock>
      <MomentBlock title="Pergunta de integração">
        <p className="font-medium">{content.integrationQuestion}</p>
      </MomentBlock>
      <MomentBlock title="Escrita consciente">
        <p>{content.writingPrompt}</p>
        <Link
          to={`${paths.journalNew}?${new URLSearchParams({ dia: String(day), pergunta: content.writingPrompt })}`}
          className={buttonClasses({ variant: 'secondary', size: 'sm', className: 'self-start' })}
        >
          <PenLine aria-hidden="true" className="size-4" /> Escrever no diário
        </Link>
      </MomentBlock>
      <MomentBlock title={`${audioKindLabel[content.audio.kind]}: ${content.audio.title}`}>
        <details className="group rounded-campo bg-bege-100/70 px-4 py-3">
          <summary className="cursor-pointer text-apoio font-medium text-oliva-700">Ler o roteiro</summary>
          <p className="mt-3">{content.audio.script}</p>
        </details>
        <MomentNote>{AUDIO_NOT_RECORDED}</MomentNote>
      </MomentBlock>
    </div>
  )
}

/** Escolhe o conteúdo certo para cada momento de um dia publicado. */
export function DayMomentsContent({ day, moment }: { day: JourneyDay; moment: PracticeMoment }) {
  if (moment === 'despertar' && day.morning) return <MorningMoment content={day.morning} />
  if (moment === 'presenca' && day.daytime) return <DaytimeMoment content={day.daytime} />
  if (moment === 'integrar' && day.night) return <NightMoment content={day.night} day={day.day} />
  return null
}
