import type { JourneyDay } from '@/types/journey'
import { MORNING_QUESTION } from '../shared'

export const dia02: JourneyDay = {
  day: 2,
  week: 1,
  title: 'Meu corpo fala comigo',
  status: 'publicado',
  theme: 'Escuta do corpo',
  objective: 'Perceber os sinais do corpo, como tensão, cansaço e conforto, como informações, sem julgá-los.',
  introduction:
    'O corpo costuma avisar antes da mente: um ombro que sobe, a respiração que encurta, um aperto no estômago. Hoje a proposta é escutar esses sinais com gentileza, tratando-os como informações, e não como problemas a resolver imediatamente.',
  morning: {
    welcome:
      'Antes de pegar o celular, fique alguns instantes deitada ou sentada. Perceba o contato do corpo com o colchão ou com a cadeira. Note, sem julgar, como o seu corpo acordou hoje.',
    meditation: [
      'Inspire e expire devagar algumas vezes.',
      'Leve a atenção ao topo da cabeça e desça aos poucos: rosto, mandíbula, pescoço e ombros.',
      'Continue pelo peito, barriga, costas, quadril, pernas e pés.',
      'Em cada região, apenas note: há tensão, conforto, calor, frio ou nada em especial? Tudo bem não sentir nada.',
      'Termine perguntando ao corpo, em silêncio: do que você precisa hoje?',
    ],
    affirmation: 'Meu corpo me comunica coisas importantes, e eu escolho escutá-lo com carinho.',
    question: MORNING_QUESTION,
  },
  daytime: {
    name: 'Check-in corporal',
    instruction:
      'Uma vez ao longo do dia, pergunte-se: onde estou segurando tensão agora? Ao encontrar, solte um pouco ao expirar: abaixe os ombros, descole a língua do céu da boca, abra as mãos.',
    fitInRoutine: 'Ao sentar no carro ou no ônibus, ao terminar uma reunião ou enquanto espera alguém.',
    alternative:
      'Se não puder parar, apenas relaxe os ombros e a mandíbula enquanto continua a atividade. Ninguém ao redor precisa perceber.',
  },
  night: {
    reflection:
      'Muitas de nós aprendemos a seguir em frente mesmo quando o corpo pede pausa. Escutar o corpo não significa obedecer a cada desconforto, nem transformar cada sinal em preocupação. Significa reconhecer que ele faz parte de quem você é e que os seus recados merecem atenção. Quando você nota um sinal cedo, ganha a chance de cuidar de si antes que ele precise falar mais alto.',
    integrationQuestion: 'Qual sinal do meu corpo eu percebi hoje, e o que ele pode estar me dizendo?',
    writingPrompt:
      'Escreva sobre um momento do dia em que o corpo falou com você: o que sentiu, onde sentiu e o que fez (ou gostaria de ter feito) com essa informação.',
    audio: {
      kind: 'relaxamento',
      title: 'Escaneamento corporal noturno',
      script:
        'Deite-se de costas, se for confortável, com os braços ao lado do corpo. Respire naturalmente. Comece pelos dedos dos pés: perceba-os sem precisar mexê-los e, ao expirar, imagine que essa região se aquieta. Siga devagar para os tornozelos, as panturrilhas, os joelhos e as coxas. Perceba o quadril e a base das costas apoiados. Leve a atenção à barriga, que sobe e desce com a respiração, depois ao peito, às mãos, aos braços e aos ombros. Por fim, ao pescoço, ao rosto e ao topo da cabeça. Se encontrar algum desconforto, apenas reconheça: aqui há algo. Agradeça ao seu corpo por tudo o que ele sustentou hoje e fique alguns momentos sentindo o corpo inteiro respirar.',
    },
  },
  durations: { despertar: 'cerca de 10 min', presenca: '1 a 2 min', integrar: 'cerca de 15 min' },
  references: [
    {
      kind: 'cientifica',
      text: 'A percepção dos sinais internos do corpo, chamada interocepção, é um tema estudado pela neurociência e pela psicologia. Neste dia ela aparece como prática de atenção, sem fins de diagnóstico ou tratamento.',
    },
    {
      kind: 'experiencial',
      text: 'O escaneamento corporal é uma prática de atenção usada em diferentes abordagens de meditação. A experiência varia de pessoa para pessoa.',
    },
  ],
  careNote:
    'Se algum sinal do corpo for intenso, persistente ou preocupante, procure um profissional de saúde. Estas práticas não avaliam nem tratam sintomas.',
}
