import React from 'react'
import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/react'
import {ModalConfirmacao} from './modalConfirmacao'

describe('ModalConfirmacao', () => {
  const aoCancelarMock = jest.fn()
  const aoConfirmarMock = jest.fn()
  const titulo = 'Titulo modal'
  const mensagem = 'mensagem do modal'

  describe('Renderização', () => {
    test('DEVE renderizar o modal quando exibir é verdadeiro', () => {
      const {getByTestId} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      const modalOverlay = getByTestId('modal-confirmacao-overlay')
      expect(modalOverlay).toBeInTheDocument()
    })

    test('DEVE renderizar o titulo e a mensagem', () => {
      const {getByText} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      expect(getByText(titulo)).toBeInTheDocument()
      expect(getByText(mensagem)).toBeInTheDocument()
    })

    test('DEVE renderizar os botões de confirmação', () => {
      const {getByTestId} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      expect(getByTestId('btn-modal-confirmacao-confirmar')).toBeInTheDocument()
      expect(getByTestId('btn-modal-confirmacao-cancelar')).toBeInTheDocument()
    })

    test('NÃO DEVE renderizar o modal quando exibir é falso', () => {
      const {queryByTestId} = render(
        <ModalConfirmacao
          exibir={false}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      const modalOverlay = queryByTestId('modal-confirmacao-overlay')
      expect(modalOverlay).not.toBeInTheDocument()
    })
  })

  describe('Comportamento', () => {
    beforeEach(() => {
      aoCancelarMock.mockClear()
      aoConfirmarMock.mockClear()
    })

    test('DEVE chamar aoCancelarMock QUANDO o modal é clicado', () => {
      const {getByTestId} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      const modalOverlay = getByTestId('modal-confirmacao-overlay')
      fireEvent.click(modalOverlay)

      expect(aoCancelarMock).toHaveBeenCalled()
    })

    test('DEVE chamar aoCancelarMock QUANDO o botão "Cancelar" é clicado', () => {
      const {getByTestId} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      const modalOverlay = getByTestId('btn-modal-confirmacao-cancelar')
      fireEvent.click(modalOverlay)

      expect(aoCancelarMock).toHaveBeenCalled()
    })

    test('DEVE chamar aoConfirmarMock QUANDO o botão "Confirmar" é clicado', () => {
      const {getByTestId} = render(
        <ModalConfirmacao
          exibir={true}
          titulo={titulo}
          mensagem={mensagem}
          aoCancelar={aoCancelarMock}
          aoConfirmar={aoConfirmarMock}
        />,
      )

      const botaoAtualizar = getByTestId('btn-modal-confirmacao-confirmar')
      fireEvent.click(botaoAtualizar)

      expect(aoConfirmarMock).toHaveBeenCalled()
    })
  })
})
