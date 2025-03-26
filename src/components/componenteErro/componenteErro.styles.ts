import styled from 'styled-components'
import {cores} from 'resources/cores'
import {margens} from 'resources/margens'
import {Texto} from 'components/texto'
import AlertaSVG from 'icons/iAlerta.svg'
import LupaSVG from 'icons/iLupa.svg'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const IconeAlerta = styled(AlertaSVG).attrs({
  height: 64,
  width: 64,
  fill: cores.neutralMedium,
})``

export const IconeLupa = styled(LupaSVG).attrs({
  height: 64,
  width: 64,
  fill: cores.neutralMedium,
})``

export const Mensagem = styled(Texto).attrs({
  tamanho: 16,
  alturalinha: 20,
  cursor: 'default',
  estilo: 'semibold',
  cor: cores.neutralXDark,
})`
  margin-top: ${margens.medium}px;
`
