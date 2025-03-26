import React, {ReactElement, useCallback, useState} from 'react'
import * as S from './cabecalho.styles'
import {Evento} from 'types/enums'
import {Empreendimento} from 'types/interfaces'
import {BotaoMenu} from 'components/botaoMenu'
import {BotaoIcone} from 'components/botaoIcone'
import {RegistrarEvento} from 'infrastructure/logs'
import {useNavigate} from 'react-router-dom'
import {rotas} from 'resources/rotas'
import {BotaoProps} from 'components/botao/botao.styles'
import {ModalConfirmacao} from 'components/modalConfirmacao'
import {MenuNavegacao} from './menuNavegacao'

export interface CabecalhoProps {
  obra?: Empreendimento | null
  pesquisa?: {
    autoPesquisar?: boolean
    aoPesquisar: (texto?: string | number) => void
  }
  filtroPepSuperior?: ReactElement
  filtroAtividade?: ReactElement
  filtroLocal?: ReactElement
  cabecalhoDireita?: ReactElement
  aoClicarVoltar?: () => void
  botaoSair?:
    | (BotaoProps & {confirmacao?: {titulo: string; mensagem: string}})
    | boolean
}

export const Cabecalho = ({
  obra,
  cabecalhoDireita,
  pesquisa,
  filtroPepSuperior,
  filtroAtividade,
  filtroLocal,
  aoClicarVoltar,
  botaoSair,
}: Readonly<CabecalhoProps>) => {
  const navigate = useNavigate()
  const projetoSelecionado = obterProjetoSelecionado(obra)
  const [exibirModalConfirmar, setExibirModalConfirmar] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  const aoClicarVoltarHandler = useCallback(() => {
    RegistrarEvento({evento: Evento.CabecalhoClickVoltar})
    if (aoClicarVoltar) {
      aoClicarVoltar()
      return
    }
    navigate(-1)
  }, [aoClicarVoltar, navigate])

  const aoFecharModalConfirmacao = () => setExibirModalConfirmar(false)

  const aoConfirmarSair = useCallback(() => {
    aoFecharModalConfirmacao()
    if (typeof botaoSair === 'object' && botaoSair.aoClicar) {
      botaoSair.aoClicar()
      return
    }
    navigate(rotas.Home)
  }, [botaoSair, navigate])

  const aoClicarSairHandler = useCallback(() => {
    RegistrarEvento({evento: Evento.CabecalhoClickSair})
    if (typeof botaoSair === 'object' && botaoSair.confirmacao) {
      setExibirModalConfirmar(true)
      return
    }
    aoConfirmarSair()
  }, [aoConfirmarSair, botaoSair])

  return (
    <S.Container data-testid="cabecalho">
      <S.HeaderLeft>
        <S.BotaoVoltar
          data-testid="btn-cabecalho-voltar"
          icone={S.IconeVoltar}
          aoClicar={aoClicarVoltarHandler}
        />
        <S.TextoVoltar>
          {!projetoSelecionado ? 'Voltar' : `${projetoSelecionado.projeto} /`}
        </S.TextoVoltar>
        {projetoSelecionado && (
          <S.TextoVoltar>{projetoSelecionado.obra}</S.TextoVoltar>
        )}
      </S.HeaderLeft>

      <S.HeaderCenter>
        {pesquisa && (
          <S.InputPesquisar
            data-testid={'pesquisa-cabecalho'}
            aoDigitar={pesquisa.autoPesquisar ? pesquisa.aoPesquisar : undefined}
            aoSubmeter={pesquisa.aoPesquisar}
          />
        )}
        <S.BotaoHubs
          data-testid={'filtro-pep-superior-cabecalho'}
          botao={{
            texto: 'Hubs',
            textoProps: {
              tamanho: 12,
              cor: '#434645',
              estilo: 'regular'
            }
          }}
          titulo={'Navegação'}
          componenteOpcoes={<MenuNavegacao />}
        />
        {filtroAtividade && (
          <S.BotaoFiltro
            data-testid={'filtro-atividade-cabecalho'}
            icone={S.IconeFiltro}
            aoClicar={() => {}}
          />
        )}
        {filtroLocal && (
          <S.BotaoFiltro
            data-testid={'filtro-local-cabecalho'}
            icone={S.IconeLocal}
            aoClicar={() => {}}
          />
        )}
      </S.HeaderCenter>

      <S.HeaderRight>
        {cabecalhoDireita ??
          (botaoSair && (
            <S.BotaoSair
              data-testid="btn-cabecalho-sair"
              {...(typeof botaoSair === 'object' ? botaoSair : {})}
              aoClicar={aoClicarSairHandler}
            />
          ))}
        {typeof botaoSair === 'object' && botaoSair.confirmacao && (
          <ModalConfirmacao
            exibir={exibirModalConfirmar}
            titulo={botaoSair.confirmacao.titulo}
            mensagem={botaoSair.confirmacao.mensagem}
            aoConfirmar={aoConfirmarSair}
            aoCancelar={aoFecharModalConfirmacao}
          />
        )}
      </S.HeaderRight>
    </S.Container>
  )
}

export const obterProjetoSelecionado = (obra?: Empreendimento | null) => {
  if (obra) {
    return {obra: obra.nome, projeto: 'Projeto Executivo'}
  }
  return undefined
}
