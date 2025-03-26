import styled from 'styled-components'
import { cores } from 'resources/cores'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${cores.background04};
  border-radius: 16px;
  width: 100%;
`

export const HubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 392px;
`

export const TituloContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DadosContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const DadoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const Separador = styled.div`
  width: 2px;
  height: 24px;
  background-color: ${cores.background01};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`