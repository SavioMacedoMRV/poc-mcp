import styled from 'styled-components'
import { Botao } from 'components/botao'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'
import { media } from 'resources/media'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.xlarge}px;
  padding: ${margens.medium}px;
  max-width: 1350px;
  margin: 0 auto;
  width: 100%;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: ${cores.background01};
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.xlarge}px;
  padding: ${margens.large}px;
  background: ${cores.neutralXXLight};
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.medium}px;
`

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-family: AvertaStd-Semibold;
  color: ${cores.neutralXDark};
  margin: 0;
`

export const FormTitle = styled.h1`
  font-size: 24px;
  font-family: AvertaStd-Bold;
  color: ${cores.neutralXDark};
  margin: 0;
`

export const Row = styled.div`
  display: flex;
  gap: ${margens.medium}px;
  width: 100%;

  @media ${media.tablet} {
    flex-direction: column;
  }
`

export const StyledInput = styled.div`
  width: 100%;
`

export const EstadosHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const EstadosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${margens.small}px;
`

export const EstadoPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: ${cores.brandPrimaryPure};
  border-radius: 16px;
`

export const ConfirmButton = styled(Botao).attrs({
  cor: cores.brandPrimaryPure,
  corTexto: cores.neutralXXLight
})`
  align-self: flex-end;
  border-radius: 8px;
  padding: 8px 16px;
`