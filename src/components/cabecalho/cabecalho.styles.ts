import styled, { css } from 'styled-components'
import {cores} from 'resources/cores'
import {media} from 'resources/media'
import {margens} from 'resources/margens'
import {Texto} from 'components/texto'
import {BotaoIcone} from 'components/botaoIcone'
import {BotaoNavegacao} from 'components/botaoNavegacao'
import {Input} from 'components/input'
import {Botao} from 'components/botao'
import ChevronSVG from 'icons/iChevron.svg'
import FecharSVG from 'icons/iFechar.svg'
import FiltroSVG from 'icons/iFiltro.svg'
import LupaSVG from 'icons/iLupa.svg'
import BlocoSVG from 'icons/iBloco.svg'
import ArrowBackIosSVG from 'icons/iArrowBackIos.svg'

export const BotaoSair = styled(Botao).attrs(props => ({
  texto: 'Sair',
  corTexto: cores.neutralXXLight,
  textoProps: {
    tamanho: 12,
    estilo: 'semibold',
    alturalinha: 20
  },
  iconeProps: {
    altura: 24,
    largura: 24,
    cor: cores.neutralXXLight
  },
  espaco: 4,
  icone: FecharSVG,
  cor: cores.supportFeedbackError,
  ...props,
}))`
  width: 112px;
  border-radius: 8px;
  padding: 4px 8px;
  justify-content: center;
  height: fit-content;

  @media ${media.tablet} {
    span {
      display: none;
    }
  }
`

export const BotaoVoltar = styled(BotaoIcone).attrs({
  cor: cores.neutralXDark,
  altura: 24,
  largura: 24,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${cores.background01};
  }
`

export const Container = styled.header<{ $modoCadastro?: boolean }>`
  position: sticky;
  z-index: 1;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background: ${cores.neutralXXLight};
  padding: 8px 64px;
  gap: 237px;
  border-bottom: 1px solid ${cores.background01};

  ${({ $modoCadastro }) => $modoCadastro && css`
    gap: 0;

    ${HeaderLeft} {
      ${BotaoVoltar} {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
        border-radius: 4px;
        height: 32px;
        
        &:hover {
          background-color: ${cores.background01};
        }
      }

      ${TextoVoltar} {
        font-size: 12px;
        line-height: 20px;
      }
    }
  `}

  @media ${media.tablet} {
    padding: 8px 16px;
    gap: 16px;
  }
`

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 608px;
  justify-content: center;

  @media ${media.tablet} {
    width: auto;
    gap: 16px;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const IconeFiltro = styled(FiltroSVG)`
  path {
    fill: ${cores.neutralXDark};
  }
`

export const IconeLocal = styled(BlocoSVG)`
  path {
    fill: ${cores.neutralXDark};
  }
`

export const IconePesquisa = styled(LupaSVG)`
  path {
    fill: ${cores.neutralXDark};
  }
`

export const IconeVoltar = styled(ArrowBackIosSVG)`
  path {
    fill: ${cores.neutralXDark};
  }
`

export const InputPesquisar = styled(Input).attrs({
  tipo: 'pesquisa',
  placeholder: 'Pesquisar',
  textoProps: {
    tamanho: 12,
    cor: cores.neutralXDark,
    estilo: 'regular'
  },
  icone: {
    largura: 24,
    altura: 24,
    icone: IconePesquisa
  },
  altura: 32,
  corBorda: cores.background01,
  corBordaFocada: cores.background01,
  iconeEsquerda: true,
})`
  width: 480px;
  border-width: 2px;
  border-radius: 8px;
  background: ${cores.neutralXXLight};
  height: 32px;
  padding: 0;
  padding-left: 10px;
  display: flex;
  align-items: center;
  
  div {
    align-items: center;
    gap: 8px;
    height: 100%;
    padding: 4px 8px;
    flex: 1;
  }

  input {
    font-family: 'AvertaStd-Regular';
    font-size: 12px;
    line-height: 1.235em;
    height: 100%;
    padding: 0;
  }

  @media ${media.tablet} {
    width: 100%;
  }
`

export const TextoVoltar = styled(Texto).attrs({
  tamanho: 12,
  alturalinha: 20,
  estilo: 'semibold',
  cor: cores.neutralXDark,
})`
  font-family: AvertaStd-Semibold;
  font-style: normal;
  font-weight: 400;
`

export const TextoObra = styled(TextoVoltar)``
export const TextoProjeto = styled(TextoVoltar)``

export const BotaoFiltro = styled(BotaoIcone).attrs({
  altura: 24,
  largura: 24,
  cor: cores.neutralXDark,
})`
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  background: transparent;

  &:hover {
    background-color: ${cores.background01};
  }
`

export const BotaoHubs = styled(BotaoNavegacao)`
  && {
    width: 160px;
    height: 32px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 2px solid ${cores.background01};
    background: ${cores.neutralXXLight};
    gap: 8px;

    span {
      font-family: 'AvertaStd-Regular';
      font-size: 12px;
      line-height: 1.235em;
      color: ${cores.neutralXDark};
    }

    &:hover {
      background-color: ${cores.background01};
    }
  }
`
