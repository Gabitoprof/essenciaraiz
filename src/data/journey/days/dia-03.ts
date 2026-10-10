import type { JourneyDay } from '@/types/journey'
import { MORNING_QUESTION } from '../shared'

export const dia03: JourneyDay = {
  day: 3,
  week: 1,
  title: 'Eu observo meus pensamentos',
  status: 'publicado',
  theme: 'Observação dos pensamentos',
  objective:
    'Experimentar observar os pensamentos como algo que passa, sem precisar acreditar em todos eles nem brigar com eles.',
  introduction:
    'A mente produz pensamentos o tempo todo: lembranças, planos, críticas, preocupações. Hoje o convite é dar um passo para trás e observá-los, como quem olha nuvens atravessando o céu. Não é preciso esvaziar a mente nem pensar só coisas boas.',
  morning: {
    welcome:
      'Sente-se confortável e deixe a respiração encontrar o próprio ritmo. Perceba que, mesmo em silêncio, a mente continua falando. Isso é natural. Hoje você vai apenas escutar, como quem ouve um rádio ao fundo.',
    meditation: [
      'Respire algumas vezes com calma.',
      'Quando surgir um pensamento, dê a ele um nome simples: planejando, lembrando, preocupando, julgando.',
      'Depois de nomear, volte para a respiração.',
      'Se o mesmo pensamento voltar várias vezes, apenas nomeie de novo. Não há erro aqui.',
      'Antes de terminar, perceba que você conseguiu notar os pensamentos, sem precisar segui-los.',
    ],
    affirmation: 'Eu posso observar os meus pensamentos sem me confundir com cada um deles.',
    question: MORNING_QUESTION,
  },
  daytime: {
    name: 'Nomear o pensamento',
    instruction:
      'Quando perceber um pensamento insistente, diga para si: "estou tendo o pensamento de que..." e complete a frase. Repare se algo muda na forma como ele soa.',
    fitInRoutine: 'Na fila, no trânsito, ao rolar a tela do celular ou logo depois de uma conversa difícil.',
    alternative:
      'Se não houver como parar, nomeie em uma palavra (preocupação, pressa, cobrança) e siga. Funciona em silêncio, no meio de qualquer tarefa.',
  },
  night: {
    reflection:
      'Nem tudo o que pensamos é um retrato fiel da realidade. Pensamentos são interpretações e, muitas vezes, repetem hábitos antigos, vozes que ouvimos há muito tempo ou medos que já não fazem sentido. Observá-los não significa ignorar o que sentimos, nem fingir que está tudo bem. Significa criar uma pequena distância, suficiente para perguntar: isto é um fato ou uma interpretação? Essa pergunta simples devolve um pouco de liberdade para escolher o que fazer em seguida.',
    integrationQuestion: 'Qual pensamento apareceu mais vezes hoje, e eu acredito nele por completo?',
    writingPrompt:
      'Escreva um pensamento que se repetiu hoje. Depois responda: o que eu sei de fato sobre isso? O que é interpretação? Como eu falaria com uma amiga que tivesse esse mesmo pensamento?',
    audio: {
      kind: 'visualizacao',
      title: 'O céu e as nuvens',
      script:
        'Feche os olhos, se for confortável, e respire devagar. Imagine que você está deitada em um lugar tranquilo, olhando para um céu amplo. Cada pensamento que surgir pode ser imaginado como uma nuvem: algumas pequenas, outras grandes, algumas claras, outras escuras. Você não precisa empurrá-las nem segurá-las. Apenas observe enquanto passam e mudam de forma. Perceba que o céu continua ali, inteiro, por trás de todas elas. Se a mente se agitar, volte à imagem do céu. Fique alguns minutos assim. Para encerrar, respire fundo três vezes e lembre-se de que pode voltar a esse céu sempre que precisar.',
    },
  },
  durations: { despertar: 'cerca de 10 min', presenca: '1 min', integrar: 'cerca de 15 min' },
  references: [
    {
      kind: 'cientifica',
      text: 'Observar pensamentos como eventos mentais, e não como fatos, é uma ideia presente em abordagens baseadas em mindfulness e na terapia cognitiva, que vêm sendo estudadas pela psicologia. Aqui ela é proposta como exercício de reflexão, não como terapia.',
    },
    {
      kind: 'filosofica',
      text: 'A imagem do céu e das nuvens é uma metáfora usada em várias tradições contemplativas. É um recurso de imaginação, não uma explicação de como a mente funciona.',
    },
  ],
  careNote:
    'Se os pensamentos estiverem muito pesados ou difíceis de suportar, procure apoio de um profissional de saúde mental. As orientações de segurança indicam onde buscar ajuda.',
}
