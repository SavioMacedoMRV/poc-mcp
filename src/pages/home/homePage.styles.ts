import styled from 'styled-components'
import LogoMRV from 'icons/iLogoMRV.svg'
import User from 'icons/iUser.svg'
import {margens} from 'resources/margens'
import {cores} from 'resources/cores'
import SetaSVG from 'icons/iSeta.svg'
import {Botao} from 'components/botao'

export const StyledSvg = styled(User)`
  fill: red;
  width: 32px;
  height: 32px;
`

export const BotaoNavegar = styled(Botao).attrs({
  icone: SetaSVG,
  cor: cores.brandPrimaryLight,
  corTexto: cores.neutralXXLight,
})``

export const Container = styled.div`
  background: ${cores.background01};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  height: 100vh;
  gap: ${margens.small}px;
`

export const Logo = styled(LogoMRV)`
  height: 21px;
  width: 125px;
`
