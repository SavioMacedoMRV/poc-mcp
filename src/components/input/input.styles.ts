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
  label?: string
  required?: boolean
  // Propriedades para dropdown de pesquisa
  opcoesPesquisa?: string[]
  aoSelecionarOpcao?: (opcao: string) => void
  carregandoOpcoes?: boolean
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
  border-radius: 8px;
  border: ${({$semBorda, $corBorda, $desabilitado}) => {
    if ($semBorda) {
      return 'none'
    }
    if ($desabilitado) {
      return `2px solid ${cores.background01}`
    }

    return `2px solid ${$corBorda ?? cores.background01}`
  }};

  &:focus-within {
    border: ${({$semBorda, $corBordaFocada, $corBorda}) => {
      if ($semBorda) {
        return 'none'
      }
      if ($corBordaFocada) {
        return `2px solid ${$corBordaFocada}`
      }
      return `2px solid ${$corBorda ?? cores.background01}`
    }};
    box-shadow: none;
  }
`

export const InputLabel = styled.label`
  font-family: ${fontes.semibold};
  font-size: 12px;
  line-height: 1.67em;
  color: ${cores.neutralXDark};
  margin-bottom: 4px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

// Estilos para o dropdown de pesquisa
export const OptionsContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${cores.neutralXXLight};
  border-radius: 16px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0px 2px 8px 0px rgba(32, 38, 36, 0.16);
  padding: 16px;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 8px;
`

export const OptionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`

export const OptionText = styled.span`
  font-family: ${fontes.semibold};
  font-size: 12px;
  line-height: 1.67;
  color: ${cores.neutralXXDark};
`

export const Divider = styled.div`
  height: 2px;
  background-color: ${cores.background01};
  width: 100%;
`

export const LoadingContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${cores.neutralXXLight};
  border-radius: 16px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0px 2px 8px 0px rgba(32, 38, 36, 0.16);
  padding: 16px;
  display: flex;
  justify-content: center;
`

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`
