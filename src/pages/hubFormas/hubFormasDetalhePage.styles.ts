import styled from 'styled-components'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.medium}px;
  padding: ${margens.medium}px;
  background-color: ${cores.background01};
`

export const DetalheContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.small}px;
  padding: ${margens.medium}px;
  background-color: ${cores.neutralXXLight};
  border-radius: 8px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${margens.medium}px;
`