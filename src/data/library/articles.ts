import type { LibraryArticle } from '@/types/library'

/**
 * Conteúdos da biblioteca. "publicado" aparece completo; "pendente" aparece só com título e a etiqueta
 * "Em preparação", sem link. Textos originais, sem citações atribuídas a autores.
 */
export const libraryArticles: LibraryArticle[] = [
  {
    id: 'o-que-e-neuroplasticidade',
    categoryId: 'neurociencia',
    title: 'O que é neuroplasticidade (e o que ela não promete)',
    summary: 'A capacidade do sistema nervoso de mudar com a experiência, sem exageros.',
    status: 'publicado',
    readingMinutes: 3,
    sections: [
      {
        heading: 'O que é',
        paragraphs: [
          'Neuroplasticidade é a capacidade do sistema nervoso de mudar a sua estrutura e o seu funcionamento ao longo da vida, em resposta à experiência, ao aprendizado e ao ambiente. Ela acontece, por exemplo, quando aprendemos uma habilidade nova.',
        ],
      },
      {
        heading: 'O que isso significa no dia a dia',
        paragraphs: [
          'A repetição de uma prática tende a torná-la mais familiar e mais fácil com o tempo. É por isso que a jornada propõe gestos pequenos e repetidos, em vez de grandes esforços de vez em quando.',
        ],
      },
      {
        heading: 'Limites',
        paragraphs: [
          'Neuroplasticidade não significa que qualquer mudança seja rápida, garantida ou dependa só de força de vontade. O ritmo varia muito de pessoa para pessoa e é influenciado por sono, saúde, contexto e história de vida.',
          'Expressões como "reprogramar o cérebro em 21 dias" simplificam demais o que a ciência mostra. Vinte e um dias são um tempo para experimentar e observar, não um prazo para uma transformação comprovada.',
        ],
      },
    ],
  },
  { id: 'atencao-e-cerebro', categoryId: 'neurociencia', title: 'Atenção: para onde vai o nosso foco', summary: '', status: 'pendente' },
  { id: 'pequenos-habitos', categoryId: 'habitos', title: 'Como pequenos hábitos se formam', summary: '', status: 'pendente' },
  { id: 'atencao-plena-o-que-e', categoryId: 'atencao-plena', title: 'Atenção plena: o que é e o que não é', summary: '', status: 'pendente' },
  {
    id: 'respiracao-lenta',
    categoryId: 'respiracao',
    title: 'Respiração lenta: o que se sabe',
    summary: 'Uma técnica simples de pausa, o que a pesquisa sugere e os cuidados.',
    status: 'publicado',
    readingMinutes: 3,
    sections: [
      {
        paragraphs: [
          'Respirar mais devagar, com a expiração um pouco mais longa que a inspiração, é uma técnica simples usada em muitas práticas de relaxamento.',
        ],
      },
      {
        heading: 'O que se sabe',
        paragraphs: [
          'Estudos sugerem que a respiração lenta pode favorecer uma sensação de calma e está associada à atividade do sistema nervoso parassimpático, ligado ao descanso. Os resultados variam entre estudos e entre pessoas, e a respiração não substitui tratamento para ansiedade ou outras condições.',
        ],
      },
      {
        heading: 'Como experimentar',
        paragraphs: [
          'Sente-se de um jeito confortável. Inspire pelo nariz contando até quatro e solte o ar devagar contando até seis. Repita por alguns minutos, sem forçar. Se contar atrapalhar, apenas deixe a saída do ar ser um pouco mais lenta que a entrada.',
        ],
      },
      {
        heading: 'Cuidados',
        paragraphs: [
          'Se sentir tontura, falta de ar ou desconforto, volte a respirar normalmente. Pessoas com doenças respiratórias ou cardíacas devem conversar com um profissional de saúde antes de práticas respiratórias mais intensas.',
        ],
      },
    ],
  },
  { id: 'relaxamento-muscular', categoryId: 'respiracao', title: 'Relaxamento muscular progressivo', summary: '', status: 'pendente' },
  { id: 'o-que-esta-sob-controle', categoryId: 'estoicismo', title: 'O que está sob o nosso controle: uma ideia estoica', summary: '', status: 'pendente' },
  { id: 'contemplacao-no-cotidiano', categoryId: 'integrativas', title: 'Práticas contemplativas no cotidiano', summary: '', status: 'pendente' },
  {
    id: 'oleos-essenciais-seguranca',
    categoryId: 'aromaterapia',
    title: 'Óleos essenciais: cuidados de segurança',
    summary: 'Antes de usar aromas nas suas pausas, conheça os cuidados básicos.',
    status: 'publicado',
    readingMinutes: 3,
    sections: [
      {
        paragraphs: [
          'A aromaterapia usa aromas de óleos essenciais em práticas de bem-estar. Muitas pessoas relatam que certos aromas ajudam a criar um momento de pausa. A pesquisa sobre efeitos específicos ainda é limitada e os resultados são variados.',
        ],
      },
      {
        heading: 'Cuidados de segurança',
        paragraphs: [
          'Óleos essenciais são substâncias concentradas. Não os ingira e não aplique puros na pele: dilua em um óleo vegetal, seguindo a orientação do fabricante ou de um profissional.',
          'Antes de usar na pele, teste em uma pequena área e interrompa se houver vermelhidão, coceira ou ardor.',
          'Mantenha os frascos longe dos olhos, de crianças e de animais de estimação. Alguns óleos são tóxicos para gatos e cães.',
          'Gestantes, lactantes e pessoas com asma, alergias, epilepsia ou em tratamento médico devem conversar com um profissional de saúde antes de usar.',
          'Em ambientes, prefira poucas gotas no difusor, por pouco tempo e com o local ventilado.',
        ],
      },
      {
        heading: 'Limites',
        paragraphs: ['A aromaterapia não substitui tratamento médico ou psicológico e não deve ser usada para tratar doenças.'],
      },
    ],
  },
  { id: 'epigenetica-sem-exageros', categoryId: 'epigenetica', title: 'Epigenética sem exageros', summary: '', status: 'pendente' },
  {
    id: 'fisica-quantica-o-que-diz',
    categoryId: 'fisica-quantica',
    title: 'Física quântica: o que ela diz e o que não diz',
    summary: 'Uma das teorias mais bem testadas da ciência, e por que ela não fala sobre "atrair" acontecimentos.',
    status: 'publicado',
    readingMinutes: 4,
    sections: [
      {
        heading: 'O que é',
        paragraphs: [
          'A física quântica é a área da física que descreve o comportamento da matéria e da energia em escalas muito pequenas, como átomos, elétrons e fótons. É uma das teorias mais bem testadas da ciência e está na base de tecnologias como lasers, semicondutores e ressonância magnética.',
        ],
      },
      {
        heading: 'Ideias estranhas, mas precisas',
        paragraphs: [
          'Nessa escala, alguns resultados só podem ser previstos como probabilidades, e partículas podem se comportar ora como ondas, ora como partículas, dependendo do experimento. Essas ideias são descritas por uma matemática precisa e não se transferem diretamente para a vida cotidiana.',
        ],
      },
      {
        heading: 'O que ela não diz',
        paragraphs: [
          'A física quântica não mostra que pensamentos atraem acontecimentos, que a mente cria a realidade material ou que intenções mudam a matéria à distância.',
          'Em física, "observação" ou "medição" se refere a interações físicas com instrumentos e com o ambiente, e não à atenção ou ao desejo de uma pessoa. Quando a palavra "quântico" aparecer associada a cura, prosperidade ou manifestação, trata-se de uma metáfora, não de uma conclusão científica.',
          'Há também questões em aberto: físicos ainda debatem como interpretar a teoria. Esse debate é sobre a natureza da medição e da realidade física, não sobre o poder do pensamento.',
        ],
      },
      {
        heading: 'E nesta jornada?',
        paragraphs: [
          'Aqui, a física quântica aparece como curiosidade e como convite ao espanto diante da natureza. As práticas da jornada se apoiam em atenção, hábito e reflexão, não em efeitos quânticos.',
        ],
      },
    ],
  },
]

export function getLibraryArticle(id: string) {
  return libraryArticles.find((article) => article.id === id)
}
