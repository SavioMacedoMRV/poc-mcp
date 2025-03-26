import '@testing-library/jest-dom'
import {RenderResult, render} from '@testing-library/react'
import {ContainerPage} from './containerPage'
import {cores} from 'resources/cores'
import {act} from 'react'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('ContainerPage', () => {
  let component: RenderResult

  describe('Renderizaçao', () => {
    beforeEach(() => {
      component = render(<ContainerPage>teste</ContainerPage>)
    })

    test('DEVE renderizar o container principal', () => {
      expect(component.getByTestId('container-page-ordens')).toBeInTheDocument()
    })

    test('DEVE renderizar o cabeçalho', () => {
      expect(component.getByTestId('cabecalho')).toBeInTheDocument()
    })

    test('DEVE renderizar o campo de pesquisa no cabeçalho QUANDO "pesquisa" for definida nas propriedades do cabeçalho', () => {
      component.rerender(
        <ContainerPage cabecalhoProps={{pesquisa: {aoPesquisar: jest.fn}}}>
          teste
        </ContainerPage>,
      )
      expect(component.getByTestId('pesquisa-cabecalho')).toBeInTheDocument()
    })

    test('NÃO DEVE renderizar o cabeçalho QUANDO "semCabecalho" for definido', () => {
      component.rerender(<ContainerPage semCabecalho>teste</ContainerPage>)

      expect(component.queryByTestId('cabecalho')).not.toBeInTheDocument()
    })

    test('DEVE renderizar o content"', () => {
      expect(component.getByTestId('content-page-ordens')).toBeInTheDocument()
    })

    test('DEVE renderizar o container principal com a cor de fundo passada pelas props', () => {
      component.rerender(
        <ContainerPage corFundo={cores.background02}>teste</ContainerPage>,
      )
      const container = component.getByTestId('container-page-ordens')

      expect(container).toHaveStyle(`background: ${cores.background02}`)
    })

    describe('QUANDO "comBotaoScrollTop" for verdadeiro', () => {
      beforeEach(() => {
        component = render(
          <ContainerPage comBotaoScrollTop>teste</ContainerPage>,
        )
      })

      test('NÃO DEVE renderizar o botão "voltar ao início" QUANDO não conter rolagem', async () => {
        window.scrollY = 600
        window.innerHeight = 600

        await act(async () => window.dispatchEvent(new Event('scroll')))

        expect(component.getByText('voltar ao início')).toBeDefined()
      })

      test('DEVE renderizar o botão "voltar ao início" QUANDO estiver no fim da rolagem', async () => {
        window.scrollY = 800
        window.innerHeight = 600

        await act(async () => window.dispatchEvent(new Event('scroll')))

        expect(component.getByText('voltar ao início')).toBeDefined()
      })
    })
  })
})
