import styled from 'styled-components'
import { cores } from 'resources/cores'
type PropsExtra = {
  $corFundo?: string
  $semCabecalho?: boolean
}

export const Container = styled.div<PropsExtra>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ $corFundo }) => $corFundo || cores.background01};
`

export const Content = styled.div<PropsExtra>`
  display: flex;
  flex-direction: column;
  min-height: ${({$semCabecalho}) =>
    `calc(100cqh - ${$semCabecalho ? 0 : 64}px)`};
`
