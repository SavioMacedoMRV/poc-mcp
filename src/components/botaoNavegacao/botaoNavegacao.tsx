import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Texto } from '../texto'
import { Icone } from '../icone'
import { cores } from '../../resources/cores'
import ArrowDownSVG from '../../assets/icons/iChevron.svg'
import ShelvesIcon from '../../assets/icons/iShelves.svg'
import HomeWorkIcon from '../../assets/icons/iHomeWork.svg'
import FoundationIcon from '../../assets/icons/iFoundation.svg'
import CogIcon from '../../assets/icons/iCog.svg'
import {
  Container,
  DropdownContainer,
  OptionContainer,
  ButtonContent,
  IconWrapper,
  Divider,
  OptionGroup,
  BotaoNavegacaoProps
} from './botaoNavegacao.styles'

interface Option {
  id: string
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const options: Option[] = [
  {
    id: 'hubs',
    label: 'Hubs',
    icon: ShelvesIcon
  },
  {
    id: 'obras',
    label: 'Obras',
    icon: HomeWorkIcon
  },
  {
    id: 'fornecedores',
    label: 'Fornecedores',
    icon: FoundationIcon
  },
  {
    id: 'pecas',
    label: 'Peças',
    icon: CogIcon
  }
]

export const BotaoNavegacao: React.FC<BotaoNavegacaoProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const handleOptionClick = useCallback((optionId: string) => {
    onSelect?.(optionId)
    setIsOpen(false)
  }, [onSelect])

  return (
    <Container ref={containerRef}>
      <OptionContainer onClick={() => setIsOpen(!isOpen)}>
        <ButtonContent>
          <Icone
            icone={ArrowDownSVG}
            cor={cores.neutralXDark}
            altura={20}
            largura={20}
            inclinacao={isOpen ? 180 : 0}
          />
          <Texto
            cor={cores.neutralXDark}
            estilo="regular"
            tamanho={12}
            alturalinha={16}
          >
            Hubs
          </Texto>
        </ButtonContent>
      </OptionContainer>

      <DropdownContainer $isOpen={isOpen}>
        <OptionGroup>
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <OptionContainer onClick={() => handleOptionClick(option.id)}>
                <IconWrapper>
                  <Icone
                    icone={option.icon}
                    cor={cores.neutralXDark}
                    altura={24}
                    largura={24}
                  />
                </IconWrapper>
                <Texto
                  cor={cores.neutralXDark}
                  estilo="regular"
                  tamanho={12}
                  alturalinha={16}
                >
                  {option.label}
                </Texto>
              </OptionContainer>
              {index < options.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </OptionGroup>
      </DropdownContainer>
    </Container>
  )
}