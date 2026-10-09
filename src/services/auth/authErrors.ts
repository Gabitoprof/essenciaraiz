export type AuthErrorCode =
  | 'invalid_credentials'
  | 'email_taken'
  | 'weak_password'
  | 'email_not_confirmed'
  | 'invalid_email'
  | 'same_password'
  | 'signup_disabled'
  | 'rate_limited'
  | 'network'
  | 'session_missing'
  | 'demo_account_not_found'
  | 'not_available_in_demo'
  | 'unknown'

const messages: Record<AuthErrorCode, string> = {
  invalid_credentials: 'E-mail ou senha incorretos. Confira os dados e tente de novo.',
  email_taken: 'Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.',
  weak_password: 'Essa senha é fraca demais. Use pelo menos 8 caracteres, misturando letras e números.',
  email_not_confirmed: 'Seu e-mail ainda não foi confirmado. Abra o link que enviamos para a sua caixa de entrada.',
  invalid_email: 'Esse e-mail não parece válido. Confira se foi digitado corretamente.',
  same_password: 'A nova senha precisa ser diferente da anterior.',
  signup_disabled: 'Novos cadastros estão temporariamente fechados.',
  rate_limited: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.',
  network: 'Não foi possível conectar. Verifique sua internet e tente novamente.',
  session_missing: 'Sua sessão expirou ou o link não é mais válido. Entre novamente ou peça um novo link.',
  demo_account_not_found:
    'Não encontramos uma conta de demonstração com este e-mail neste navegador. Crie uma conta para testar.',
  not_available_in_demo:
    'No modo demonstração nenhum e-mail é enviado. A recuperação de senha funciona quando o Supabase estiver configurado.',
  unknown: 'Algo não saiu como esperado. Tente novamente em instantes.',
}

/** Erro de autenticação com código próprio, independente do fornecedor (Supabase ou demonstração). */
export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode, cause?: unknown) {
    super(messages[code], { cause })
    this.name = 'AuthError'
    this.code = code
  }
}

/** Mensagem em português para mostrar à participante, seja qual for o erro recebido. */
export function authErrorMessage(error: unknown): string {
  return error instanceof AuthError ? error.message : messages.unknown
}
