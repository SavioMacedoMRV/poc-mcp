import styled from 'styled-components'
import {cores} from 'resources/cores'
import {media} from 'resources/media'
import {margens} from 'resources/margens'
import {Texto} from 'components/texto'
import {BotaoIcone} from 'components/botaoIcone'
import {BotaoMenu} from 'components/botaoMenu'
import {Input} from 'components/input'
import {Botao} from 'components/botao'
import ChevronSVG from 'icons/iChevron.svg'
import FecharSVG from 'icons/iFechar.svg'
import FiltroSVG from 'icons/iFiltro.svg'
import LupaSVG from 'icons/iLupa.svg'
import BlocoSVG from 'icons/iBloco.svg'

export const BotaoSair = styled(Botao).attrs(props => ({
  texto: 'Sair',
  corTexto: cores.complementary09,
  textoProps: {tamanho: 14},
  iconeProps: {altura: 24},
  icone: FecharSVG,
  cor: cores.background02,
  ...props,
}))`
  @media ${media.tablet} {
    span {
      display: none;
    }
  }
`

export const BotaoVoltar = styled(BotaoIcone).attrs({
  cor: '#434645',
  altura: 24,
  largura: 24,
  inclinacao: 90,
})`
  margin-right: 8px;
`

export const Container = styled.header`
  position: sticky;
  z-index: 1;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background: #FFFFFF;
  padding: 8px 64px;
  gap: 237px;

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
    fill: #434645;
  }
`

export const IconeLocal = styled(BlocoSVG)`
  path {
    fill: #434645;
  }
`

export const IconePesquisa = styled(LupaSVG)`
  path {
    fill: #434645;
  }
`

export const IconeVoltar = styled(ChevronSVG)`
  path {
    fill: #434645;
  }
`

export const InputPesquisar = styled(Input).attrs({
  tipo: 'pesquisa',
  placeholder: 'Pesquisar',
  textoProps: {
    tamanho: 12,
    cor: '#434645',
    estilo: 'regular'
  },
  icone: {
    largura: 24,
    altura: 24,
    icone: IconePesquisa
  },
  altura: 32,
  corBorda: '#EDF2F0',
  corBordaFocada: '#EDF2F0',
  iconeEsquerda: true,
})`
  width: 480px;
  padding: 4px 8px;
  border-width: 2px;
  border-radius: 8px;

  @media ${media.tablet} {
    width: 100%;
  }
`

export const TextoVoltar = styled(Texto).attrs({
  tamanho: 12,
  alturalinha: 20,
  estilo: 'semibold',
  cor: '#434645',
})`
  white-space: nowrap;
`

export const TextoObra = styled(TextoVoltar)``

export const TextoProjeto = styled(TextoVoltar)``

export const BotaoFiltro = styled(BotaoIcone).attrs({
  altura: 32,
  largura: 32,
  cor: '#FFFFFF',
})`
  border: 2px solid #EDF2F0;
  border-radius: 8px;
  padding: 4px;
`

export const BotaoHubs = styled(BotaoMenu).attrs({
  titulo: 'Hubs',
})`
  && {
    width: 160px;
    height: 32px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 2px solid #EDF2F0;
    background: #FFFFFF;
  }
`
