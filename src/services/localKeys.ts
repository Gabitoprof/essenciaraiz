/**
 * Chaves usadas no localStorage deste navegador, num só lugar,
 * para que "excluir meus dados" não deixe nada para trás.
 */
export const localKeys = {
  progress: (userId: string) => `essencia-raiz:progresso:${userId}`,
  journal: (userId: string) => `essencia-raiz:diario:${userId}`,
  /** Posição de retomada de cada áudio (não é dado pessoal, mas é removida junto). */
  audioPositionPrefix: 'essencia-raiz:audio-posicao:',
}

/** Apaga deste navegador tudo o que pertence à conta e as posições de áudio. */
export function clearLocalUserData(userId: string) {
  try {
    localStorage.removeItem(localKeys.progress(userId))
    localStorage.removeItem(localKeys.journal(userId))
    const audioKeys: string[] = []
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (key?.startsWith(localKeys.audioPositionPrefix)) audioKeys.push(key)
    }
    audioKeys.forEach((key) => localStorage.removeItem(key))
  } catch {
    // Armazenamento indisponível: não há o que apagar.
  }
}
