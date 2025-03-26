import styled from 'styled-components'
import {cores} from '../../resources/cores'
import {margens} from '../../resources/margens'

export interface BotaoHubsProps {
  isOpen?: boolean
  onSelect?: (option: string) => void
}

export const Container = styled.div`
  position: relative;
  display: inline-block;
`

export const DropdownContainer = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  background: ${cores.neutralXXLight};
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(32, 38, 36, 0.16);
  padding: ${margens.small}px;
  z-index: 1000;
  min-width: 200px;
`

export const OptionContainer = styled.button`
  display: flex;
  align-items: center;
  gap: ${margens.xxsmall}px;
  padding: ${margens.small}px;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    background: ${cores.background01};
    border-radius: 8px;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${cores.background01};
  margin: ${margens.xxsmall}px 0;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`