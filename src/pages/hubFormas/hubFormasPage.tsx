import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { ContainerPage } from 'components/containerPage'
import { Botao } from 'components/botao'
import { Icone } from 'components/icone'
import { HubComponent } from 'components/hub'
import { Hub, hubFormasService } from 'services/hubFormasApi/hubFormas.service'
import iAdicionar from 'icons/iAdicionar.svg'
import iShelves from 'icons/iShelves.svg'
import * as S from './hubFormasPage.styles'

export const HubFormasPage = () => {
  const navigate = useNavigate()
  const [hubs, setHubs] = useState<Hub[]>([])
  const [filteredHubs, setFilteredHubs] = useState<Hub[]>([])
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativo' | 'inativo'>('todos')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    hubFormasService.listarHubs().then(data => {
      setHubs(data)
      setFilteredHubs(data)
    })
  }, [])

  useEffect(() => {
    let filtered = [...hubs]
    
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(hub => hub.status === statusFilter)
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(hub => 
        hub.nome.toLowerCase().includes(term) ||
        hub.cidade.toLowerCase().includes(term) ||
        hub.estado.toLowerCase().includes(term) ||
        hub.endereco.toLowerCase().includes(term)
      )
    }
    
    setFilteredHubs(filtered)
  }, [hubs, statusFilter, searchTerm])

  const handleView = (hub: Hub) => {
    navigate(`/hub-formas/${hub.id}`)
  }

  const handleEdit = (hub: Hub) => {
    navigate(`/hub-formas/${hub.id}/editar`)
  }

  const handleNewHub = () => {
    navigate('/hub-formas/novo')
  }

  const aoPesquisar = (texto?: string | number) => {
    setSearchTerm(texto?.toString() ?? '')
  }

  const getStatusCount = (status: 'ativo' | 'inativo') => {
    return hubs.filter(hub => hub.status === status).length
  }

  return (
    <ContainerPage
      cabecalhoProps={{
        pesquisa: {
          aoPesquisar,
          autoPesquisar: true
        },
        filtroPepSuperior: (
          <S.FiltersContainer>
            <Botao
              texto={`Todos (${hubs.length})`}
              aoClicar={() => setStatusFilter('todos')}
              cor={statusFilter === 'todos' ? 'primaria' : 'secundaria'}
            />
            <Botao
              texto={`Ativos (${getStatusCount('ativo')})`}
              aoClicar={() => setStatusFilter('ativo')}
              cor={statusFilter === 'ativo' ? 'primaria' : 'secundaria'}
            />
            <Botao
              texto={`Inativos (${getStatusCount('inativo')})`}
              aoClicar={() => setStatusFilter('inativo')}
              cor={statusFilter === 'inativo' ? 'primaria' : 'secundaria'}
            />
          </S.FiltersContainer>
        )
      }}
    >
      <S.Content>
        <S.HeaderContainer>
          <S.TitleSection>
            <Icone icone={iShelves} altura={24} largura={24} />
            <Texto tamanho={24} estilo="semibold">
              Lista de Hubs
            </Texto>
          </S.TitleSection>
          <Botao
            texto="Novo cadastro"
            icone={iAdicionar}
            aoClicar={handleNewHub}
            cor="primaria"
          />
        </S.HeaderContainer>

        <S.HubsList>
          {filteredHubs.length > 0 ? (
            filteredHubs.map(hub => (
              <HubComponent
                key={hub.id}
                hub={hub}
                onView={handleView}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <S.EmptyState>
              <Icone icone={iShelves} altura={32} largura={32} />
              <Texto tamanho={16} cor="secundaria">
                Nenhum hub encontrado com os filtros selecionados
              </Texto>
            </S.EmptyState>
          )}
        </S.HubsList>
      </S.Content>
    </ContainerPage>
  )
}