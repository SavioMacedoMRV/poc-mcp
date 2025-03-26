import React from 'react'
import {Texto} from 'components/texto'
import * as S from './homePage.styles'
import {useRouteLoaderData, useNavigate, useLoaderData} from 'react-router-dom'
import {rotas} from 'resources/rotas'
import {Empreendimento} from 'types/interfaces'
import {RegistrarEvento} from 'infrastructure/logs'
import {Evento} from 'types/enums'
import {ContainerPage} from 'components/containerPage'

export const HomePage = () => {
  const navigate = useNavigate()
  const {obra} = useRouteLoaderData('root-template') as {obra: Empreendimento}
  const {info} = useLoaderData() as {info: string}
  
  const aoClicarBotao = () => {
    RegistrarEvento({evento: Evento.HomePageClickNavegarOutraPagina})
    navigate(`${rotas.OutraPagina}/12345`)
  }

  const aoPesquisar = (texto?: string | number) => {
    // Implement search logic here
    console.log('Pesquisando:', texto)
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
        <S.Logo />
        <S.StyledSvg />
        <Texto tamanho={18} estilo="semibold">
          Portal 360 - Hub de Formulários
        </Texto>
        {obra && (
          <>
            <Texto tamanho={18}>Obra do Host: {obra.nome}</Texto>
            <Texto tamanho={18}>Status da API: {info}</Texto>
            <S.BotaoNavegar
              data-testid={'btn-navegar-outra-pagina'}
              texto="Acessar Formulários"
              aoClicar={aoClicarBotao}
            />
          </>
        )}
      </S.Content>
    </ContainerPage>
  )
}
