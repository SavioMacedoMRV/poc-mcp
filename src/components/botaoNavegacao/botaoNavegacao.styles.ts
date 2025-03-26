import styled from 'styled-components'
import {cores} from '../../resources/cores'
import {margens} from '../../resources/margens'

export interface BotaoNavegacaoProps {
  isOpen?: boolean
  onSelect?: (option: string) => void
}

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  width: 160px;
  background: ${cores.neutralXXLight};
  border: 2px solid ${cores.background01};
  border-radius: 8px;
  height: 32px;
`

export const DropdownContainer = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  background: ${cores.neutralXXLight};
  border-radius: 16px;
  box-shadow: 0px 2px 8px rgba(32, 38, 36, 0.16);
  padding: 8px;
  z-index: 1000;
  min-width: 220px;
`

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  gap: 8px;
  justify-content: flex-start;

  span {
    line-height: 1.235em;
  }
`

export const OptionContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  padding: 4px 8px;
  justify-content: flex-start;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${cores.background01};
  }

  ${DropdownContainer} & {
    padding: 8px 12px;
    min-height: 40px;
    gap: 12px;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${cores.background01};
  margin: 4px 0;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${ButtonContent} & {
    width: 20px;
    height: 20px;
  }

  ${DropdownContainer} & {
    width: 24px;
    height: 24px;
  }
`

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`