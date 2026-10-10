import type { InstitutionalDocument } from '@/components/feedback/DocumentPage'

/**
 * Textos institucionais além da privacidade (src/data/privacy.ts).
 * Os trechos entre [colchetes] dependem de informações da responsável pelo projeto.
 * Termos e orientações de segurança devem ser revisados (jurídico e, para segurança, um profissional de saúde)
 * antes da publicação.
 */

const REVIEW_NOTICE =
  'Rascunho para revisão. Os campos entre colchetes precisam ser preenchidos e o texto deve ser revisado antes da publicação.'

export const safetyDocument: InstitutionalDocument = {
  title: 'Orientações de segurança',
  description: 'Cuidados durante a jornada e quando procurar ajuda profissional.',
  notice:
    'Texto em revisão. Estas orientações são gerais e devem ser revisadas por um profissional de saúde antes da publicação.',
  sections: [
    {
      heading: 'O que a jornada é, e o que não é',
      paragraphs: [
        'A Essência Raiz é uma jornada de autoconhecimento e bem-estar, com práticas simples de atenção, respiração, escrita e reflexão.',
        'Ela não é tratamento, terapia, diagnóstico ou acompanhamento médico, e não substitui nenhum deles. Se você faz algum tratamento, continue com ele e converse com quem te acompanha antes de mudar qualquer coisa.',
      ],
    },
    {
      heading: 'Respeite os seus limites',
      paragraphs: [
        'Todas as práticas são convites. Você pode adaptar, pausar ou pular qualquer uma, a qualquer momento.',
        'Nas práticas de respiração, respire de forma confortável. Se sentir tontura, formigamento, falta de ar ou mal-estar, volte à respiração natural e pare a prática.',
        'Nos movimentos e alongamentos, nada deve doer. Se você tem alguma condição de saúde, está grávida ou se recupera de uma lesão, confirme com um profissional quais movimentos são adequados para você.',
        'Faça as práticas de olhos fechados ou relaxamento apenas em um lugar seguro, nunca dirigindo ou operando máquinas.',
      ],
    },
    {
      heading: 'Óleos essenciais e aromas',
      paragraphs: [
        'Quando uma prática sugerir aromas, eles são opcionais. Não ingira óleos essenciais e não os aplique puros na pele.',
        'Evite o uso durante a gravidez e a amamentação, perto de bebês, crianças pequenas e animais, e em caso de asma, alergias ou sensibilidade a cheiros, sem orientação profissional.',
      ],
    },
    {
      heading: 'Emoções que aparecem',
      paragraphs: [
        'Olhar para si pode trazer à tona emoções intensas ou lembranças difíceis. Isso é humano e não significa que você está fazendo algo errado.',
        'Se uma prática despertar sofrimento que não passa, interrompa e procure apoio de uma pessoa de confiança ou de um profissional de saúde mental (psicóloga, psiquiatra ou serviço de saúde da sua cidade).',
      ],
    },
    {
      heading: 'Se você precisa de ajuda agora',
      paragraphs: [
        'Em uma emergência médica, ligue 192 (SAMU).',
        'Se você está pensando em tirar a própria vida ou precisa conversar, o CVV atende de graça, 24 horas, pelo telefone 188 ou pelo site cvv.org.br.',
        'Em situação de violência contra a mulher, ligue 180 (Central de Atendimento à Mulher). Em perigo imediato, ligue 190.',
      ],
    },
  ],
}

export const termsDocument: InstitutionalDocument = {
  title: 'Termos de uso',
  description: 'As regras de uso da plataforma e da mentoria.',
  notice: REVIEW_NOTICE,
  updatedAt: '[data da versão final]',
  sections: [
    {
      heading: 'Quem oferece a plataforma',
      paragraphs: [
        'A Essência Raiz | Consciência é oferecida por [nome completo ou razão social], [CPF ou CNPJ], com contato pelo e-mail [e-mail de contato].',
      ],
    },
    {
      heading: 'O serviço',
      paragraphs: [
        'A plataforma oferece uma jornada de 21 dias com práticas de bem-estar e autoconhecimento, diário pessoal e conteúdos de apoio.',
        'As práticas têm caráter educativo e experiencial. Não são tratamento de saúde, não substituem acompanhamento profissional e não garantem resultados: cada pessoa vive a jornada de um jeito. Leia as orientações de segurança antes de começar.',
      ],
    },
    {
      heading: 'Sua conta',
      paragraphs: [
        'Para usar a área da participante é preciso criar uma conta com e-mail e senha e ter [idade mínima, ex.: 18] anos ou mais.',
        'Você é responsável por manter sua senha em segredo. A conta é pessoal e não deve ser compartilhada.',
        'Você pode excluir sua conta a qualquer momento em Perfil e configurações. A exclusão apaga seus dados de forma definitiva.',
      ],
    },
    {
      heading: 'Acesso e pagamento',
      paragraphs: [
        '[Descrever como o acesso é liberado (gratuito, compra única, assinatura), prazo de acesso, formas de pagamento e política de cancelamento e reembolso, incluindo o direito de arrependimento de 7 dias previsto no Código de Defesa do Consumidor para compras on-line.]',
      ],
    },
    {
      heading: 'Conteúdo da plataforma',
      paragraphs: [
        'Textos, áudios, imagens e a identidade visual pertencem a [titular] e são protegidos por direitos autorais. O uso é pessoal: não é permitido copiar, revender ou distribuir o conteúdo sem autorização.',
        'O que você escreve no diário é seu. Não usamos seus registros para publicidade e não os compartilhamos com terceiros.',
      ],
    },
    {
      heading: 'Uso adequado',
      paragraphs: [
        'Não é permitido tentar acessar dados de outras pessoas, interferir no funcionamento da plataforma ou usá-la para fins ilegais.',
      ],
    },
    {
      heading: 'Mudanças e contato',
      paragraphs: [
        'Estes termos podem ser atualizados. Mudanças importantes serão avisadas na plataforma ou por e-mail.',
        'Dúvidas: [e-mail de contato]. Foro: [cidade e estado].',
      ],
    },
  ],
}

export const contactDocument: InstitutionalDocument = {
  title: 'Contato',
  description: 'Como falar com a equipe da Essência Raiz.',
  notice: 'Rascunho para revisão. Os canais de contato entre colchetes precisam ser preenchidos antes da publicação.',
  sections: [
    {
      heading: 'Fale com a gente',
      paragraphs: [
        'E-mail: [e-mail de contato]',
        'Instagram: [@perfil]',
        'Respondemos em até [prazo, ex.: 2 dias úteis].',
      ],
    },
    {
      heading: 'Privacidade e dados pessoais',
      paragraphs: [
        'Para pedidos sobre os seus dados (acesso, correção, exclusão), escreva para [e-mail de privacidade]. Você também pode consultar, baixar e excluir seus dados diretamente em Perfil e configurações.',
      ],
    },
    {
      heading: 'Não é um canal de emergência',
      paragraphs: [
        'Este contato não oferece atendimento de saúde nem de urgência. Se você precisa de ajuda agora, veja os telefones nas orientações de segurança: SAMU 192, CVV 188 e Central de Atendimento à Mulher 180.',
      ],
    },
  ],
}
