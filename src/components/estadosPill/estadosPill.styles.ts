import styled from 'styled-components'
import { cores } from 'resources/cores'
import { margens } from 'resources/margens'
import { BotaoIcone } from 'components/botaoIcone'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${margens.small}px;
`

export const EstadoPillContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 8px;
  height: 24px;
  background: ${cores.neutralDark};
  border-radius: 16px;
  box-shadow: 0px 2px 8px 0px rgba(32, 38, 36, 0.16);
`

export const CloseButton = styled(BotaoIcone).attrs({
  altura: 16,
  largura: 16,
  cor: cores.neutralXXLight
})`
  padding: 0;
  min-width: auto;
`

export const EstadosHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${margens.small}px;
`

export const SelectEstadoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${margens.small}px;
  margin-bottom: ${margens.small}px;
  width: 100%;
`

export const AddButton = styled(BotaoIcone).attrs({
  altura: 24,
  largura: 24,
  cor: cores.brandPrimaryPure
})`
  min-width: auto;
  padding: 0;
`

export const InputWrapper = styled.div`
  flex: 1;
`