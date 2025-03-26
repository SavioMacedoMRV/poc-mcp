import { BotaoIcone } from 'components/botaoIcone'
import { Icone } from 'components/icone'
import { Texto } from 'components/texto'
import { Hub } from 'services/hubFormasApi/hubFormas.service'
import iShelves from 'icons/iShelves.svg'
import iHomeWork from 'icons/iHomeWork.svg'
import iEdicao from 'icons/iEdicao.svg'
import * as S from './hub.styles'

interface HubProps {
  hub: Hub
  onEdit?: (hub: Hub) => void
  onView?: (hub: Hub) => void
}

export const HubComponent = ({ hub, onEdit, onView }: HubProps) => {
  const ocupacaoPercentual = Math.round((hub.ocupacaoAtual / hub.capacidadeTotal) * 100)
  
  return (
    <S.Container status={hub.status}>
      <S.HubInfo>
        <S.TituloContainer>
          <Icone icone={iShelves} altura={24} largura={24} />
          <Texto estilo="semibold" tamanho={14}>
            {hub.nome}
          </Texto>
          <S.StatusBadge status={hub.status}>
            <Texto tamanho={12} estilo="semibold">
              {hub.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </Texto>
          </S.StatusBadge>
        </S.TituloContainer>

        <S.DadosContainer>
          <S.DadoItem>
            <Icone icone={iHomeWork} altura={20} largura={20} />
            <Texto estilo="semibold" tamanho={14}>
              {hub.area.toLocaleString()}m²
            </Texto>
          </S.DadoItem>

          <S.Separador />

          <S.DadoItem>
            <Icone icone={iShelves} altura={20} largura={20} />
            <Texto estilo="semibold" tamanho={14}>
              {hub.ocupacaoAtual} | {hub.capacidadeTotal}
            </Texto>
          </S.DadoItem>
        </S.DadosContainer>
      </S.HubInfo>

      <S.Actions>
        {onView && (
          <BotaoIcone
            icone={iShelves}
            altura={24}
            largura={24}
            aoClicar={() => onView(hub)}
            cor="primaria"
            disabled={hub.status === 'inativo'}
          />
        )}
        {onEdit && (
          <BotaoIcone
            icone={iEdicao}
            altura={24}
            largura={24}
            aoClicar={() => onEdit(hub)}
            cor="primaria"
          />
        )}
      </S.Actions>
    </S.Container>
  )
}