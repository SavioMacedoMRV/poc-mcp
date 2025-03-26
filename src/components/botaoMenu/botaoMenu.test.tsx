import '@testing-library/jest-dom'
import {RenderResult, fireEvent, render} from '@testing-library/react'
import {BotaoMenu} from './botaoMenu'

describe('BotaoMenu', () => {
  let component: RenderResult

  const OpcoesMenuMock = () => (
    <button data-testid={'bnt-opcao-1'}> opção 1</button>
  )
  const IconeMock = (p: any) => <svg data-testid="icone-mock" {...p} />

  describe('Renderização', () => {
    beforeEach(() => {
      component = render(
        <BotaoMenu
          data-testid={'botao-menu'}
          icone={IconeMock}
          componenteOpcoes={<OpcoesMenuMock />}
        />,
      )
    })

    test('DEVE renderizar o botão corretamente', () => {
      expect(component.getByTestId('botao-menu')).toBeInTheDocument()
    })

    test('DEVE aplicar a cor ao icone', () => {
      const cor = 'blue'
      component.rerender(
        <BotaoMenu
          cor={cor}
          icone={IconeMock}
          componenteOpcoes={<OpcoesMenuMock />}
        />,
      )

      expect(component.getByTestId('icone').getAttribute('fill')).toBe(`${cor}`)
    })

    describe('QUANDO o menu de opções está visível', () => {
      beforeEach(() => {
        fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      })

      test('DEVE renderizar o menu suspenso corretamente', () => {
        expect(component.getByTestId('menu-suspenso')).toBeInTheDocument()
      })

      test('DEVE renderizar o titulo das opções corretamente', () => {
        const titulo = 'Opções ABC'
        component.rerender(
          <BotaoMenu
            data-testid={'botao-menu'}
            titulo={titulo}
            icone={IconeMock}
            componenteOpcoes={<OpcoesMenuMock />}
          />,
        )

        expect(component.getByText(titulo)).toBeInTheDocument()
      })

      test('DEVE aplicar a cor ao icone QUANDO o menu suspenso está visível', () => {
        const corAtivo = 'red'
        component.rerender(
          <BotaoMenu
            data-testid={'botao-menu'}
            icone={IconeMock}
            corAtivo={corAtivo}
            componenteOpcoes={<OpcoesMenuMock />}
          />,
        )

        expect(component.getByTestId('icone').getAttribute('fill')).toBe(
          `${corAtivo}`,
        )
      })
    })

    describe('QUANDO "desabilitado" for verdadeiro', () => {
      beforeEach(() => {
        component.rerender(
          <BotaoMenu
            desabilitado
            data-testid={'botao-menu'}
            botao={{texto: 'botao test'}}
            componenteOpcoes={<OpcoesMenuMock />}
          />,
        )
      })

      test('DEVE desabilitar o botão e aplicar o estilo corretamente', () => {
        const botao = component.getByTestId('botao-menu-exibir-opcoes')
        expect(botao).toBeDisabled()
        expect(botao).toHaveStyle(`cursor: default; opacity: 0.7`)
      })
    })

    describe('QUANDO é a propriedade "botao" é definida e "icone" indefinido', () => {
      const botaoTest = {texto: 'meu botão'}
      beforeEach(() => {
        component.rerender(
          <BotaoMenu
            data-testid={'botao-menu'}
            botao={botaoTest}
            componenteOpcoes={<OpcoesMenuMock />}
          />,
        )
      })

      test('DEVE renderizar o texto do botao', () => {
        expect(component.getByText(botaoTest.texto)).toBeInTheDocument()
      })

      test('DEVE renderizar o menu suspenso corretamente QUANDO clicar no texto', () => {
        fireEvent.click(component.getByTestId('botao-menu-exibir-opcoes'))
        expect(component.getByTestId('menu-suspenso')).toBeInTheDocument()
      })

      test('DEVE aplicar a "corAtiva" a borda QUANDO o menu suspenso está visível', () => {
        const corAtivo = 'red'
        component.rerender(
          <BotaoMenu
            botao={botaoTest}
            corAtivo={corAtivo}
            componenteOpcoes={<OpcoesMenuMock />}
          />,
        )

        fireEvent.click(component.getByTestId('btn-exibir-opcoes'))

        expect(component.getByTestId('btn-exibir-opcoes')).toHaveStyle(
          `border: 2px solid ${corAtivo};`,
        )
      })
    })
  })

  describe('Comportamento', () => {
    beforeEach(() => {
      component = render(
        <BotaoMenu
          data-testid={'botao-menu'}
          icone={IconeMock}
          componenteOpcoes={<OpcoesMenuMock />}
        />,
      )
    })

    test('DEVE exibir o menu suspenso corretamente QUANDO clicar no botão', () => {
      fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      expect(component.getByTestId('menu-suspenso')).toBeInTheDocument()
    })

    test('DEVE fechar o menu QUANDO clicar novamente no botão menu', () => {
      fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      expect(component.getByTestId('menu-suspenso')).toBeVisible()

      fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      expect(component.queryByTestId('menu-suspenso')).not.toBeInTheDocument()
    })

    test('DEVE fechar o menu QUANDO clicar em uma opção do menu', () => {
      fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      expect(component.getByTestId('menu-suspenso')).toBeVisible()

      fireEvent.click(component.getByTestId('bnt-opcao-1'))
      expect(component.queryByTestId('menu-suspenso')).not.toBeInTheDocument()
    })

    test('DEVE fechar o menu QUANDO clicar fora do dropdown', () => {
      fireEvent.click(component.getByTestId('botao-menu-icon-exibir-opcoes'))
      expect(component.getByTestId('menu-suspenso')).toBeVisible()

      fireEvent.mouseDown(document.body)
      expect(component.queryByTestId('menu-suspenso')).not.toBeInTheDocument()
    })
  })
})
