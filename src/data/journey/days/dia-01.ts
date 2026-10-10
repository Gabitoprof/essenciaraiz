import type { JourneyDay } from '@/types/journey'
import { MORNING_QUESTION } from '../shared'

export const dia01: JourneyDay = {
  day: 1,
  week: 1,
  title: 'Eu volto a me perceber',
  status: 'publicado',
  theme: 'Percepção de si',
  objective: 'Criar um primeiro momento de pausa para perceber como você está, sem precisar mudar nada.',
  introduction:
    'Antes de qualquer mudança, existe um passo simples: notar. Hoje o convite é apenas perceber como você chega a este começo, o corpo, o ritmo e o humor, com curiosidade e sem julgamento.',
  morning: {
    welcome:
      'Sente-se ou deite-se de um jeito confortável. Se quiser, feche os olhos ou deixe o olhar pousar em um ponto à sua frente. Perceba que você chegou até aqui. Não há nada a alcançar agora. Apenas note o lugar onde você está, os sons ao redor e a temperatura do ar na pele.',
    meditation: [
      'Leve a atenção à respiração, sem tentar mudá-la.',
      'Perceba onde ela é mais fácil de sentir: no nariz, no peito ou na barriga.',
      'Acompanhe cinco respirações, só observando o ar entrar e sair.',
      'Se a mente se distrair, apenas note e volte para a respiração. Distrair-se faz parte.',
      'Antes de abrir os olhos, pergunte-se em silêncio: como estou agora?',
    ],
    affirmation: 'Hoje eu me permito perceber como estou, sem pressa de mudar nada.',
    question: MORNING_QUESTION,
  },
  daytime: {
    name: 'Três respirações conscientes',
    instruction:
      'Pare por um instante e faça três respirações um pouco mais lentas que o normal. Em cada uma, perceba uma coisa: o ar entrando, os ombros, os pés no chão.',
    fitInRoutine: 'Enquanto a água do café esquenta, antes de abrir uma mensagem ou ao lavar as mãos.',
    alternative:
      'Se não puder parar, faça uma única respiração consciente enquanto continua o que está fazendo. Se não houver silêncio, use o som ao redor como ponto de atenção.',
  },
  night: {
    reflection:
      'Muitas vezes passamos o dia respondendo ao que acontece fora e só percebemos o cansaço, a fome ou a alegria quando já transbordaram. Perceber-se não é um talento reservado a poucas pessoas: é uma habilidade que se cultiva em pequenos momentos, como os de hoje. Cada vez que você nota como está, abre um espaço entre o que sente e o que faz em seguida. É nesse espaço que as escolhas começam.',
    integrationQuestion: 'Em que momento de hoje eu me senti mais presente comigo?',
    writingPrompt:
      'Escreva por alguns minutos, sem corrigir: como estavam o meu corpo, o meu humor e a minha energia hoje? O que eu notei que normalmente passaria despercebido?',
    audio: {
      kind: 'relaxamento',
      title: 'Relaxamento para encerrar o dia',
      script:
        'Deite-se ou sente-se apoiada. Deixe o corpo ser sustentado pela superfície embaixo de você. Inspire pelo nariz e solte o ar devagar pela boca, três vezes. Leve a atenção aos pés e, ao expirar, imagine que eles ficam um pouco mais pesados. Suba devagar pelas pernas, quadril, barriga, peito, mãos, braços, ombros, pescoço e rosto, soltando o que for possível soltar. Não force: onde houver tensão, apenas reconheça. Para terminar, lembre-se de um momento simples do dia em que você esteve presente e fique com essa lembrança por algumas respirações. Quando quiser, volte a se mexer devagar ou siga para o sono.',
    },
  },
  durations: { despertar: 'cerca de 10 min', presenca: '1 min', integrar: 'cerca de 15 min' },
  references: [
    {
      kind: 'filosofica',
      text: 'A ideia de voltar a atenção para si aparece em muitas tradições filosóficas e contemplativas. Aqui ela é um convite à reflexão, não uma teoria a ser comprovada.',
    },
    {
      kind: 'experiencial',
      text: 'A respiração consciente e o relaxamento deste dia são exercícios de atenção e bem-estar. Observe o que funciona para você e adapte o que precisar.',
    },
  ],
}
