import {RenderResult, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {BotaoScrollTop} from './botaoScrollTop'
import {act} from 'react'
import {Evento} from 'types/enums'
import {RegistrarEvento} from 'infrastructure/logs'

jest.mock('infrastructure/logs', () => ({
  RegistrarEvento: jest.fn(),
}))
const RegistrarEventoMock = RegistrarEvento as jest.Mock

describe('BotaoScrollTop', () => {
  let component: RenderResult

  describe('Renderização', () => {
    beforeEach(() => {
      component = render(<BotaoScrollTop />)
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

  describe('Comportamento', () => {
    beforeEach(() => {
      component = render(<BotaoScrollTop />)
    })

    describe('QUANDO clicar no botão "voltar ao início"', () => {
      const scrollToMock = jest.fn()
      window.scrollTo = scrollToMock

      beforeEach(async () => {
        window.scrollY = 800
        window.innerHeight = 600

        await act(async () => window.dispatchEvent(new Event('scroll')))

        const botao = component.getByTestId('btn-scroll-top')
        fireEvent.click(botao)
      })

      test(`DEVE registrar o evento "${Evento.BotaoScrollTopClick}"`, () => {
        expect(RegistrarEventoMock).toHaveBeenCalledWith({
          evento: Evento.BotaoScrollTopClick,
        })
      })

      test('DEVE rolar até o início do conteúdo', () => {
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth',
        })
      })

      test('DEVE chamar a função aoClicar', async () => {
        const aoClicarMock = jest.fn()

        component.rerender(<BotaoScrollTop aoClicar={aoClicarMock} />)

        window.scrollY = 800
        window.innerHeight = 600
        await act(async () => window.dispatchEvent(new Event('scroll')))

        const botao = component.getByTestId('btn-scroll-top')
        fireEvent.click(botao)

        expect(aoClicarMock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
