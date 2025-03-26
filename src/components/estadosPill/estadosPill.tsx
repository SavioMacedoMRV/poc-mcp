import React, { useState } from 'react'
import { Texto } from 'components/texto'
import { Input } from 'components/input'
import { cores } from 'resources/cores'
import IFecharSmallSVG from 'assets/icons/iFecharSmall.svg'
import IAdicionarSVG from 'assets/icons/iAdicionar.svg'
import * as S from './estadosPill.styles'

// Mock data for Brazilian states based on the Figma design
const ESTADOS_BRASILEIROS = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
  'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
  'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
  'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
  'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
]

interface EstadoPillProps {
  estado: string
  aoRemover: (estado: string) => void
}

interface EstadosPillProps {
  estadosSelecionados: string[]
  aoAdicionarEstado: (estado: string) => void
  aoRemoverEstado: (estado: string) => void
}

const EstadoPill: React.FC<EstadoPillProps> = ({ estado, aoRemover }) => {
  return (
    <S.EstadoPillContainer>
      <Texto tamanho={12} estilo="semibold" cor={cores.neutralXXLight}>
        {estado}
      </Texto>
      <S.CloseButton
        icone={IFecharSmallSVG}
        aoClicar={() => aoRemover(estado)}
      />
    </S.EstadoPillContainer>
  )
}

export const EstadosPill: React.FC<EstadosPillProps> = ({
  estadosSelecionados,
  aoAdicionarEstado,
  aoRemoverEstado
}) => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('')
  const [opcoesFiltradas, setOpcoesFiltradas] = useState<string[]>([])

  const handleEstadoInputChange = (valor?: string | number) => {
    const textoFiltro = valor?.toString() || ''
    setEstadoSelecionado(textoFiltro)
    
    if (textoFiltro.length > 0) {
      const filtradas = ESTADOS_BRASILEIROS.filter(
        estado => 
          estado.toLowerCase().includes(textoFiltro.toLowerCase()) && 
          !estadosSelecionados.includes(estado)
      )
      setOpcoesFiltradas(filtradas)
    } else {
      setOpcoesFiltradas([])
    }
  }

  const handleEstadoSelect = (estado: string) => {
    if (estado && !estadosSelecionados.includes(estado)) {
      aoAdicionarEstado(estado)
      setEstadoSelecionado('')
      setOpcoesFiltradas([])
    }
  }

  const handleAdicionarEstado = () => {
    if (estadoSelecionado && !estadosSelecionados.includes(estadoSelecionado)) {
      aoAdicionarEstado(estadoSelecionado)
      setEstadoSelecionado('')
      setOpcoesFiltradas([])
    }
  }

  return (
    <div>
      <S.EstadosHeader>
        <Texto tamanho={16} estilo="semibold" cor={cores.brandPrimaryPure}>
          Estados atendidos
        </Texto>
      </S.EstadosHeader>
      
      <S.SelectEstadoContainer>
        <S.InputWrapper>
          <Input
            label="Selecione um estado"
            tipo="pesquisa"
            valor={estadoSelecionado}
            aoDigitar={handleEstadoInputChange}
            opcoesPesquisa={opcoesFiltradas}
            aoSelecionarOpcao={handleEstadoSelect}
            textoProps={{
              estilo: 'regular',
              tamanho: 14
            }}
          />
        </S.InputWrapper>
        <S.AddButton 
          icone={IAdicionarSVG}
          aoClicar={handleAdicionarEstado}
        />
      </S.SelectEstadoContainer>
      
      <S.Container>
        {estadosSelecionados.map((estado) => (
          <EstadoPill 
            key={estado} 
            estado={estado} 
            aoRemover={aoRemoverEstado} 
          />
        ))}
      </S.Container>
    </div>
  )
}