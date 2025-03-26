import {Empreendimento} from 'types/interfaces'
import {GerenciadorStorage} from './gerenciadorStorage'

const key_obra = 'mrv-portal-360-obra'
const key_tokens = 'mrv-portal-360-tokens'

const tokens = {
  accessToken: 'accessToken',
  idToken: 'idToken',
}

const obra: Empreendimento = {
  id: 'idObra',
  nome: 'Obra FOO',
}

describe('GerenciadorStorage', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store: {[key: string]: string} = {}
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString()
        },
        removeItem: (key: string) => {
          delete store[key]
        },
        clear: () => {
          store = {}
        },
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    })
  })

  test('DEVE salvar a obra informada', () => {
    const mockSetItem = jest.spyOn(localStorage, 'setItem')

    GerenciadorStorage.salvarObra(obra)

    expect(mockSetItem).toHaveBeenCalledWith(key_obra, JSON.stringify(obra))
  })

  test('DEVE retornar a obra armazenada', () => {
    const mockGetItem = jest.spyOn(localStorage, 'getItem')
    GerenciadorStorage.salvarObra(obra)

    const resultado = GerenciadorStorage.obterObra()

    expect(mockGetItem).toHaveBeenCalledWith(key_obra)
    expect(resultado).toEqual(obra)
  })

  test('DEVE retornar nulo QUANDO não existe obra salva', () => {
    const mockGetItem = jest.spyOn(localStorage, 'getItem')

    const resultado = GerenciadorStorage.obterObra()

    expect(mockGetItem).toHaveBeenCalledWith(key_obra)
    expect(resultado).toBeNull()
  })

  test('DEVE excluir a obra salva', () => {
    const mockRemoveItem = jest.spyOn(localStorage, 'removeItem')

    GerenciadorStorage.excluirObra()

    expect(mockRemoveItem).toHaveBeenCalledWith(key_obra)
  })
})

describe('GerenciadorStorage', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store: {[key: string]: string} = {}
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString()
        },
        removeItem: (key: string) => {
          delete store[key]
        },
        clear: () => {
          store = {}
        },
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    })
  })

  test('DEVE salvar os tokens informados', () => {
    const mockSetItem = jest.spyOn(localStorage, 'setItem')

    GerenciadorStorage.salvarToken(tokens)

    expect(mockSetItem).toHaveBeenCalledWith(key_tokens, JSON.stringify(tokens))
  })

  test('DEVE retornar os tokens armazenados', () => {
    const mockGetItem = jest.spyOn(localStorage, 'getItem')
    GerenciadorStorage.salvarToken(tokens)

    const resultado = GerenciadorStorage.obterToken()

    expect(mockGetItem).toHaveBeenCalledWith(key_tokens)
    expect(resultado).toEqual(tokens)
  })

  test('DEVE retornar nulo QUANDO não existe tokens salvos', () => {
    const mockGetItem = jest.spyOn(localStorage, 'getItem')

    const resultado = GerenciadorStorage.obterToken()

    expect(mockGetItem).toHaveBeenCalledWith(key_tokens)
    expect(resultado).toBeNull()
  })

  test('DEVE excluir os tokens salvos', () => {
    const mockRemoveItem = jest.spyOn(localStorage, 'removeItem')

    GerenciadorStorage.excluirToken()

    expect(mockRemoveItem).toHaveBeenCalledWith(key_tokens)
  })
})
