import Lottie from 'lottie-react'
import styled from 'styled-components'
import animacao from 'animations/carregando.json'

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
`
export const Animacao = styled(Lottie).attrs({
  animationData: animacao,
})`
  width: 350px;
`
