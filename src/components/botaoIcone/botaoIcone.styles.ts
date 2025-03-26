import React, {ButtonHTMLAttributes} from 'react'
import styled from 'styled-components'
import {margens} from 'resources/margens'
import {cores} from 'resources/cores'

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icone: React.FC<React.SVGProps<SVGSVGElement>>
  cor?: string
  altura?: number
  largura?: number
  inclinacao?: number
  borda?: boolean
  semMargem?: boolean
  aoClicar: (() => void) | ((e: any) => void)
}

interface StyledProps
  extends Omit<BotaoProps, 'aoClicar' | 'icone' | 'borda' | 'semMargem'> {
  $borda?: boolean
  $semMargem?: boolean
}

export const BotaoStyled = styled.button<StyledProps>`
  display: flex;
  border-radius: ${margens.xsmall}px;
  border: ${({$borda, cor}) =>
    $borda ? `2px solid ${cor ?? cores.neutralDark}` : 'none'};
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: ${({$semMargem}) => ($semMargem ? 0 : margens.xsmall)}px;
  opacity: ${({disabled}) => (disabled ? 0.2 : 1.0)};
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
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
`
