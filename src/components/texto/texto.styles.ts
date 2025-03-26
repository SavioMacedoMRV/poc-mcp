import styled from 'styled-components'
import {HTMLAttributes, ReactNode} from 'react'
import {fontes} from 'resources/fontes'
import {cores} from 'resources/cores'

export interface TextoProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  cor?: string
  estilo?: 'bold' | 'semibold' | 'regular'
  tamanho?: 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32
  alturalinha?: 12 | 14 | 16 | 18 | 20 | 24 | 28 | 30 | 32 | 40
  peso?: 300 | 400 | 600 | 800
  alinhamento?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify'
  cursor?: 'default' | 'pointer' | 'text'
  transformar?: 'capitalize' | 'lowercase' | 'uppercase'
}

export const TextoStyled = styled.span<TextoProps>`
  font-weight: ${({peso}) => peso ?? 400};
  font-size: ${({tamanho}) => tamanho ?? 12}px;
  line-height: ${({alturalinha}) =>
    alturalinha ? alturalinha + 'px' : 'normal'};
  font-family: ${({estilo}) => (estilo ? fontes[estilo] : fontes.regular)};
  color: ${({cor}) => cor ?? cores.neutralXXDark};
  text-align: ${({alinhamento}) => alinhamento ?? 'start'};
  cursor: ${({cursor}) => cursor ?? 'text'};
  text-transform: ${({transformar}) => transformar ?? 'none'};
`
