import {InternalAxiosRequestConfig} from 'axios'
import {AutenticacaoInterceptor} from './autenticacao.interceptor'
import {Empreendimento} from 'types/interfaces'
import {GerenciadorStorage} from 'infrastructure/storage'

const mockTokens = {
  accessToken: 'accessToken',
  idToken: 'idToken',
}

const mockObra: Empreendimento = {
  id: 'idobra',
  nome: 'Obra Teste',
}

jest.mock('infrastructure/storage', () => ({
  GerenciadorStorage: {
    obterObra: jest.fn().mockImplementation(() => mockObra),
    obterToken: jest.fn().mockImplementation(() => mockTokens),
  },
}))

const mockedGerenciadorStorage = GerenciadorStorage as jest.Mocked<
  typeof GerenciadorStorage
>

describe('AutenticacaoInterceptor', () => {
  describe('QUANDO existir tokens', () => {
    test('DEVE adicionar "Authorization" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig

      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers.Authorization).toEqual('Bearer accessToken')
    })

    test('DEVE adicionar "x-id-token" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig

      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers['x-id-token']).toEqual('idToken')
    })
  })

  describe('QUANDO não exisitir tokens', () => {
    beforeEach(() => {
      mockedGerenciadorStorage.obterToken.mockReturnValueOnce(null)
    })
    test('NÃO DEVE adicionar "Authorization" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig
      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers.Authorization).toBeUndefined()
    })

    test('NÃO DEVE adicionar "x-id-token" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig
      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers['x-id-token']).toBeUndefined()
    })
  })

  describe('QUANDO existir obra salva', () => {
    test('DEVE adicionar "x-empreendimento" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig

      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers['x-empreendimento']).toEqual(mockObra.id)
    })
  })

  describe('QUANDO não existir obra salva', () => {
    beforeEach(() => {
      mockedGerenciadorStorage.obterObra.mockReturnValueOnce(null)
    })
    test('NÃO DEVE adicionar "x-empreendimento" no header', async () => {
      const config = {headers: {}} as InternalAxiosRequestConfig

      const resultado = await AutenticacaoInterceptor(config)

      expect(resultado.headers['x-empreendimento']).toBeUndefined()
    })
  })
})
