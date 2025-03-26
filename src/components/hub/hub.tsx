import React from 'react'
import * as S from './hub.styles'
import { Texto } from 'components/texto'
import { Icone } from 'components/icone'
import { cores } from 'resources/cores'
import PalletSVG from 'icons/pallet.svg'
import SquareFootSVG from 'icons/square_foot.svg'
import EditSVG from 'icons/iEdicao.svg'
import ShelvesSVG from 'icons/iShelves.svg'

interface HubProps {
  id: string
  nome: string
  status: 'ativo' | 'inativo'
  area: number
  ocupacaoAtual: number
  capacidadeTotal: number
  aoEditar: () => void
  aoAbrirDetalhes: () => void
}

export const HubComponent = ({ 
  id,
  nome,
  status,
  area,
  ocupacaoAtual,
  capacidadeTotal,
  aoEditar,
  aoAbrirDetalhes
}: Readonly<HubProps>) => {
  return (
    <S.Container status={status}>
      <S.InfoSection>
        <Icone icone={ShelvesSVG} cor="#434645" altura={24} largura={24} />
        <S.HubName>{nome}</S.HubName>
      </S.InfoSection>

      <S.MetricsSection>
        <S.MetricItem>
          <Icone icone={SquareFootSVG} cor="#434645" altura={24} largura={24} />
          <Texto tamanho={14} estilo="semibold" cor="#434645">
            {area.toLocaleString()}m²
          </Texto>
        </S.MetricItem>

        <S.Divider />

        <S.MetricItem>
          <Icone icone={PalletSVG} cor="#434645" altura={24} largura={24} />
          <Texto tamanho={14} estilo="semibold" cor="#434645">
            {ocupacaoAtual.toLocaleString()} | {capacidadeTotal.toLocaleString()}
          </Texto>
        </S.MetricItem>

        <S.Divider />

        <S.ActionButton
            icone={ShelvesSVG}
            cor={cores.neutralXDark}
            aoClicar={aoAbrirDetalhes}
          />
          <S.ActionButton
            icone={EditSVG}
            cor={cores.neutralXDark}
            aoClicar={aoEditar}
          />
      </S.MetricsSection>
    </S.Container>
  )
}