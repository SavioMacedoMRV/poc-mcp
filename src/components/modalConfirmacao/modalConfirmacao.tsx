import React from 'react'
import * as S from './modalConfirmacao.styles'

interface ModalProps {
  exibir: boolean
  titulo: string
  mensagem: string
  aoCancelar: () => void
  aoConfirmar: () => void
}

export const ModalConfirmacao = ({
  exibir,
  titulo,
  mensagem,
  aoCancelar,
  aoConfirmar,
}: Readonly<ModalProps>) => {
  return (
    exibir && (
      <S.ModalOverlay
        data-testid="modal-confirmacao-overlay"
        onClick={aoCancelar}
      >
        <S.ModalContent data-testid="modal-confirmacao-content">
          <S.IconeCancelar />
          <S.TextoTitulo>{titulo}</S.TextoTitulo>
          <S.TextoMensagem>{mensagem}</S.TextoMensagem>
          <S.ContainerBotoes>
            <S.BotaoConfirmar
              data-testid="btn-modal-confirmacao-confirmar"
              aoClicar={aoConfirmar}
            />
            <S.BotaoCancelar
              data-testid="btn-modal-confirmacao-cancelar"
              aoClicar={aoCancelar}
            />
          </S.ContainerBotoes>
        </S.ModalContent>
      </S.ModalOverlay>
    )
  )
}
