import '@testing-library/jest-dom'
import React, {act} from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {rotas} from 'resources/rotas'
import {WebRoutes} from './web.routes'
import {MfTemplate} from 'types/interfaces'
import {obterDadoApi} from 'services/dadoApi'
import {GerenciadorStorage} from 'infrastructure/storage'
import {createBrowserRouter, createMemoryRouter} from 'react-router-dom'
import {EmpreendimentoBuilder} from 'helpers/builders'

const mockParams: MfTemplate = {
  auth: {
    accessToken: 'access_token',
    idToken: 'id_token',
  },
  obra: new EmpreendimentoBuilder().criar(),
}

const mockDadoApi = {
  id: 'id-abc',
  descricao: 'descrição mock',
}

const mockedGerenciadorStorage = GerenciadorStorage as jest.Mocked<
  typeof GerenciadorStorage
>
jest.mock('infrastructure/storage', () => ({
  GerenciadorStorage: {
    salvarObra: jest.fn(),
    salvarToken: jest.fn(),
  },
}))

const obterDadoApiMock = obterDadoApi as jest.Mock
jest.mock('services/dadoApi', () => ({
  obterDadoApi: jest.fn(),
}))

const createMemoryRouterMock = createMemoryRouter as jest.Mock
const createBrowserRouterMock = createBrowserRouter as jest.Mock

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    createMemoryRouter: jest.fn().mockImplementation(actual.createMemoryRouter),
    createBrowserRouter: jest
      .fn()
      .mockImplementation(actual.createBrowserRouter),
  }
})

describe('WebRoutes', () => {
  const localParams = {
    rootLocal: true,
    params: mockParams,
  }

  describe('Inicialização', () => {
    beforeEach(
      async () =>
        await act(async () => {
          render(<WebRoutes {...localParams} />)
        }),
    )
    test('DEVE salvar os tokens da autenticação ao inicializar', () => {
      expect(mockedGerenciadorStorage.salvarToken).toHaveBeenCalledWith(
        mockParams.auth,
      )
    })

    test('DEVE salvar a obra ao inicializar', () => {
      expect(mockedGerenciadorStorage.salvarObra).toHaveBeenCalledWith(
        mockParams.obra,
      )
    })

    test('DEVE criar o router com createBrowserRouter', () => {
      expect(createBrowserRouterMock).toHaveBeenCalledWith(expect.any(Array))
    })

    describe('QUANDO rootLocal é falso', () => {
      const remoteParams = {...localParams, rootLocal: false}

      beforeEach(async () => {
        mockedGerenciadorStorage.salvarObra.mockClear()
        mockedGerenciadorStorage.salvarToken.mockClear()

        await act(async () => render(<WebRoutes {...remoteParams} />))
      })

      test('NÃO DEVE salvar os tokens da autenticação ao inicializar', () => {
        expect(mockedGerenciadorStorage.salvarToken).not.toHaveBeenCalled()
      })

      test('NÃO DEVE salvar a obra ao inicializar', () => {
        expect(mockedGerenciadorStorage.salvarObra).not.toHaveBeenCalled()
      })

      test('DEVE criar o router com createMemoryRouter', () => {
        expect(createMemoryRouterMock).toHaveBeenCalledWith(expect.any(Array), {
          initialEntries: ['/'],
        })
      })

      test('DEVE criar o router iniciando na rota definida ', async () => {
        await act(async () => {
          render(
            <WebRoutes
              rotaInicial={`${rotas.OutraPagina}/123`}
              {...remoteParams}
            />,
          )
        })

        expect(createMemoryRouterMock).toHaveBeenCalledWith(expect.any(Array), {
          initialEntries: [`${rotas.OutraPagina}/123`],
        })
      })
    })
  })

  describe('hostDataLoader', () => {
    test('DEVE carregar a obra para as rotas', async () => {
      const obraMock = new EmpreendimentoBuilder().criar()
      window.history.pushState({}, '', rotas.Home)
      render(<WebRoutes {...localParams} params={{obra: obraMock}} />)

      await waitFor(() =>
        expect(
          screen.getByText(new RegExp(obraMock.nome, 'i')),
        ).toBeInTheDocument(),
      )
    })

    test('DEVE renderizar a animação de carregamento QUANDO está carregando os dados', async () => {
      window.history.pushState({}, '', rotas.Home)
      render(<WebRoutes {...localParams} />)

      expect(screen.getByTestId('carregando')).toBeInTheDocument()

      await waitFor(() => expect(screen.queryByTestId('carregando')).toBeNull())
    })
  })

  describe('HomePageLoader', () => {
    beforeEach(async () => {
      window.history.pushState({}, '', rotas.Home)

      await act(async () => {
        render(<WebRoutes {...localParams} />)
      })
    })
    test('DEVE carregar o dado do loader', async () => {
      await waitFor(() => {
        expect(screen.getByText(/Tudo certo por aqui!/i)).toBeInTheDocument()
      })
    })
  })

  describe('OutraPaginaPageLoader', () => {
    test('DEVE carregar o dado do servido na página', async () => {
      window.history.pushState({}, '', `${rotas.OutraPagina}/123`)
      obterDadoApiMock.mockResolvedValue(mockDadoApi)

      await act(async () => render(<WebRoutes {...localParams} />))

      await waitFor(() => {
        expect(
          screen.getByText(new RegExp(mockDadoApi.descricao, 'i')),
        ).toBeInTheDocument()
      })
    })

    test('DEVE enviar o erro ao obter dados para a página', async () => {
      window.history.pushState({}, '', `${rotas.OutraPagina}/123`)
      obterDadoApiMock.mockRejectedValue(new Error('erro ao obter dados'))

      await act(async () => render(<WebRoutes {...localParams} />))

      await waitFor(() => {
        expect(
          screen.getByText('Houve um erro ao acessar o Portal 360'),
        ).toBeInTheDocument()
      })
    })
  })
})
