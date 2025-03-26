import styled from 'styled-components'
import {cores} from 'resources/cores'
import {media} from 'resources/media'
import {margens} from 'resources/margens'
import {hexToRgba} from 'helpers/cores'
import {Botao} from 'components/botao'
import {Icone} from 'components/icone'
import {Texto} from 'components/texto'
import CancelarSVG from 'icons/iCancelar.svg'

export const BotaoCancelar = styled(Botao).attrs({
  altura: 48,
  largura: 144,
  textoProps: {tamanho: 16},
  texto: 'Cancelar',
  corTexto: cores.neutralXXLight,
  cor: cores.neutralDark,
})`
  border-radius: ${margens.small}px;
`

export const BotaoConfirmar = styled(BotaoCancelar).attrs({
  texto: 'Confirmar',
  corTexto: cores.supportFeedbackError,
  cor: cores.background02,
})``

export const ContainerBotoes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const IconeCancelar = styled(Icone).attrs({
  altura: 48,
  icone: CancelarSVG,
  cor: cores.neutralXDark,
})``

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${margens.large}px;
  padding: ${margens.large}px;
  width: 350px;
  border-radius: ${margens.large}px;
  background-color: ${cores.neutralXXLight};

  @media ${media.tablet} {
    width: 300px;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: ${hexToRgba(cores.neutralDark, 0.5)};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextoMensagem = styled(Texto).attrs({
  tamanho: 14,
  cor: cores.neutralDark,
  alinhamento: 'center',
})``

export const TextoTitulo = styled(Texto).attrs({
  tamanho: 18,
  estilo: 'semibold',
  cor: cores.neutralXDark,
})``
