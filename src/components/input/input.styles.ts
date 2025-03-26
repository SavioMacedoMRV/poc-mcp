import styled from 'styled-components'
import {cores} from 'resources/cores'
import {fontes} from 'resources/fontes'
import {margens} from 'resources/margens'
import {FC, HTMLAttributes, SVGProps} from 'react'
import {BotaoIcone} from 'components/botaoIcone'
import {TextoProps} from 'components/texto/texto.styles'
import {IconeProps} from 'components/icone'
import {hexToRgba} from 'helpers/cores'

export interface IconeInput extends Omit<IconeProps, 'icone'> {
  icone?: FC<SVGProps<SVGSVGElement>>
}

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  valor?: string | number
  cor?: string
  altura?: number
  largura?: number
  tipo?: 'pesquisa' | 'numero' | 'textarea'
  numeroLinhas?: number
  numeroMaxLinhas?: number
  itemSelecionado?: boolean
  placeholder?: string
  corBorda?: string
  corBordaFocada?: string
  semBorda?: boolean
  textoProps?: TextoProps
  icone?: IconeInput
  desabilitaIcone?: boolean
  desabilitado?: boolean
  corTextoDesativado?: string
  iconeEsquerda?: boolean
  aoSubmeter?: (valor?: string | number) => void
  aoDesfocar?: (valor?: string | number) => void
  aoDigitar?: (valor?: string | number) => void
  aoFocar?: () => void
  'data-testid'?: string
}
interface StyledProps {
  $semBorda?: boolean
  $corBorda?: string
  $corBordaFocada?: string
  $desabilitado?: boolean
  $corTextoDesativado?: string
  $iconeEsquerda?: boolean
  $tipoTextArea?: boolean
  $numeroMaxLinhas?: number
}

export const InputContainer = styled.div<InputProps & StyledProps>`
  display: flex;
  padding: ${({$tipoTextArea}) =>
    $tipoTextArea ? `${margens.xxsmall}px 0 ` : `${margens.xsmall}px`};
  gap: ${margens.xsmall}px;
  flex-direction: ${({$iconeEsquerda}) =>
    $iconeEsquerda ? 'row-reverse' : 'row'};
  justify-content: ${({$iconeEsquerda}) =>
    $iconeEsquerda ? 'flex-end' : 'space-between'};
  height: ${({altura, $tipoTextArea}) => {
    if ($tipoTextArea) {
      return 'auto'
    }
    if (altura) {
      return `${altura}px`
    }
    return 'auto'
  }};
  width: ${({largura}) => (largura ? `${largura}px` : 'auto')};
  background: ${({$desabilitado}) =>
    $desabilitado ? cores.background01 : cores.neutralXXLight};
  border-radius: ${margens.xsmall}px;
  border: ${({$semBorda, $corBorda, $desabilitado}) => {
    if ($semBorda) {
      return 'none'
    }
    if ($desabilitado) {
      return `2px solid ${cores.background01}`
    }

    return `2px solid ${$corBorda ?? cores.neutralDark}`
  }};

  &:focus-within {
    border: ${({$semBorda, $corBordaFocada, $corBorda}) => {
      if ($semBorda) {
        return 'none'
      }
      if ($corBordaFocada) {
        return `2px solid ${$corBordaFocada}`
      }
      return `2px solid ${$corBorda ?? cores.neutralDark}`
    }};
    box-shadow: ${({$semBorda}) =>
      $semBorda
        ? 'none'
        : `0px 2px 8px 0px ${hexToRgba(cores.neutralXDark, 0.3)}`};
  }
`

export const InputStyled = styled.input<InputProps & TextoProps & StyledProps>`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: ${({tamanho}) => tamanho ?? 14}px;
  line-height: ${({alturalinha}) =>
    alturalinha ? alturalinha + 'px' : 'normal'};
  font-family: ${({estilo}) => (estilo ? fontes[estilo] : fontes.semibold)};
  color: ${({cor}) => cor ?? cores.neutralXXDark};
  text-align: ${({alinhamento}) => alinhamento ?? 'start'};
  cursor: ${({cursor}) => cursor ?? 'text'};
  text-transform: ${({transformar}) => transformar ?? 'none'};

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }

  &:disabled {
    color: ${({$corTextoDesativado}) =>
      $corTextoDesativado ?? cores.neutralMedium};
    cursor: ${({cursor}) => cursor ?? 'default'};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    background: ${cores.neutralMedium};
    height: 10px;
    width: 10px;
    border-radius: 5px;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

export const TextAreaStyled = styled.textarea<
  InputProps & TextoProps & StyledProps
>`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: ${({tamanho}) => tamanho ?? 14}px;
  line-height: ${({alturalinha}) =>
    alturalinha ? alturalinha + 'px' : 'normal'};
  font-family: ${({estilo}) => (estilo ? fontes[estilo] : fontes.semibold)};
  color: ${({cor}) => cor ?? cores.neutralXXDark};
  text-align: ${({alinhamento}) => alinhamento ?? 'start'};
  cursor: ${({cursor}) => cursor ?? 'text'};
  text-transform: ${({transformar}) => transformar ?? 'none'};
  resize: none;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
  box-sizing: border-box;

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }

  &:disabled {
    color: ${({$corTextoDesativado}) =>
      $corTextoDesativado ?? cores.neutralMedium};
    cursor: ${({cursor}) => cursor ?? 'default'};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    background: ${cores.neutralMedium};
    height: 10px;
    width: 10px;
    border-radius: 5px;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

export const InputIconePesquisa = styled(BotaoIcone).attrs({
  semMargem: true,
})`
  align-items: baseline;
`
