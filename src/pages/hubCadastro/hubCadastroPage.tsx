import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { Input } from 'components/input'
import { Icone } from 'components/icone'
import { BotaoIcone } from 'components/botaoIcone'
import { cores } from 'resources/cores'
import { rotas } from 'resources/rotas'
import { EstadosPill } from 'components/estadosPill'
import { hubFormasService, CreateHubRequest } from 'services/hubFormasApi/hubFormas.service'
import { locationService, Estado, Cidade } from 'services/locationApi'
import ArrowBackIosSVG from '../../assets/icons/iArrowBackIos.svg'
import EditarSVG from '../../assets/icons/iEdicao.svg'
import FecharSVG from '../../assets/icons/iFechar.svg'
import AdicionarSVG from '../../assets/icons/iAdicionar.svg'
import LupaSVG from '../../assets/icons/iLupa.svg'
import TaskAltSVG from '../../assets/icons/iTaskAlt.svg'
import * as S from './hubCadastroPage.styles'
import { ContainerPage } from 'components/containerPage'

type FormData = Omit<CreateHubRequest, 'capacidade' | 'estadosAtendidos'> & {
  capacidade: string;
}

export const HubCadastroPage = () => {
  const navigate = useNavigate()
  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    capacidade: '',
    cep: '',
    estado: '',
    cidade: '',
    endereco: '',
    numero: '',
    complemento: ''
  })
  
  // States for location data
  const [estados, setEstados] = useState<Estado[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [estadoSelecionado, setEstadoSelecionado] = useState<Estado | null>(null)
  const [carregandoEstados, setCarregandoEstados] = useState(false)
  const [carregandoCidades, setCarregandoCidades] = useState(false)
  
  // Fetch states when component mounts
  useEffect(() => {
    const fetchEstados = async () => {
      setCarregandoEstados(true)
      try {
        const data = await locationService.obterEstados()
        setEstados(data)
      } catch (error) {
        console.error('Erro ao buscar estados:', error)
      } finally {
        setCarregandoEstados(false)
      }
    }
    
    fetchEstados()
  }, [])
  
  // Fetch cities when a state is selected
  useEffect(() => {
    if (!estadoSelecionado) {
      setCidades([])
      return
    }
    
    const fetchCidades = async () => {
      setCarregandoCidades(true)
      try {
        const data = await locationService.obterCidadesPorEstado(estadoSelecionado.id)
        setCidades(data)
      } catch (error) {
        console.error('Erro ao buscar cidades:', error)
      } finally {
        setCarregandoCidades(false)
      }
    }
    
    fetchCidades()
  }, [estadoSelecionado])
  
  // Handler for state selection
  const handleEstadoSelect = (estado: Estado) => {
    setEstadoSelecionado(estado)
    setFormData(prev => ({ ...prev, estado: estado.nome }))
    // Clear city when state changes
    setFormData(prev => ({ ...prev, cidade: '' }))
  }
  
  // Handler for city selection
  const handleCidadeSelect = (cidade: Cidade) => {
    setFormData(prev => ({ ...prev, cidade: cidade.nome }))
  }
  
  // Handler for estado input change
  const handleEstadoInputChange = (value: string | number | undefined) => {
    if (value !== undefined) {
      setFormData(prev => ({ ...prev, estado: value.toString() }))
    }
  }
  
  // Handler for cidade input change
  const handleCidadeInputChange = (value: string | number | undefined) => {
    if (value !== undefined) {
      setFormData(prev => ({ ...prev, cidade: value.toString() }))
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | number | undefined) => {
    if (value !== undefined) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleAddEstado = () => {
    if (formData.estado && !estadosSelecionados.includes(formData.estado)) {
      setEstadosSelecionados([...estadosSelecionados, formData.estado])
      setFormData(prev => ({ ...prev, estado: '' }))
    }
  }

  const handleRemoveEstado = (estado: string) => {
    setEstadosSelecionados(estadosSelecionados.filter(e => e !== estado))
  }

  const handleConfirmar = async () => {
    try {
      await hubFormasService.criarHub({
        ...formData,
        capacidade: Number(formData.capacidade),
        estadosAtendidos: estadosSelecionados
      })
      navigate(rotas.HubFormas)
    } catch (error) {
      console.error('Erro ao criar hub:', error)
    }
  }

  return (
    <ContainerPage
      cabecalhoProps={{
        modoCadastro: true,
        aoClicarVoltar: () => navigate(-1),
      }}
    >
      <S.Content>
        <S.HeaderContainer>
          <Icone icone={EditarSVG} cor={cores.neutralDark} largura={32} altura={32} />
          <S.FormTitle>Cadastro de Hub</S.FormTitle>
        </S.HeaderContainer>

        <S.FormContainer>
          <S.Section>
            <S.SectionTitle>Descrição</S.SectionTitle>
            <S.StyledInput>
              <Input
                label="Nome do Hub"
                required={true}
                valor={formData.nome}
                aoDigitar={(valor) => handleInputChange('nome', valor)}
                textoProps={{
                  estilo: 'regular',
                  tamanho: 14
                }}
              />
            </S.StyledInput>
            <S.StyledInput>
              <Input
                label="Descrição"
                valor={formData.descricao}
                aoDigitar={(valor) => handleInputChange('descricao', valor)}
                textoProps={{
                  estilo: 'regular',
                  tamanho: 14
                }}
              />
            </S.StyledInput>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Capacidade</S.SectionTitle>
            <S.StyledInput>
              <Input
                label="Armazenamento de alumínio (m²)"
                required={true}
                valor={formData.capacidade}
                aoDigitar={(valor) => handleInputChange('capacidade', valor)}
                tipo="numero"
                textoProps={{
                  estilo: 'regular',
                  tamanho: 14
                }}
              />
            </S.StyledInput>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Localização</S.SectionTitle>
            <S.StyledInput>
              <Input
                label="CEP"
                required={true}
                valor={formData.cep}
                aoDigitar={(valor) => handleInputChange('cep', valor)}
                textoProps={{
                  estilo: 'regular',
                  tamanho: 14
                }}
              />
            </S.StyledInput>

            <S.Row>
              <S.StyledInput>
                <Input
                  label="Estado"
                  required={true}
                  tipo="pesquisa"
                  valor={formData.estado}
                  aoDigitar={(valor) => handleEstadoInputChange(valor)}
                  opcoesPesquisa={estados.map(estado => estado.nome)}
                  aoSelecionarOpcao={(option) => {
                    const selected = estados.find(estado => estado.nome === option);
                    if (selected) {
                      handleEstadoSelect(selected);
                    }
                  }}
                  carregandoOpcoes={carregandoEstados}
                  textoProps={{
                    estilo: 'regular',
                    tamanho: 14
                  }}
                />
              </S.StyledInput>
              <S.StyledInput>
                <Input
                  label="Cidade"
                  required={true}
                  tipo="pesquisa"
                  valor={formData.cidade}
                  aoDigitar={(valor) => handleCidadeInputChange(valor)}
                  opcoesPesquisa={cidades.map(cidade => cidade.nome)}
                  aoSelecionarOpcao={(option) => {
                    const selected = cidades.find(cidade => cidade.nome === option);
                    if (selected) {
                      handleCidadeSelect(selected);
                    }
                  }}
                  carregandoOpcoes={carregandoCidades}
                  desabilitado={!estadoSelecionado}
                  textoProps={{
                    estilo: 'regular',
                    tamanho: 14
                  }}
                />
              </S.StyledInput>
            </S.Row>

            <S.StyledInput>
              <Input
                label="Endereço"
                required={true}
                valor={formData.endereco}
                aoDigitar={(valor) => handleInputChange('endereco', valor)}
                textoProps={{
                  estilo: 'regular',
                  tamanho: 14
                }}
              />
            </S.StyledInput>

            <S.Row>
              <S.StyledInput>
                <Input
                  label="Número"
                  required={true}
                  valor={formData.numero}
                  aoDigitar={(valor) => handleInputChange('numero', valor)}
                  textoProps={{
                    estilo: 'regular',
                    tamanho: 14
                  }}
                />
              </S.StyledInput>
              <S.StyledInput>
                <Input
                  label="Complemento"
                  valor={formData.complemento}
                  aoDigitar={(valor) => handleInputChange('complemento', valor)}
                  textoProps={{
                    estilo: 'regular',
                    tamanho: 14
                  }}
                />
              </S.StyledInput>
            </S.Row>
          </S.Section>

          <S.Section>
            <EstadosPill 
              estadosSelecionados={estadosSelecionados}
              aoAdicionarEstado={(estado: string) => {
                if (!estadosSelecionados.includes(estado)) {
                  setEstadosSelecionados([...estadosSelecionados, estado])
                }
              }}
              aoRemoverEstado={handleRemoveEstado}
            />
          </S.Section>
        </S.FormContainer>

        <S.ConfirmButton
          texto="Confirmar cadastro"
          aoClicar={handleConfirmar}
          icone={TaskAltSVG}
          textoProps={{
            tamanho: 16,
            estilo: 'semibold',
            alinhamento: 'center',
            alturalinha: 20
          }}
          iconeProps={{
            largura: 24,
            altura: 24,
            cor: cores.neutralXXLight
          }}
        />
      </S.Content>
    </ContainerPage>
  )
}