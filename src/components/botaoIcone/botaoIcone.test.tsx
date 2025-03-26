import {RenderResult, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {BotaoIcone} from './botaoIcone'
import icone from 'icons/iSeta.svg'

describe('BotaoIcone', () => {
  const aoClicarMock = jest.fn()
  let component: RenderResult

  describe('Renderização', () => {
    beforeEach(() => {
      component = render(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
        />,
      )
    })

    test('DEVE renderizar o botão corretamente', () => {
      expect(
        component.getByTestId('botao-icone').querySelector('svg'),
      ).toBeInTheDocument()
    })

    test('DEVE aplicar a cor ao icone', () => {
      const cor = 'blue'
      component.rerender(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
          cor={cor}
        />,
      )

      expect(component.getByTestId('icone').getAttribute('fill')).toBe(`${cor}`)
    })

    test('DEVE aplicar a altura e largura corretas ao icone', () => {
      const altura = 50
      const largura = 100
      component.rerender(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
          altura={altura}
          largura={largura}
        />,
      )

      expect(component.getByTestId('icone').getAttribute('height')).toBe(
        `${altura}`,
      )
      expect(component.getByTestId('icone').getAttribute('width')).toBe(
        `${largura}`,
      )
    })

    test('DEVE desabilitar o botão e aplicar o estilo corretamente', () => {
      component.rerender(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
          disabled
        />,
      )
      const botao = component.getByTestId('botao-icone')
      expect(botao).toBeDisabled()
      expect(botao).toHaveStyle(`cursor: not-allowed; opacity: 0.2`)
    })

    test('DEVE renderizar o botão com  borda QUANDO borda for definido', () => {
      component.rerender(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
          cor={'red'}
          borda
        />,
      )
      const botao = component.getByTestId('botao-icone')
      expect(botao).toHaveStyle(`border: 2px solid red`)
    })
  })

  describe('Comportamento', () => {
    beforeEach(() => {
      aoClicarMock.mockClear()
      component = render(
        <BotaoIcone
          data-testid={'botao-icone'}
          icone={icone}
          aoClicar={aoClicarMock}
        />,
      )
    })

    test('DEVE executar a função "aoClicar" QUANDO o botão é clicado', () => {
      fireEvent.click(component.getByTestId('botao-icone'))
      expect(aoClicarMock).toHaveBeenCalledTimes(1)
    })
  })
})
