import styled from 'styled-components'
import {cores} from 'resources/cores'
type PropsExtra = {
  $corFundo?: string
  $semCabecalho?: boolean
}

export const Container = styled.div<PropsExtra>`
  background: ${({$corFundo}) => $corFundo ?? cores.background01};
`

export const Content = styled.div<PropsExtra>`
  display: flex;
  flex-direction: column;
  min-height: ${({$semCabecalho}) =>
    `calc(100cqh - ${$semCabecalho ? 0 : 64}px)`};
`
