import styled from 'styled-components'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'
import { fontes } from 'resources/fontes'
import { Texto } from 'components/texto'
import { BotaoIcone } from 'components/botaoIcone'

interface ContainerProps {
  status: 'ativo' | 'inativo'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${cores.neutralXXLight};
  border-radius: 16px;
  width: 100%;
  gap: 392px;
  opacity: ${({ status }) => (status === 'ativo' ? 1 : 0.5)};
`

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const MetricsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
  }
`

export const Divider = styled.div`
  width: 2px;
  height: 24px;
  background: ${cores.background01};
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ActionButton = styled(BotaoIcone).attrs({
  altura: 40,
  largura: 40,
  cor: cores.neutralXXLight,
})`
  border-radius: 16px;
  padding: 8px;
  background: transparent;
  
  &:hover {
    background: ${cores.background01};
  }

  svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${cores.neutralXDark};
    }
  }
`

export const HubName = styled(Texto).attrs({
  tamanho: 14,
  alturalinha: 24,
  estilo: 'semibold',
  cor: cores.neutralXDark,
})`
  white-space: nowrap;
`