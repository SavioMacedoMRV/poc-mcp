import styled from 'styled-components'
import { margens } from 'resources/margens'
import { cores } from 'resources/cores'
import { media } from 'resources/media'
import { Botao } from 'components/botao'
import { fontes } from 'resources/fontes'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margens.xlarge}px;
  padding: ${margens.medium}px;
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg path {
    fill: ${cores.neutralDark};
  }
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

export const NovoCadastroButton = styled(Botao).attrs({
  altura: 32,
  corTexto: cores.neutralXXLight,
  cor: cores.brandPrimaryLight,
  tamanho: 12,
  estilo: 'semibold',
  espaco: 4,
  iconeProps: {
    altura: 15,
    largura: 15
  }
})`
  border-radius: 8px;
  padding: 4px 16px;
`

export const HubsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${margens.small}px;
  padding: ${margens.large}px;
  background-color: ${cores.neutralXXLight};
  border-radius: 16px;
  border: 1px solid ${cores.background02};
  min-height: 200px;
  text-align: center;
`