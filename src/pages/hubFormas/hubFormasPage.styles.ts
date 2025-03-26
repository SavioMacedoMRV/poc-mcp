import styled from 'styled-components'
import { cores } from 'resources/cores'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 32px 0;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
`

export const HubsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`