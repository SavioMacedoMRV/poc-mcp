import {RenderResult, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Botao} from './botao'
import {cores} from 'resources/cores'

describe('Botao', () => {
  const aoClicarMock = jest.fn()
  let component: RenderResult

  describe('Renderização', () => {
    beforeEach(() => {
      component = render(
        <Botao data-testid={'botao'} aoClicar={aoClicarMock} />,
      )
    })

    test('DEVE renderizar o texto do botão corretamente', () => {
      const texto = 'Clique aqui'
      component.rerender(<Botao aoClicar={aoClicarMock} texto={texto} />)
      expect(component.getByText(texto)).toBeInTheDocument()
    })

    test('DEVE aplicar a cor de fundo correta', () => {
      const cor = 'red'
      component.rerender(
        <Botao data-testid={'botao'} aoClicar={aoClicarMock} cor={cor} />,
      )
      expect(component.getByTestId('botao')).toHaveStyle(
        `background-color: ${cor}`,
      )
    })

    test('DEVE aplicar a cor de texto correta', () => {
      const corTexto = 'blue'
      component.rerender(
        <Botao
          data-testid={'botao'}
          aoClicar={aoClicarMock}
          texto="Clique aqui"
          corTexto={corTexto}
        />,
      )

      expect(component.getByTestId('texto-botao')).toHaveStyle(
        `color: ${corTexto}`,
      )
    })

    test('DEVE aplicar a altura e largura corretas', () => {
      const altura = 50
      const largura = 100
      component.rerender(
        <Botao
          data-testid={'botao'}
          aoClicar={aoClicarMock}
          altura={altura}
          largura={largura}
        />,
      )
      const botao = component.getByTestId('botao')
      expect(botao).toHaveStyle(`height: ${altura}px`)
      expect(botao).toHaveStyle(`width: ${largura}px`)
    })

    test('DEVE desabilitar o botão e aplicar o estilo corretamente', () => {
      component.rerender(
        <Botao data-testid={'botao'} aoClicar={aoClicarMock} disabled />,
      )
      const botao = component.getByTestId('botao')
      expect(botao).toBeDisabled()
      expect(botao).toHaveStyle(`cursor: default; opacity: 0.2`)
    })

    test('DEVE desabilitar o botão e aplicar o estilo corretamente com a cor especificada', () => {
      const cor = 'red'

      component.rerender(
        <Botao
          data-testid={'botao'}
          aoClicar={aoClicarMock}
          disabled
          corDesabilitado={cor}
        />,
      )
      const botao = component.getByTestId('botao')
      expect(botao).toBeDisabled()
      expect(botao).toHaveStyle(`
        cursor: default; 
        opacity: 0.2; 
        background-color: ${cor};
        `)
    })

    test('DEVE desabilitar o botão e aplicar o estilo no texto corretamente com a cor especificada passado no corTextoDesativado', () => {
      const cor = 'red'

      component.rerender(
        <Botao
          data-testid={'botao'}
          aoClicar={aoClicarMock}
          disabled
          corTextoDesativado={cor}
        />,
      )
      const textoBotao = component.getByTestId('texto-botao')
      expect(textoBotao).toHaveAttribute('cor', cor)
    })

    describe('QUANDO a propriedade icone for passada', () => {
      const IconeMock = (p: any) => <svg data-testid="icone-mock" {...p} />
      test('DEVE renderizar o ícone', () => {
        component.rerender(
          <Botao
            data-testid={'botao'}
            aoClicar={aoClicarMock}
            icone={IconeMock}
          />,
        )
        expect(component.getByTestId('icone-mock')).toBeInTheDocument()
      })

      test('DEVE aplicar as estilização correta ao icone', () => {
        const altura = 50
        const largura = 100
        const cor = 'red'
        component.rerender(
          <Botao
            data-testid={'botao'}
            aoClicar={aoClicarMock}
            icone={IconeMock}
            iconeProps={{altura, largura, cor}}
          />,
        )

        expect(component.getByTestId('icone-mock').getAttribute('height')).toBe(
          `${altura}`,
        )
        expect(component.getByTestId('icone-mock').getAttribute('width')).toBe(
          `${largura}`,
        )
        expect(component.getByTestId('icone-mock').getAttribute('fill')).toBe(
          `${cor}`,
        )
      })

      test('DEVE aplicar a cor correta QUANDO o botão estiver desabilitado', () => {
        component.rerender(
          <Botao
            disabled
            data-testid={'botao'}
            aoClicar={aoClicarMock}
            icone={IconeMock}
          />,
        )

        expect(component.getByTestId('icone-mock').getAttribute('fill')).toBe(
          `${cores.neutralDark}`,
        )
      })

      test('DEVE aplicar o espaçamento entre o texto e o ícone', () => {
        component.rerender(
          <Botao
            data-testid={'botao'}
            aoClicar={aoClicarMock}
            espaco={8}
            icone={IconeMock}
          />,
        )
        const botao = component.getByTestId('botao')
        expect(botao).toHaveStyle('gap: 8px')
      })
    })
  })

  describe('Comportamento', () => {
    beforeEach(() => {
      aoClicarMock.mockClear()
      component = render(
        <Botao aoClicar={aoClicarMock} data-testid={'botao'} />,
      )
    })

    test('DEVE executar a função "aoClicar" QUANDO o botão é clicado', () => {
      fireEvent.click(component.getByTestId('botao'))
      expect(aoClicarMock).toHaveBeenCalledTimes(1)
    })
  })
})
