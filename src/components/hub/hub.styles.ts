import styled from 'styled-components'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'

interface ContainerProps {
  status: 'ativo' | 'inativo'
}

interface StatusBadgeProps {
  status: 'ativo' | 'inativo'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${margens.medium}px;
  background-color: ${cores.background01};
  border-radius: 16px;
  border: 1px solid ${cores.background02};
  opacity: ${props => props.status === 'inativo' ? 0.7 : 1};
  min-height: 72px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
`

export const HubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  flex: 1;
`

export const TituloContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const EnderecoContainer = styled.div`
  margin-left: 8px;
`

export const StatusBadge = styled.div<StatusBadgeProps>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.status === 'ativo' ? cores.supportFeedbackSuccess + '20' : cores.background02 + '40'};
  color: ${props => props.status === 'ativo' ? cores.supportFeedbackSuccess : cores.background03};
  margin-left: 8px;
`

export const DadosContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const DadoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Separador = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${cores.background02};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${margens.small}px;

  > button {
    padding: 8px;
    border-radius: 16px;
    width: 40px;
    height: 40px;
    
    &:hover {
      background-color: ${cores.background02}20;
    }
  }
`