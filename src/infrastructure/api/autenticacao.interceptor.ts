import {InternalAxiosRequestConfig} from 'axios'
import {GerenciadorStorage} from 'infrastructure/storage'

export async function AutenticacaoInterceptor(
  config: InternalAxiosRequestConfig,
) {
  const tokens = GerenciadorStorage.obterToken()
  const obra = GerenciadorStorage.obterObra()

  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
    config.headers['x-id-token'] = tokens.idToken
  }

  if (obra) {
    config.headers['x-empreendimento'] = obra.id
  }

  return config
}
