import { Botao } from 'components/botao'
import { BotaoIcone } from 'components/botaoIcone'
import { Icone } from 'components/icone'
import { Texto } from 'components/texto'
import { Hub } from 'services/hubFormasApi/hubFormas.service'
import iBloco from 'icons/iBloco.svg'
import iAlerta from 'icons/iAlerta.svg'
import iEdicao from 'icons/iEdicao.svg'
import * as S from './hub.styles'

interface HubProps {
  hub: Hub
  onEdit?: (hub: Hub) => void
  onView?: (hub: Hub) => void
}

export const HubComponent = ({ hub, onEdit, onView }: HubProps) => {
  return (
    <S.Container>
      <S.HubInfo>
        <S.TituloContainer>
          <Icone icone={iBloco} altura={24} largura={24} />
          <Texto estilo="semibold" tamanho={14}>
            {hub.nome}
          </Texto>
        </S.TituloContainer>

        <S.DadosContainer>
          <S.DadoItem>
            <Icone icone={iAlerta} altura={24} largura={24} />
            <Texto estilo="semibold" tamanho={14}>
              {hub.area}m²
            </Texto>
          </S.DadoItem>

          <S.Separador />

          <S.DadoItem>
            <Icone icone={iBloco} altura={24} largura={24} />
            <Texto estilo="semibold" tamanho={14}>
              {hub.ocupacaoAtual} | {hub.capacidadeTotal}
            </Texto>
          </S.DadoItem>
        </S.DadosContainer>
      </S.HubInfo>

      <S.Actions>
        {onView && (
          <BotaoIcone
            icone={iBloco}
            altura={40}
            largura={40}
            aoClicar={() => onView(hub)}
            cor="primaria"
          />
        )}
        {onEdit && (
          <BotaoIcone
            icone={iEdicao}
            altura={40}
            largura={40}
            aoClicar={() => onEdit(hub)}
            cor="primaria"
          />
        )}
      </S.Actions>
    </S.Container>
  )
}