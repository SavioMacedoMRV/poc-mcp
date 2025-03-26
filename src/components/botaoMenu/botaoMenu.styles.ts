import {ReactNode} from 'react'
import styled from 'styled-components'
import {cores} from '../../resources/cores'
import {margens} from 'resources/margens'
import {hexToRgba} from 'helpers/cores'
import {BotaoIcone} from 'components/botaoIcone'
import {Texto} from 'components/texto'
import {Icone} from 'components/icone'
import {TextoProps} from 'components/texto/texto.styles'
import ChevronSVG from 'icons/iChevron.svg'

export interface BotaoMenuProps {
  desabilitado?: boolean
  icone?: React.FC<React.SVGProps<SVGSVGElement>>
  botao?: {texto: string; textoProps?: TextoProps}
  componenteOpcoes: ReactNode
  cor?: string
  titulo?: string
  largura?: number
  corAtivo?: string
  'data-testid'?: string
}

export const BotaoMenuIcone = styled(BotaoIcone).attrs(props => ({
  altura: 24,
  cor: cores.neutralDark,
  ...props,
}))``

export const BotaoMenuTexto = styled.button<{
  $corBorda?: string
}>`
  display: flex;
  flex: 1;
  width: 160px;
  border-radius: ${margens.xsmall}px;
  border: 2px solid ${({$corBorda}) => $corBorda ?? cores.background03};
  background: none;
  align-items: center;
  gap: ${margens.xsmall}px;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${margens.xxsmall}px ${margens.xsmall}px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${cores.neutralMedium};
    border-radius: ${margens.xsmall}px;
  }
`

export const ContainerBotaoMenu = styled.div`
  display: flex;
  position: relative;
`

export const ContainerSuspenso = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  min-width: 250px;
  max-width: 300px;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  z-index: 1;
  margin-top: ${margens.xsmall}px;
  background: ${cores.neutralXXLight};
  padding: ${margens.medium}px;
  border-radius: ${margens.small}px;
  box-shadow: 0px 8px 24px 0px ${hexToRgba(cores.neutralXDark, 0.35)};
`

export const IconeBotao = styled(Icone).attrs({
  altura: 24,
  cor: cores.neutralDark,
  icone: ChevronSVG,
})``

export const TextoBotao = styled(Texto).attrs(props => ({
  cor: cores.neutralDark,
  tamanho: 12,
  estilo: 'semibold',
  cursor: 'pointer',
  ...props,
}))`
  text-overflow: ellipsis;
`

export const TextoTitulo = styled(Texto).attrs({
  cor: cores.neutralDark,
  estilo: 'semibold',
  tamanho: 16,
})`
  margin-bottom: ${margens.medium}px;
`
