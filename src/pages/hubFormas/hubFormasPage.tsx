import React, { useState, useEffect } from 'react'
import { ContainerPage } from 'components/containerPage'
import { useRouteLoaderData, useNavigate } from 'react-router-dom'
import { Empreendimento } from 'types/interfaces'
import { Texto } from 'components/texto'
import { HubComponent } from 'components/hub'
import { Hub, hubFormasService } from 'services/hubFormasApi/hubFormas.service'
import { Icone } from 'components/icone'
import IAdicionarSVG from 'icons/iAdicionar.svg'
import IShelvesSVG from 'icons/iShelves.svg'
import * as S from './hubFormasPage.styles'

export const HubFormasPage = () => {
  const navigate = useNavigate()
  const { obra } = useRouteLoaderData('root-template') as { obra: Empreendimento }
  const [hubs, setHubs] = useState<Hub[]>([])
  const [filteredHubs, setFilteredHubs] = useState<Hub[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    hubFormasService.listarHubs().then(data => {
      setHubs(data)
      setFilteredHubs(data)
    })
  }, [])

  useEffect(() => {
    let filtered = [...hubs]
    
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
  }, [hubs, searchTerm])

  const handleView = (hub: Hub) => {
    navigate(`/hub-formas/${hub.id}`)
  }

  const handleEdit = (hub: Hub) => {
    navigate(`/hub-formas/${hub.id}/editar`)
  }

  const handleNewHub = () => {
    navigate('/hubformas/cadastro')
  }

  const aoPesquisar = (texto?: string | number) => {
    setSearchTerm(texto?.toString() ?? '')
  }

  return (
    <ContainerPage
      cabecalhoProps={{
        pesquisa: {
          aoPesquisar,
          autoPesquisar: true
        },
      }}
    >
      <S.Content>
        <S.HeaderContainer>
          <S.TitleSection>
            <Icone icone={IShelvesSVG} altura={24} largura={24} />
            <Texto tamanho={24} estilo="bold">Lista de Hubs</Texto>
          </S.TitleSection>
          
          <S.NovoCadastroButton 
            texto="Novo cadastro"
            icone={IAdicionarSVG}
            aoClicar={handleNewHub}
          />
        </S.HeaderContainer>

        <S.HubsList>
          {filteredHubs.length > 0 ? (
            filteredHubs.map(hub => (
              <HubComponent
                key={hub.id}
                {...hub}
                aoEditar={() => handleEdit(hub)}
                aoAbrirDetalhes={() => handleView(hub)}
              />
            ))
          ) : (
            <S.EmptyState>
              <Texto tamanho={16} estilo="semibold" cor="#434645">
                Nenhum hub encontrado
              </Texto>
              <Texto tamanho={14} cor="#434645">
                Utilize o botão "Novo cadastro" para adicionar um hub
              </Texto>
            </S.EmptyState>
          )}
        </S.HubsList>
      </S.Content>
    </ContainerPage>
  )
}