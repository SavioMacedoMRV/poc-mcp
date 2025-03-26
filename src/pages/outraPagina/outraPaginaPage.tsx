import React, {Suspense} from 'react'
import {Texto} from 'components/texto'
import {useNavigate, useLoaderData, Await} from 'react-router-dom'
import {rotas} from 'resources/rotas'
import {Botao} from 'components/botao'
import {Carregando} from 'components/carregando'
import {ComponenteErro} from 'components/componenteErro'
import * as S from 'pages/home/homePage.styles'
import {ContainerPage} from 'components/containerPage'

export const OutraPaginaPage = () => {
  const navigate = useNavigate()
  const {data: dadoApi} = useLoaderData() as Awaited<{
    data: {
      id: string
      descricao: string
    }
  }>

  const aoClicarBotao = () => {
    navigate(rotas.Home)
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
      <Suspense fallback={<Carregando />}>
        <Await resolve={dadoApi} errorElement={<ComponenteErro />}>
          {dado =>
            dado && (
              <S.Content>
                <S.Logo />
                <Texto tamanho={18} estilo="semibold">
                  Portal 360 Web - Template - Outra Página
                </Texto>
                <Texto tamanho={18}>Server: {dado.descricao}</Texto>
                <Botao texto="Navegar para Home" aoClicar={aoClicarBotao} />
              </S.Content>
            )
          }
        </Await>
      </Suspense>
    </ContainerPage>
  )
}
