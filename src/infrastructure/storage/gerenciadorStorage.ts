import {Empreendimento} from 'types/interfaces'

const CHAVE_OBRA = 'mrv-portal-360-obra'
const CHAVE_TOKENS = 'mrv-portal-360-tokens'

export function salvarObra(obra: Empreendimento) {
  localStorage.setItem(CHAVE_OBRA, JSON.stringify(obra))
}

export function obterObra() {
  const savedData = localStorage.getItem(CHAVE_OBRA)
  if (savedData) {
    return JSON.parse(savedData) as Empreendimento
  }

  return null
}

export function excluirObra() {
  localStorage.removeItem(CHAVE_OBRA)
}

interface Tokens {
  accessToken: string
  idToken: string
}

export function salvarToken(tokens: Tokens) {
  localStorage.setItem(CHAVE_TOKENS, JSON.stringify(tokens))
}

export function obterToken() {
  const savedData = localStorage.getItem(CHAVE_TOKENS)
  if (savedData) {
    return JSON.parse(savedData) as Tokens
  }

  return null
}

export function excluirToken() {
  localStorage.removeItem(CHAVE_TOKENS)
}

export const GerenciadorStorage = {
  salvarObra,
  obterObra,
  excluirObra,
  salvarToken,
  obterToken,
  excluirToken,
}
