import type { Choice } from '@/components/ui/ChoiceGroup'
import type { Availability } from '@/types/user'

/**
 * Textos e opções do onboarding.
 * Só perguntamos o necessário para personalizar a experiência; nada de dados de saúde ou íntimos.
 */
export const onboardingContent = {
  welcome: {
    eyebrow: 'Boas-vindas',
    title: 'Que bom que você chegou',
    text: [
      'A Essência Raiz é uma jornada de 21 dias para voltar a si, com calma e no seu tempo.',
      'Em cada dia, você encontra três momentos curtos de prática. Não é preciso ter uma rotina perfeita: os horários são sugestões e você adapta ao seu dia.',
    ],
    cta: 'Vamos começar',
  },
  name: {
    title: 'Como você prefere ser chamada?',
    hint: 'É assim que vamos falar com você na plataforma.',
  },
  intention: {
    title: 'O que mais te traz aqui agora?',
    hint: 'Escolha a opção que mais se aproxima. Você pode pular, se preferir.',
  },
  availability: {
    title: 'Em que período do dia você costuma ter mais tempo para você?',
    hint: 'Assim podemos sugerir os melhores momentos para as práticas. Você pode pular, se preferir.',
  },
  finish: 'Concluir e ir para o meu painel',
}

export const intentionChoices: Choice<string>[] = [
  { value: 'presenca', label: 'Viver com mais presença no dia a dia' },
  { value: 'cuidado', label: 'Reservar um espaço de cuidado só para mim' },
  { value: 'padroes', label: 'Reconhecer meus padrões e sair do automático' },
  { value: 'prazer', label: 'Reencontrar pequenos prazeres da rotina' },
  { value: 'curiosidade', label: 'Ainda não sei, quero descobrir' },
]

export const availabilityChoices: Choice<Availability>[] = [
  { value: 'manha', label: 'Pela manhã' },
  { value: 'tarde', label: 'À tarde' },
  { value: 'noite', label: 'À noite' },
  { value: 'varia', label: 'Varia bastante' },
]
