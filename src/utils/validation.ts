/**
 * Validações dos formulários de entrada, com mensagens em português.
 * Cada função devolve a mensagem de erro, ou `undefined` quando o valor está ok.
 * São só para ajudar a participante: o Supabase valida tudo de novo no servidor.
 */

export const PASSWORD_MIN_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateDisplayName(value: string) {
  const name = value.trim()
  if (!name) return 'Conte como você gostaria de ser chamada.'
  if (name.length < 2) return 'O nome precisa ter pelo menos 2 letras.'
  if (name.length > 60) return 'Use no máximo 60 caracteres.'
  return undefined
}

export function validateEmail(value: string) {
  const email = value.trim()
  if (!email) return 'Informe seu e-mail.'
  if (!EMAIL_PATTERN.test(email)) return 'Esse e-mail não parece válido. Exemplo: nome@email.com'
  return undefined
}

/** No login só exigimos que a senha seja preenchida: a regra de força vale para senhas novas. */
export function validateRequiredPassword(value: string) {
  return value ? undefined : 'Informe sua senha.'
}

export function validateNewPassword(value: string) {
  if (!value) return 'Crie uma senha.'
  if (value.length < PASSWORD_MIN_LENGTH) return `A senha precisa ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
  if (!/[A-Za-zÀ-ÿ]/.test(value) || !/\d/.test(value)) return 'Misture letras e números na senha.'
  return undefined
}

export function validatePasswordConfirmation(password: string, confirmation: string) {
  if (!confirmation) return 'Repita a senha para confirmar.'
  if (password !== confirmation) return 'As senhas não são iguais.'
  return undefined
}
