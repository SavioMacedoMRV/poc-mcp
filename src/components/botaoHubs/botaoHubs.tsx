import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Texto } from '../texto'
import { Icone } from '../icone'
import { cores } from '../../resources/cores'
import {
  Container,
  DropdownContainer,
  OptionContainer,
  Divider,
  IconWrapper,
  BotaoHubsProps
} from './botaoHubs.styles'

interface Option {
  id: string
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const options: Option[] = [
  {
    id: 'hubs',
    label: 'Hubs',
    icon: require('../../assets/icons/iBloco.svg').default
  },
  {
    id: 'obras',
    label: 'Obras',
    icon: require('../../assets/icons/iBloco.svg').default // Replace with correct icon
  },
  {
    id: 'fornecedores',
    label: 'Fornecedores',
    icon: require('../../assets/icons/iBloco.svg').default // Replace with correct icon
  },
  {
    id: 'pecas',
    label: 'Peças',
    icon: require('../../assets/icons/iBloco.svg').default // Replace with correct icon
  }
]

export const BotaoHubs: React.FC<BotaoHubsProps> = ({ onSelect }) => {
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
        <IconWrapper>
          <Icone
            icone={options[0].icon}
            cor={cores.neutralXDark}
            altura={24}
            largura={24}
          />
        </IconWrapper>
        <Texto
          cor={cores.neutralXDark}
          estilo="semibold"
          tamanho={12}
        >
          {options[0].label}
        </Texto>
      </OptionContainer>

      <DropdownContainer $isOpen={isOpen}>
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
                estilo="semibold"
                tamanho={12}
              >
                {option.label}
              </Texto>
            </OptionContainer>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </DropdownContainer>
    </Container>
  )
}