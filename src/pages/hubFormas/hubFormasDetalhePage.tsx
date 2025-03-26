import React, { Suspense } from 'react'
import { Texto } from 'components/texto'
import { ContainerPage } from 'components/containerPage'
import { useRouteLoaderData, useLoaderData, Await, useNavigate } from 'react-router-dom'
import { Empreendimento } from 'types/interfaces'
import { Carregando } from 'components/carregando'
import { Botao } from 'components/botao'
import * as S from './hubFormasDetalhePage.styles'

export const HubFormasDetalhePage = () => {
  const navigate = useNavigate()
  const { obra } = useRouteLoaderData('root-template') as { obra: Empreendimento }
  const { data } = useLoaderData() as { data: Promise<any> }

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
        <Texto tamanho={18} estilo="semibold">
          Detalhes do Formulário
        </Texto>
        {obra && (
          <Texto tamanho={16}>Obra: {obra.nome}</Texto>
        )}
        <Suspense fallback={<Carregando />}>
          <Await resolve={data}>
            {(resolvedData) => (
              <S.DetalheContainer>
                <Texto tamanho={16} estilo="semibold">ID: {resolvedData.id}</Texto>
                <Texto tamanho={16}>Formulário: {resolvedData.nome || 'N/A'}</Texto>
                <S.ButtonContainer>
                  <Botao texto="Voltar" aoClicar={() => navigate(-1)} />
                </S.ButtonContainer>
              </S.DetalheContainer>
            )}
          </Await>
        </Suspense>
      </S.Content>
    </ContainerPage>
  )
}