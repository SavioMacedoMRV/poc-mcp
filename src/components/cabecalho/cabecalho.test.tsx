import '@testing-library/jest-dom'
import {RenderResult, fireEvent, render} from '@testing-library/react'
import {Cabecalho, obterProjetoSelecionado} from './cabecalho'
import {Botao} from 'components/botao'
import {Evento} from 'types/enums'
import {Empreendimento} from 'types/interfaces'
import {RegistrarEvento} from 'infrastructure/logs'
import {rotas} from 'resources/rotas'

const mockEmpreendimento: Empreendimento = {
  nome: 'Obra Teste',
  id: 'idempreendimento',
}

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

const RegistrarEventoMock = RegistrarEvento as jest.Mock
jest.mock('infrastructure/logs', () => ({
  RegistrarEvento: jest.fn(),
}))

describe('Cabecalho', () => {
  let component: RenderResult
  const aoClicarVoltarMock = jest.fn()

  describe('Renderização', () => {
    const projetoSelecionado = obterProjetoSelecionado(mockEmpreendimento)

    beforeEach(() => {
      component = render(
        <Cabecalho
          obra={mockEmpreendimento}
          aoClicarVoltar={aoClicarVoltarMock}
        />,
      )
    })

    test('DEVE renderizar o container cabeçalho"', () => {
      expect(component.getByTestId('cabecalho')).toBeInTheDocument()
    })

    test('DEVE renderizar o botão Voltar', () => {
      expect(component.getByTestId('btn-cabecalho-voltar')).toBeInTheDocument()
    })

    test('DEVE renderizar o nome do projeto', () => {
      expect(
        component.getByText(projetoSelecionado?.projeto + ' /'),
      ).toBeInTheDocument()
    })

    test('DEVE renderizar o nome da obra', () => {
      expect(
        component.getByText(projetoSelecionado?.obra ?? ''),
      ).toBeInTheDocument()
    })

    test('DEVE renderizar o texto "Voltar" QUANDO obra não for definido', () => {
      component = render(<Cabecalho aoClicarVoltar={aoClicarVoltarMock} />)
      expect(component.getByText('Voltar')).toBeInTheDocument()
    })

    test('DEVE renderizar o botão que for passado pelas props', () => {
      const BotaoComponente = <Botao texto="Botão" aoClicar={jest.fn} />

      component = render(
        <Cabecalho
          obra={mockEmpreendimento}
          cabecalhoDireita={BotaoComponente}
          aoClicarVoltar={aoClicarVoltarMock}
        />,
      )
      expect(component.getByText('Botão')).toBeInTheDocument()
    })

    test('DEVE renderizar a barra de pesquisa QUANDO "pesquisa" for definido', () => {
      component = render(
        <Cabecalho
          pesquisa={{aoPesquisar: jest.fn}}
          aoClicarVoltar={aoClicarVoltarMock}
        />,
      )
      expect(component.getByTestId('pesquisa-cabecalho')).toBeInTheDocument()
    })

    test('DEVE renderizar o filtro de PEP Superior QUANDO "filtroPepSuperior" for definido', () => {
      component.rerender(
        <Cabecalho
          filtroPepSuperior={<></>}
          aoClicarVoltar={aoClicarVoltarMock}
        />,
      )
      expect(
        component.getByTestId('filtro-pep-superior-cabecalho'),
      ).toBeInTheDocument()
    })

    test('DEVE renderizar o filtro de atividade QUANDO "filtroAtividade" for definido', () => {
      component.rerender(
        <Cabecalho
          filtroAtividade={<></>}
          aoClicarVoltar={aoClicarVoltarMock}
        />,
      )
      expect(
        component.getByTestId('filtro-atividade-cabecalho'),
      ).toBeInTheDocument()
    })

    test('DEVE renderizar o filtro de locais QUANDO "filtroLocal" for definido', () => {
      component.rerender(
        <Cabecalho filtroLocal={<></>} aoClicarVoltar={aoClicarVoltarMock} />,
      )
      expect(
        component.getByTestId('filtro-local-cabecalho'),
      ).toBeInTheDocument()
    })
  })

  describe('Comportamento', () => {
    const aoPesquisarMock = jest.fn()

    beforeEach(() => {
      aoPesquisarMock.mockClear()
      aoClicarVoltarMock.mockClear()
      component = render(
        <Cabecalho
          obra={mockEmpreendimento}
          pesquisa={{aoPesquisar: aoPesquisarMock}}
        />,
      )
    })

    describe('QUANDO clicar no botão voltar', () => {
      beforeEach(() => {
        const botao = component.getByTestId('btn-cabecalho-voltar')
        fireEvent.click(botao)
      })
      test(`DEVE registrar o evento "${Evento.CabecalhoClickVoltar}"`, () => {
        expect(RegistrarEventoMock).toHaveBeenCalledWith({
          evento: Evento.CabecalhoClickVoltar,
        })
      })

      test('DEVE navegar para a tela anterior', () => {
        expect(mockNavigate).toHaveBeenCalledWith(-1)
      })

      test(`DEVE chamar a função "aoClicarVoltar" QUANDO for definida`, () => {
        component.rerender(
          <Cabecalho
            obra={mockEmpreendimento}
            aoClicarVoltar={aoClicarVoltarMock}
          />,
        )

        const botao = component.getByTestId('btn-cabecalho-voltar')
        fireEvent.click(botao)

        expect(aoClicarVoltarMock).toHaveBeenCalled()
      })
    })

    describe('QUANDO clicar no botão sair', () => {
      const aoClicarSairMock = jest.fn()

      beforeEach(() => {
        component.rerender(<Cabecalho botaoSair />)

        const botao = component.getByTestId('btn-cabecalho-sair')
        fireEvent.click(botao)
      })

      test(`DEVE registrar o evento "${Evento.CabecalhoClickSair}"`, () => {
        expect(RegistrarEventoMock).toHaveBeenCalledWith({
          evento: Evento.CabecalhoClickSair,
        })
      })

      test('DEVE navegar para a tela inicial', () => {
        expect(mockNavigate).toHaveBeenCalledWith(rotas.Home)
      })

      test(`DEVE chamar a função "aoClicar" QUANDO for definida`, () => {
        component.rerender(
          <Cabecalho botaoSair={{aoClicar: aoClicarSairMock}} />,
        )

        const botao = component.getByTestId('btn-cabecalho-sair')
        fireEvent.click(botao)

        expect(aoClicarSairMock).toHaveBeenCalled()
      })

      describe('QUANDO "confirmacao" for definido na prop do botão sair', () => {
        beforeEach(() => {
          component.rerender(
            <Cabecalho
              botaoSair={{
                aoClicar: aoClicarSairMock,
                confirmacao: {
                  titulo: 'titulo mock',
                  mensagem: 'mensagem mock',
                },
              }}
            />,
          )

          const botao = component.getByTestId('btn-cabecalho-sair')
          fireEvent.click(botao)
        })

        test(`DEVE exibir o modal de confirmação`, () => {
          expect(component.getByText('titulo mock')).toBeInTheDocument()
        })

        test(`DEVE ocultar o modal QUANDO clicar no botão "Cancelar"`, () => {
          const botao = component.getByTestId('btn-modal-confirmacao-cancelar')
          fireEvent.click(botao)

          expect(component.queryByText('titulo mock')).toBeNull()
        })

        test(`DEVE chamar a função "aoClicar" QUANDO clicar no botão "Confirmar"`, () => {
          const botao = component.getByTestId('btn-modal-confirmacao-confirmar')
          fireEvent.click(botao)

          expect(aoClicarSairMock).toHaveBeenCalled()
        })
      })
    })

    describe('QUANDO utilizar o campo pesquisa', () => {
      test(`DEVE chamar a função "aoPesquisar" QUANDO tocar no botão de pesquisa`, () => {
        const textoPesquisa = 'texto da busca'
        const input = component.getByTestId('input-pesquisa-cabecalho')
        const btnPesquisa = component.getByTestId(
          'btn-pesquisa-cabecalho-pesquisar',
        )

        fireEvent.change(input, {target: {value: textoPesquisa}})
        fireEvent.click(btnPesquisa)

        expect(aoPesquisarMock).toHaveBeenCalledWith(
          textoPesquisa.toUpperCase(),
        )
      })

      test(`DEVE chamar a função "aoPesquisar" ao digitar QUANDO "pesquisa.autoPesquisar" for verdadeiro`, () => {
        component.rerender(
          <Cabecalho
            obra={mockEmpreendimento}
            aoClicarVoltar={aoClicarVoltarMock}
            pesquisa={{aoPesquisar: aoPesquisarMock, autoPesquisar: true}}
          />,
        )

        const textoPesquisa = 'texto digitado'
        const input = component.getByTestId('input-pesquisa-cabecalho')
        fireEvent.change(input, {target: {value: textoPesquisa}})

        expect(aoPesquisarMock).toHaveBeenCalledWith(textoPesquisa)
      })
    })

    test('QUANDO clicar no filtro de PEP Superior DEVE exibir o menu suspenso com o filtro', () => {
      const filtroPepSuperiorMock = (
        <div data-testid="filtro-pep-superior-mock">filtro</div>
      )

      component.rerender(
        <Cabecalho
          aoClicarVoltar={aoClicarVoltarMock}
          filtroPepSuperior={filtroPepSuperiorMock}
        />,
      )

      const filtro = component.getByTestId(
        'filtro-pep-superior-cabecalho-exibir-opcoes',
      )
      fireEvent.click(filtro)

      expect(
        component.getByTestId('filtro-pep-superior-mock'),
      ).toBeInTheDocument()
    })

    test('QUANDO clicar no filtro de Atividades DEVE exibir o menu suspenso com o filtro', () => {
      const filtroAtividadeMock = (
        <div data-testid="filtro-atividade-mock">filtro</div>
      )

      component.rerender(
        <Cabecalho
          aoClicarVoltar={aoClicarVoltarMock}
          filtroAtividade={filtroAtividadeMock}
        />,
      )

      const filtro = component.getByTestId(
        'filtro-atividade-cabecalho-icon-exibir-opcoes',
      )
      fireEvent.click(filtro)

      expect(component.getByTestId('filtro-atividade-mock')).toBeInTheDocument()
    })

    test('QUANDO clicar no filtro de Locais DEVE exibir o menu suspenso com o filtro', () => {
      const filtroLocalMock = <div data-testid="filtro-local-mock">filtro</div>

      component.rerender(
        <Cabecalho
          obra={mockEmpreendimento}
          aoClicarVoltar={aoClicarVoltarMock}
          filtroLocal={filtroLocalMock}
        />,
      )

      const filtro = component.getByTestId(
        'filtro-local-cabecalho-icon-exibir-opcoes',
      )
      fireEvent.click(filtro)

      expect(component.getByTestId('filtro-local-mock')).toBeInTheDocument()
    })
  })
})

describe('obterProjetoSelecionado', () => {
  test.each`
    obra                  | esperado
    ${mockEmpreendimento} | ${{obra: mockEmpreendimento.nome, projeto: 'Projeto Executivo'}}
    ${null}               | ${undefined}
    ${undefined}          | ${undefined}
  `(
    'DEVE retornar o projeto selecionado corretamente $esperado',
    ({obra, esperado}) => {
      const resultado = obterProjetoSelecionado(obra)

      expect(resultado).toEqual(esperado)
    },
  )
})
