import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { ContainerPage } from 'components/containerPage'
import { Botao } from 'components/botao'
import { HubComponent } from 'components/hub'
import { Hub, hubFormasService } from 'services/hubFormasApi/hubFormas.service'
import iAdicionar from 'icons/iAdicionar.svg'
import * as S from './hubFormasPage.styles'

export const HubFormasPage = () => {
  const navigate = useNavigate()
  const [hubs, setHubs] = useState<Hub[]>([])
  const [filteredHubs, setFilteredHubs] = useState<Hub[]>([])

  useEffect(() => {
    hubFormasService.listarHubs().then(data => {
      setHubs(data)
      setFilteredHubs(data)
    })
  }, [])

  const handleView = (hub: Hub) => {
    // TODO: Implement view action
    console.log('View hub:', hub)
  }

  const handleEdit = (hub: Hub) => {
    // TODO: Implement edit action
    console.log('Edit hub:', hub)
  }

  const handleNewHub = () => {
    // TODO: Implement new hub action
    console.log('New hub')
  }

  const aoPesquisar = (texto?: string | number) => {
    if (!texto) {
      setFilteredHubs(hubs)
      return
    }
    const searchTerm = texto.toString().toLowerCase()
    const filtered = hubs.filter(hub => 
      hub.nome.toLowerCase().includes(searchTerm)
    )
    setFilteredHubs(filtered)
  }

  return (
    <ContainerPage
      cabecalhoProps={{
        pesquisa: {
          aoPesquisar,
          autoPesquisar: true
        },
        filtroPepSuperior: <div>Lista de Hubs</div>,
        filtroAtividade: <div>Filtros</div>,
        aoClicarVoltar: () => navigate(-1)
      }}
    >
      <S.Content>
        <S.HeaderContainer>
          <S.TitleSection>
            <Texto tamanho={24} estilo="semibold">
              Lista de Hubs
            </Texto>
            <Botao
              texto="Novo cadastro"
              icone={iAdicionar}
              aoClicar={handleNewHub}
              cor="primaria"
            />
          </S.TitleSection>
        </S.HeaderContainer>

        <S.HubsList>
          {filteredHubs.map(hub => (
            <HubComponent
              key={hub.id}
              hub={hub}
              onView={() => handleView(hub)}
              onEdit={() => handleEdit(hub)}
            />
          ))}
        </S.HubsList>
      </S.Content>
    </ContainerPage>
  )
}