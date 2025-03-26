import styled from 'styled-components'
import { margens } from 'resources/margens'
import { cores } from 'resources/cores'
import { media } from 'resources/media'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.large}px;
  padding: ${margens.large}px;
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${margens.medium}px;
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${margens.medium}px;
`

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${margens.small}px;
  padding: ${margens.small}px;
  background-color: ${cores.background01};
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`

export const HubsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.medium}px;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${margens.small}px;
  padding: ${margens.large}px;
  background-color: ${cores.background01};
  border-radius: 16px;
  border: 1px solid ${cores.background02};
  min-height: 200px;
  text-align: center;
`