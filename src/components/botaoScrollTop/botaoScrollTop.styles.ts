import styled from 'styled-components'
import {margens} from 'resources/margens'
import {cores} from 'resources/cores'
import SetaSVG from 'icons/iSeta.svg'
import {Icone} from 'components/icone'
import {Texto} from 'components/texto'

export const BotaoStyled = styled.button<{$exibir?: boolean}>`
  border: none;
  display: ${({$exibir}) => ($exibir ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${margens.medium}px;
  background: transparent;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
`

export const IconeScrollTop = styled(Icone).attrs({
  icone: SetaSVG,
  cor: cores.neutralMedium,
  altura: 48,
  inclinacao: -90,
})``

export const TextoScrollTop = styled(Texto).attrs({
  tamanho: 24,
  alturalinha: 30,
  cursor: 'pointer',
  estilo: 'semibold',
  cor: cores.neutralMedium,
})``
