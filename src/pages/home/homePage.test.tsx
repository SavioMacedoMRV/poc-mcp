import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {HomePage} from './homePage'
import {EmpreendimentoBuilder} from 'helpers/builders'
import {Evento} from 'types/enums'
import {RegistrarEvento} from 'infrastructure/logs'
import {rotas} from 'resources/rotas'

const mockObra = new EmpreendimentoBuilder().criar()

const mockDataLoad = {info: 'mock data load'}

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteLoaderData: jest.fn().mockImplementation(() => ({
    obra: mockObra,
  })),
  useLoaderData: jest.fn().mockImplementation(() => mockDataLoad),
  useNavigate: () => mockNavigate,
}))

const RegistrarEventoMock = RegistrarEvento as jest.Mock
jest.mock('infrastructure/logs', () => ({
  RegistrarEvento: jest.fn(),
}))

describe('HomePage', () => {
  describe('Renderização', () => {
    beforeEach(() => render(<HomePage />))
    test('DEVE renderizar o titulo da página', () => {
      const textElement = screen.getByText(/portal 360 web - template/i)
      expect(textElement).toBeInTheDocument()
    })

    test('DEVE renderizar o nome da obra', () => {
      expect(
        screen.getByText(new RegExp(mockObra.nome, 'i')),
      ).toBeInTheDocument()
    })

    test('DEVE renderizar o dado da rota', () => {
      expect(
        screen.getByText(new RegExp(mockDataLoad.info, 'i')),
      ).toBeInTheDocument()
    })
  })

  describe('Comportamento', () => {
    beforeEach(() => {
      mockNavigate.mockClear()
      RegistrarEventoMock.mockClear()

      render(<HomePage />)
    })
    describe('QUANDO clicar no botão "Navegar para outra página"', () => {
      test(`DEVE registrar o evento "${Evento.HomePageClickNavegarOutraPagina}"`, () => {
        const botao = screen.getByTestId('btn-navegar-outra-pagina')
        fireEvent.click(botao)

        expect(RegistrarEventoMock).toHaveBeenCalledWith({
          evento: Evento.HomePageClickNavegarOutraPagina,
        })
      })

      test('DEVE navegar para a outra página', () => {
        const botao = screen.getByTestId('btn-navegar-outra-pagina')
        fireEvent.click(botao)

        expect(mockNavigate).toHaveBeenCalledWith(`${rotas.OutraPagina}/12345`)
      })
    })
  })
})
