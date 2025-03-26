import '@testing-library/jest-dom'
import {RenderResult, fireEvent, render, waitFor} from '@testing-library/react'
import {Input, truncarTexto} from './input'
import {TextoProps} from 'components/texto/texto.styles'
import {cores} from 'resources/cores'
import EdicaoSVG from 'icons/iEdicao.svg'

describe('Input', () => {
  let component: RenderResult
  describe('DEVE renderização', () => {
    beforeEach(() => {
      component = render(<Input />)
    })

    test('DEVE renderizar o componente corretamente', () => {
      expect(component.getByTestId('input-input')).toBeInTheDocument()
    })

    test('DEVE renderizar o componente com o texto correto', () => {
      const texto = 'Exemplo de texto'
      component = render(<Input valor={texto} />)

      expect(component.getByDisplayValue(texto)).toBeInTheDocument()
    })

    test('DEVE aplicar as dimensões corretas para o componente', () => {
      const altura = 40
      const largura = 100
      component.rerender(<Input altura={altura} largura={largura} />)
      const input = component.getByTestId('input')
      expect(input).toHaveStyle(`width: ${largura}px; height: ${altura}px`)
    })

    test('DEVE renderizar a borda corretamente com a cor informada', () => {
      component.rerender(<Input corBorda={'red'} />)
      const input = component.getByTestId('input')
      expect(input).toHaveStyle(`border: 2px solid red`)
    })

    test('DEVE renderizar a borda corretamente QUANDO desabilitado', () => {
      component.rerender(<Input desabilitado />)
      const input = component.getByTestId('input')
      expect(input).toHaveStyle(`border: 2px solid ${cores.background01}`)
    })

    test('DEVE renderizar o input sem borda QUANDO semBorda for definido', () => {
      component.rerender(<Input semBorda />)
      const input = component.getByTestId('input')
      expect(input).toHaveStyle(`border: none`)
    })

    test('DEVE aplicar os estilos de texto para o input', () => {
      const textoProps: TextoProps = {
        tamanho: 12,
        alturalinha: 16,
        estilo: 'bold',
        cor: 'blue',
        alinhamento: 'center',
        cursor: 'pointer',
        transformar: 'uppercase',
      }

      component.rerender(<Input textoProps={textoProps} />)
      const input = component.getByTestId('input-input')
      expect(input).toHaveStyle(`
        font-size: 12px;
        line-height: 16px;
        font-family: AvertaStd-Black;
        color: blue;
        text-align: center;
        cursor: pointer;
        text-transform: uppercase
    `)
    })

    test('DEVE aplica a cor no texto QUANDO for passada pela props corTextoDesativado e o desativado for true', () => {
      component.rerender(
        <Input desabilitado={true} corTextoDesativado="blue" />,
      )
      const input = component.getByTestId('input-input')
      expect(input).toHaveStyle(`
        color: blue;
    `)
    })

    test('DEVE renderizar o placeholder QUANDO a prop placeholder for fornecida', () => {
      const placeholderText = 'Digite algo aqui'
      component.rerender(<Input placeholder={placeholderText} />)
      const input = component.getByTestId('input-input')
      expect(input).toHaveAttribute('placeholder', placeholderText)
    })

    describe('QUANDO o tipo é "pesquisa"', () => {
      beforeEach(() =>
        component.rerender(<Input data-testid="pesquisa" tipo={'pesquisa'} />),
      )

      test('DEVE renderizar o ícone de pesquisa ', () => {
        expect(
          component.getByTestId('btn-pesquisa-pesquisar'),
        ).toBeInTheDocument()
      })

      test('DEVE renderizar o ícone de limpar pesquisa QUANDO há um valor', () => {
        component = render(
          <Input data-testid={'pesquisa'} tipo={'pesquisa'} valor={'texto'} />,
        )

        expect(component.getByTestId('btn-pesquisa-limpar')).toBeInTheDocument()
      })

      test('DEVE renderizar o ícone com o estilo passado pela iconeProps', () => {
        component.rerender(
          <Input
            data-testid={'pesquisa'}
            tipo={'pesquisa'}
            icone={{
              icone: EdicaoSVG,
              cor: cores.complementary05,
              largura: 24,
              altura: 24,
            }}
          />,
        )

        const svgIcon = component.getByTestId('icone-pesquisa-icone')
        expect(svgIcon).toHaveAttribute('width', '24')
        expect(svgIcon).toHaveAttribute('height', '24')
        expect(svgIcon).toHaveAttribute('fill', cores.complementary05)
      })
    })

    describe('QUANDO o tipo é "textarea"', () => {
      beforeEach(() =>
        component.rerender(<Input data-testid="textarea" tipo={'textarea'} />),
      )

      test('DEVE renderizar o ícone de pesquisa ', () => {
        expect(
          component.getByTestId('btn-textarea-pesquisar'),
        ).toBeInTheDocument()
      })

      test('DEVE renderizar o ícone de limpar pesquisa QUANDO há um valor', () => {
        component = render(
          <Input data-testid={'textarea'} tipo={'textarea'} valor={'texto'} />,
        )

        expect(component.getByTestId('btn-textarea-limpar')).toBeInTheDocument()
      })

      test('NÃO DEVE renderizar o ícone de pesquisa QUANDO a props desabilitaIcone for true ', () => {
        component = render(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            desabilitaIcone={true}
          />,
        )
        expect(component.queryByTestId('bnt-pesquisa-pesquisar')).toBeNull()
      })

      test('DEVE renderizar o ícone com o estilo passado pela iconeProps', () => {
        component.rerender(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            icone={{
              icone: EdicaoSVG,
              cor: cores.complementary05,
              largura: 24,
              altura: 24,
            }}
          />,
        )

        const svgIcon = component.getByTestId('icone-textarea-icone')
        expect(svgIcon).toHaveAttribute('width', '24')
        expect(svgIcon).toHaveAttribute('height', '24')
        expect(svgIcon).toHaveAttribute('fill', cores.complementary05)
      })

      test('DEVE renderizar o texto truncado com a reticências no final QUANDO o valor do texto for maior que a quantidade máxima de linhas passada', async () => {
        const texto =
          'LOCAÇÃO DE CAMINHÕES BASCULANTES, ESCAVADEIRAS, RETROESCAVADEIRAS E OUTROS EQUIPAMENTOS PESADOS PARA OBRAS, TERRAPLENAGEM E CONSTRUÇÃO CIVIL, ATENDENDO PROJETOS URBANOS E RURAIS (URBAMAIS)'
        Object.defineProperty(HTMLTextAreaElement.prototype, 'clientWidth', {
          value: 440,
          configurable: true,
        })

        component.rerender(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            numeroMaxLinhas={2}
            valor={texto}
          />,
        )
        await waitFor(async () => {
          expect(
            component.getByText(
              'LOCAÇÃO DE CAMINHÕES BASCULANTES, ESCAVADEIRAS, RETROESCAVADEIRAS E OUTROS EQUIPAMENTOS PESADOS PA...',
            ),
          ).toBeInTheDocument()
        })
      })

      test('NAO DEVE renderizar o texto truncado QUANDO não for passado o número de máximo de linhas', async () => {
        const texto =
          'LOCAÇÃO DE CAMINHÕES BASCULANTES, ESCAVADEIRAS, RETROESCAVADEIRAS E OUTROS EQUIPAMENTOS PESADOS PARA OBRAS, TERRAPLENAGEM E CONSTRUÇÃO CIVIL, ATENDENDO PROJETOS URBANOS E RURAIS (URBAMAIS)'
        Object.defineProperty(HTMLTextAreaElement.prototype, 'clientWidth', {
          value: 440,
          configurable: true,
        })

        component.rerender(
          <Input data-testid={'textarea'} tipo={'textarea'} valor={texto} />,
        )
        await waitFor(async () => {
          expect(component.getByText(texto)).toBeInTheDocument()
        })
      })

      test('NAO DEVE renderizar o texto truncado QUANDO não obter a largura do textarea', async () => {
        const texto =
          'LOCAÇÃO DE CAMINHÕES BASCULANTES, ESCAVADEIRAS, RETROESCAVADEIRAS E OUTROS EQUIPAMENTOS PESADOS PARA OBRAS, TERRAPLENAGEM E CONSTRUÇÃO CIVIL, ATENDENDO PROJETOS URBANOS E RURAIS (URBAMAIS)'

        component = render(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            valor={texto}
            numeroMaxLinhas={2}
          />,
        )
        await waitFor(async () => {
          expect(component.getByText(texto)).toBeInTheDocument()
        })
      })

      test('DEVE renderizar o texto com o estilo passado pela textoProps', () => {
        component.rerender(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            valor={'texto'}
            textoProps={{tamanho: 12, cor: cores.neutralDark, alturalinha: 20}}
          />,
        )

        const texto = component.getByText('texto')
        expect(texto).toHaveAttribute('tamanho', '12')
        expect(texto).toHaveAttribute('cor', `${cores.neutralDark}`)
        expect(texto).toHaveAttribute('alturalinha', '20')
      })

      describe('truncarTexto', () => {
        beforeAll(() => {
          jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
            return {
              fontSize: '16px',
            } as CSSStyleDeclaration
          })
        })

        afterAll(() => {
          jest.restoreAllMocks()
        })
        test('Deve retornar o texto original QUANDO não excede o limite', () => {
          const ref = createMockRef(200)
          const resultado = truncarTexto({
            valor: 'Texto curto',
            numeroMaxLinhas: 2,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto curto')
        })

        test('DEVE truncar o texto QUANDO excede o limite', () => {
          const ref = createMockRef(250)
          const resultado = truncarTexto({
            valor: 'Texto muito longo que deve ser truncado',
            numeroMaxLinhas: 1,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto muito longo que de...')
        })

        test('DEVE retornar o texto original QUANDO numeroMaxLinhas não é fornecido', () => {
          const ref = createMockRef(200)
          const resultado = truncarTexto({
            valor: 'Texto que não deve ser truncado',
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto que não deve ser truncado')
        })

        test('DEVE retornar o texto original QUANDO current é undefined', () => {
          const ref = {current: null} as React.RefObject<HTMLTextAreaElement>
          const resultado = truncarTexto({
            valor: 'Texto longo',
            numeroMaxLinhas: 2,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto longo')
        })

        test('DEVE retornar o texto original QUANDO clientWidth é undefined', () => {
          const ref = {current: {}} as React.RefObject<HTMLTextAreaElement>
          const resultado = truncarTexto({
            valor: 'Texto longo',
            numeroMaxLinhas: 2,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto longo')
        })

        test('DEVE retornar um valor vazio QUANDO valor é uma string vazia', () => {
          const ref = createMockRef(200)
          const resultado = truncarTexto({
            valor: '',
            numeroMaxLinhas: 2,
            textAreaRef: ref,
          })
          expect(resultado).toBe('')
        })

        test('DEVE calcular corretamente maxChars com diferentes tamanhos de fonte', () => {
          const ref = createMockRef(200)
          Object.defineProperty(ref.current, 'style', {
            value: {fontSize: '20px'},
          })
          const resultado = truncarTexto({
            valor: 'Texto que pode ser truncado',
            numeroMaxLinhas: 1,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto que pode ser...')
        })

        test('DEVE truncar corretamente com clientWidth e tamanho da fonte variáveis', () => {
          const ref = createMockRef(320)
          const resultado = truncarTexto({
            valor: 'Texto longo que deve ser truncado em múltiplas linhas',
            numeroMaxLinhas: 1,
            textAreaRef: ref,
          })
          expect(resultado).toBe('Texto longo que deve ser trunca...')
        })
      })
    })
  })

  describe('Comportamento', () => {
    const aoDesfocarMock = jest.fn()
    const aoDigitarMock = jest.fn()
    const aoSubmeterMock = jest.fn()
    const aoFocarMock = jest.fn()
    beforeEach(() => {
      aoDesfocarMock.mockClear()
      aoDigitarMock.mockClear()
      aoSubmeterMock.mockClear()
      aoFocarMock.mockClear()
      component = render(
        <Input
          valor={'Abc123'}
          aoDesfocar={aoDesfocarMock}
          aoDigitar={aoDigitarMock}
          aoSubmeter={aoSubmeterMock}
          aoFocar={aoFocarMock}
        />,
      )
    })

    test('DEVE chamar a função aoDigitar QUANDO digitar alguma coisa', () => {
      const valor = 'asdf'
      const inputComponent = component.getByTestId('input-input')

      fireEvent.change(inputComponent, {target: {value: valor}})

      expect(aoDigitarMock).toHaveBeenCalledWith(valor)
    })

    test('DEVE chamar a função aoDesfocar com o valor do campo ao sair do campo', () => {
      fireEvent.blur(component.getByTestId('input'))

      expect(aoDesfocarMock).toHaveBeenCalledWith('Abc123')
    })

    test('DEVE chamar a função aoSubmeter com o valor do campo QUANDO pressionar Enter', () => {
      const valorCampo = 'abcde123'
      const inputComponent = component.getByTestId('input-input')

      fireEvent.change(inputComponent, {target: {value: valorCampo}})
      fireEvent.keyDown(inputComponent, {key: 'Enter', code: 'Enter'})

      expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
      expect(aoSubmeterMock).toHaveBeenCalledWith(valorCampo)
    })

    test('NÃO DEVE chamar a função aoSubmeter QUANDO pressionar letras ou números', () => {
      const inputComponent = component.getByTestId('input-input')
      fireEvent.keyDown(inputComponent, {key: 'A', code: 'KeyA'})
      fireEvent.keyDown(inputComponent, {key: '1', code: 'Digit1'})

      expect(aoSubmeterMock).not.toHaveBeenCalled()
    })

    test('DEVE chamar a função aoFocar QUANDO clicar dentro do campo', () => {
      const inputComponent = component.getByTestId('input-input')
      fireEvent.focus(inputComponent)

      expect(aoFocarMock).toHaveBeenCalledTimes(1)
    })

    describe('QUANDO o tipo é "pesquisa"', () => {
      const aoDesfocarMock = jest.fn()
      const aoSubmeterMock = jest.fn()
      beforeEach(() => {
        aoDesfocarMock.mockClear()
        aoSubmeterMock.mockClear()
        component = render(
          <Input
            data-testid={'pesquisa'}
            tipo={'pesquisa'}
            aoDesfocar={aoDesfocarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )
      })

      test('DEVE chamar a função aoSubmeter com o texto pesquisado em caixa alta QUANDO pressionar Enter', () => {
        const textoPesquisa = 'Exemplo de texto'
        const inputComponent = component.getByTestId('input-pesquisa')

        fireEvent.change(inputComponent, {target: {value: textoPesquisa}})
        fireEvent.keyDown(inputComponent, {key: 'Enter', code: 'Enter'})

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
        expect(aoSubmeterMock).toHaveBeenCalledWith(textoPesquisa.toUpperCase())
      })

      test('DEVE chamar a função aoSubmeter QUANDO clicar no ícone de pesquisa', () => {
        const pesquisaIcone = component.getByTestId('btn-pesquisa-pesquisar')
        fireEvent.click(pesquisaIcone)

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
      })

      test('DEVE chamar a função aoSubmeter com o texto pesquisado QUANDO clicar no ícone de pesquisa', () => {
        const textoPesquisa = 'Exemplo de texto'
        const inputComponent = component.getByTestId('input-pesquisa')
        const pesquisaIcone = component.getByTestId('btn-pesquisa-pesquisar')

        fireEvent.change(inputComponent, {target: {value: textoPesquisa}})
        fireEvent.click(pesquisaIcone)

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
        expect(aoSubmeterMock).toHaveBeenCalledWith(textoPesquisa.toUpperCase())
      })

      test('DEVE chamar a função aoSubmeter sem um valor QUANDO clicar no ícone de limpar', () => {
        component = render(
          <Input
            iconeEsquerda
            data-testid={'pesquisa'}
            tipo={'pesquisa'}
            valor={'texto'}
            aoDesfocar={aoDesfocarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )

        const limparIcone = component.getByTestId('btn-pesquisa-limpar')
        fireEvent.click(limparIcone)

        expect(aoSubmeterMock).toHaveBeenCalledWith()
      })
    })

    describe('QUANDO o tipo é "numero"', () => {
      beforeEach(() => {
        aoDesfocarMock.mockClear()
        aoDigitarMock.mockClear()
        aoSubmeterMock.mockClear()
        component = render(
          <Input
            data-testid={'numero'}
            tipo={'numero'}
            aoDesfocar={aoDesfocarMock}
            aoDigitar={aoDigitarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )
      })

      test('DEVE chamar a função aoDigitar QUANDO digitar algum valor', () => {
        const valor = 1234
        const inputComponent = component.getByTestId('input-numero')

        fireEvent.change(inputComponent, {target: {value: valor}})

        expect(aoDigitarMock).toHaveBeenCalledWith(valor)
      })

      test('DEVE trocar ponto por vírgula', () => {
        const texto = '123.5'
        const textoEsperado = '123,5'

        const inputComponent = component.getByTestId('input-numero')

        fireEvent.change(inputComponent, {target: {value: texto}})

        expect(component.getByDisplayValue(textoEsperado)).toBeInTheDocument()
      })

      test('QUANDO o campo está vazio DEVE chamar a função aoDesfocar com o valor zero ao sair do campo', () => {
        fireEvent.blur(component.getByTestId('input-numero'))

        expect(aoDesfocarMock).toHaveBeenCalledWith(0)
      })

      test('QUANDO o campo não está vazio DEVE chamar a função aoDesfocar com o valor ao sair do campo', () => {
        const valor = 12.5
        const inputComponent = component.getByTestId('input-numero')

        fireEvent.change(inputComponent, {target: {value: valor}})
        fireEvent.blur(component.getByTestId('input-numero'))

        expect(aoDesfocarMock).toHaveBeenCalledWith(valor)
      })
    })

    describe('Comportamento do Placeholder', () => {
      const placeholderText = 'Digite algo aqui'
      beforeEach(() => {
        component.rerender(
          <Input
            data-testid={'numero'}
            tipo={'numero'}
            placeholder={placeholderText}
            aoDesfocar={aoDesfocarMock}
            aoDigitar={aoDigitarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )
      })

      test('DEVE ajustar o valor digitado QUANDO o campo estiver vazio e o placeholder estiver presente', () => {
        const inputComponent = component.getByTestId(
          'input-numero',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: ''}})
        fireEvent.blur(inputComponent)

        expect(inputComponent.value).toBe('')
      })

      test('DEVE ter o valor do placeholder QUANDO o campo estiver vazio e o placeholder estiver presente', () => {
        const inputComponent = component.getByTestId(
          'input-numero',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: ''}})
        fireEvent.blur(inputComponent)

        expect(inputComponent).toHaveAttribute('placeholder', placeholderText)
      })

      test('DEVE ajustar o valor digitado QUANDO o campo estiver com 0 e o placeholder estiver presente', () => {
        const inputComponent = component.getByTestId(
          'input-numero',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: '0'}})
        fireEvent.blur(inputComponent)

        expect(inputComponent.value).toBe('0')
      })

      test('DEVE ter o valor do placeholder QUANDO o campo estiver com "0" e o placeholder estiver presente', () => {
        const inputComponent = component.getByTestId(
          'input-numero',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: 0}})
        fireEvent.blur(inputComponent)

        expect(inputComponent).toHaveAttribute('placeholder', placeholderText)
      })

      test('DEVE formatar o valor corretamente QUANDO o valor for fornecido', () => {
        const valor = '123.45'
        const valorEsperado = '123,45'

        const inputComponent = component.getByTestId(
          'input-numero',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: valor}})
        fireEvent.blur(inputComponent)

        expect(component.getByDisplayValue(valorEsperado)).toBeInTheDocument()
      })
    })

    describe('QUANDO o tipo é "Textarea"', () => {
      const aoDesfocarMock = jest.fn()
      const aoSubmeterMock = jest.fn()
      beforeEach(() => {
        aoDesfocarMock.mockClear()
        aoSubmeterMock.mockClear()
        component.rerender(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            aoDesfocar={aoDesfocarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )
      })

      test('DEVE chamar a função aoSubmeter com o texto pesquisado em caixa alta QUANDO pressionar Enter', () => {
        const textoPesquisa = 'Exemplo de texto'
        const inputComponent = component.getByTestId('textarea-textarea')

        fireEvent.change(inputComponent, {target: {value: textoPesquisa}})
        fireEvent.keyDown(inputComponent, {key: 'Enter', code: 'Enter'})

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
        expect(aoSubmeterMock).toHaveBeenCalledWith(textoPesquisa)
      })

      test('DEVE chamar a função aoSubmeter QUANDO clicar no ícone de pesquisa', () => {
        const pesquisaIcone = component.getByTestId('btn-textarea-pesquisar')
        fireEvent.click(pesquisaIcone)

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
      })

      test('DEVE chamar a função aoSubmeter com o texto pesquisado QUANDO clicar no ícone de pesquisa', () => {
        const textoPesquisa = 'Exemplo de texto'
        const inputComponent = component.getByTestId('textarea-textarea')
        const pesquisaIcone = component.getByTestId('btn-textarea-pesquisar')

        fireEvent.change(inputComponent, {target: {value: textoPesquisa}})
        fireEvent.click(pesquisaIcone)

        expect(aoSubmeterMock).toHaveBeenCalledTimes(1)
        expect(aoSubmeterMock).toHaveBeenCalledWith(textoPesquisa)
      })

      test('NAO DEVE renderizar o texto truncado QUANDO não tiver texto, não obter a largura do textarea e não passar o número máximo de linha', async () => {
        component.rerender(<Input data-testid={'textarea'} tipo={'textarea'} />)
        const inputComponent = component.getByTestId(
          'textarea-textarea',
        ) as HTMLInputElement

        fireEvent.change(inputComponent, {target: {value: ''}})
        fireEvent.blur(inputComponent)

        await waitFor(async () => {
          expect(inputComponent.value).toBe('')
        })
      })

      test('DEVE chamar a função aoSubmeter sem um valor QUANDO clicar no ícone de limpar', () => {
        component = render(
          <Input
            data-testid={'textarea'}
            tipo={'textarea'}
            valor={'texto'}
            aoDesfocar={aoDesfocarMock}
            aoSubmeter={aoSubmeterMock}
          />,
        )

        const limparIcone = component.getByTestId('btn-textarea-limpar')
        fireEvent.click(limparIcone)

        expect(aoSubmeterMock).toHaveBeenCalledWith()
      })
    })
  })
})

const createMockRef = (
  clientWidth: number,
): React.RefObject<HTMLTextAreaElement> => ({
  current: {
    clientWidth,
    style: {fontSize: '16px'},
  } as HTMLTextAreaElement,
})
