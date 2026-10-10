/**
 * RASCUNHO da política de privacidade, para revisão antes da publicação.
 * Os trechos entre [colchetes] precisam ser preenchidos pela responsável pelo projeto,
 * e o texto final deve ser revisado por quem cuida da parte jurídica (LGPD, Lei 13.709/2018).
 */
import type { InstitutionalDocument } from '@/components/feedback/DocumentPage'

export const privacyDraft: InstitutionalDocument = {
  title: 'Política de privacidade',
  description: 'Como seus dados são coletados, usados e protegidos.',
  notice:
    'Rascunho para revisão. Este texto ainda não é a política oficial: os campos entre colchetes precisam ser preenchidos e o conteúdo deve ser revisado antes da publicação.',
  updatedAt: '[data da versão final]',
  sections: [
    {
      heading: 'Quem cuida dos seus dados',
      paragraphs: [
        'A Essência Raiz | Consciência é mantida por [nome completo ou razão social da responsável], [CPF ou CNPJ], que é a controladora dos dados pessoais tratados na plataforma.',
        'Para qualquer assunto sobre privacidade, fale com [nome da pessoa encarregada] pelo e-mail [e-mail de contato para privacidade].',
      ],
    },
    {
      heading: 'Quais dados coletamos',
      paragraphs: [
        'Dados de conta: e-mail e senha. A senha é guardada pelo serviço de autenticação de forma protegida e ninguém da equipe tem acesso a ela.',
        'Perfil e preferências: nome de exibição, como você prefere ser chamada, a intenção e o período do dia que você escolheu no início. Essas respostas são opcionais.',
        'Uso da jornada: quais práticas de cada dia você iniciou ou concluiu, e quando.',
        'Diário: os textos que você escolher escrever. São tratados como conteúdo pessoal e sensível.',
        'Não pedimos dados de saúde, documentos, endereço ou informações de pagamento dentro da plataforma.',
      ],
    },
    {
      heading: 'Para que usamos',
      paragraphs: [
        'Para criar e manter a sua conta, mostrar a sua jornada, guardar o seu progresso e o seu diário, e personalizar a forma como falamos com você.',
        'A base legal é a execução do serviço que você contratou ou solicitou e, quando indicado, o seu consentimento. [Revisar com assessoria jurídica.]',
      ],
    },
    {
      heading: 'O seu diário',
      paragraphs: [
        'O diário é só seu. Ele nunca é público, nunca é usado para publicidade e não é enviado a terceiros sem o seu consentimento explícito.',
        'O acesso no banco de dados é restrito por regras de segurança que permitem que cada conta leia apenas os próprios registros.',
      ],
    },
    {
      heading: 'Com quem compartilhamos',
      paragraphs: [
        'Não vendemos nem alugamos dados pessoais.',
        'Usamos fornecedores para operar a plataforma: [Supabase, para autenticação e banco de dados, com servidores em (região do projeto)] e [serviço de hospedagem do site]. Eles tratam os dados apenas para prestar esse serviço.',
      ],
    },
    {
      heading: 'Por quanto tempo guardamos',
      paragraphs: [
        'Enquanto a sua conta existir. Quando você exclui a conta, perfil, progresso e diário são apagados definitivamente. [Informar se cópias de segurança são mantidas e por quanto tempo.]',
      ],
    },
    {
      heading: 'Seus direitos',
      paragraphs: [
        'Pela LGPD, você pode confirmar se tratamos seus dados, acessá-los, corrigi-los, pedir a portabilidade e a exclusão, e revogar consentimentos.',
        'Na própria plataforma, em Perfil e configurações, você pode consultar e editar seus dados, baixar uma cópia completa deles e excluir a sua conta. Para outros pedidos, use o contato acima.',
      ],
    },
    {
      heading: 'Segurança',
      paragraphs: [
        'A comunicação com a plataforma é criptografada (HTTPS) e cada conta só acessa os próprios dados. Nenhum sistema é totalmente imune a falhas; se acontecer um incidente que possa trazer risco a você, avisaremos conforme a lei.',
      ],
    },
    {
      heading: 'Dados guardados no seu navegador',
      paragraphs: [
        'O site guarda no seu navegador a sessão de acesso e o ponto em que você parou nos áudios, para retomar de onde estava. Não usamos cookies de publicidade nem ferramentas de rastreamento. [Revisar se alguma ferramenta de análise for adicionada.]',
      ],
    },
  ],
}
