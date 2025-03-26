import styled from 'styled-components'
import { Botao } from 'components/botao'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'
import { media } from 'resources/media'
import { fontes } from 'resources/fontes'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: ${margens.medium}px;
  max-width: 879px;
  margin: 0 auto;
  width: 100%;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 879px;
  margin: 0 auto;
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
  max-width: 879px;
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
  color: ${cores.brandPrimaryPure};
  margin: 0;
`

export const FormTitle = styled.h1`
  font-size: 24px;
  font-family: AvertaStd-Black;
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
  padding: 0px 8px;
  height: 24px;
  background: ${cores.neutralDark};
  border-radius: 16px;
  box-shadow: 0px 2px 8px 0px rgba(32, 38, 36, 0.16);
`

export const ConfirmButton = styled(Botao).attrs({
  cor: cores.supportFeedbackSuccess,
  corTexto: cores.neutralXXLight
})`
  border-radius: 16px;
  padding: 12px 80px;
  align-self: stretch;
  width: 100%;
  max-width: 879px;
  margin: 0 auto;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${cores.neutralXXLight} !important;
    }
  }
`

export const SearchableDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${cores.neutralXXLight};
  border: 2px solid ${cores.background02};
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const DropdownItem = styled.div<{ $isHighlighted?: boolean }>`
  padding: ${margens.xsmall}px;
  cursor: pointer;
  font-family: ${fontes.semibold};
  font-size: 14px;
  color: ${cores.neutralXXDark};
  background-color: ${({ $isHighlighted }) => $isHighlighted ? cores.background01 : 'transparent'};

  &:hover {
    background-color: ${cores.background01};
  }
`

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${margens.xsmall}px;
  color: ${cores.neutralDark};
  font-family: ${fontes.regular};
  font-size: 14px;
`

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${cores.neutralXXLight};
  border: 2px solid ${cores.background02};
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`