import React, {ButtonHTMLAttributes} from 'react'
import styled from 'styled-components'
import {cores} from '../../resources/cores'
import {Texto} from 'components/texto'
import {margens} from 'resources/margens'
import {TextoProps} from 'components/texto/texto.styles'
import {IconeProps} from 'components/icone'

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icone?: React.FC<React.SVGProps<SVGSVGElement>>
  texto?: string
  cor?: string
  corDesabilitado?: string
  corTexto?: string
  corTextoDesativado?: string
  textoProps?: TextoProps
  iconeProps?: Omit<IconeProps, 'icone'>
  altura?: number
  largura?: number
  espaco?: number
  aoClicar: (e?: any) => void
}

interface StyledProps extends Omit<BotaoProps, 'aoClicar' | 'corDesabilitado'> {
  $corDesabilitado?: string
}

export const BotaoStyled = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  padding: ${margens.xxsmall}px ${margens.small}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: ${({espaco}) => espaco ?? margens.small}px;
  width: ${({largura}) => (largura ? `${largura}px` : 'auto')};
  height: ${({altura}) => (altura ? `${altura}px` : 'auto')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  opacity: ${({disabled}) => (disabled ? 0.2 : 1.0)};
  background: ${({cor}) => cor ?? cores.neutralLight};

  &:hover {
    opacity: ${({disabled}) => (disabled ? 0.2 : 0.7)};
  }
  &:active {
    opacity: ${({disabled}) => (disabled ? 0.2 : 1)};
  }

  &:focus-visible {
    outline: unset;
    border: 2px solid ${cores.neutralMedium};
  }

  &:disabled {
    background: ${({$corDesabilitado}) =>
      $corDesabilitado ?? cores.neutralLight};
  }
`

export const TextoBotao = styled(Texto).attrs({
  estilo: 'semibold',
  alturalinha: 24,
})``
