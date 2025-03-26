import {render} from '@testing-library/react'
import * as S from './modalConfirmacao.styles'

describe('ModalConfirmacao.styles', () => {
  test('BotaoCancelar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoCancelar aoClicar={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoConfirmar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoConfirmar aoClicar={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('ContainerBotoes DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.ContainerBotoes />)
    expect(container).toMatchSnapshot()
  })

  test('IconeCancelar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeCancelar />)
    expect(container).toMatchSnapshot()
  })

  test('ModalContent DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.ModalContent />)
    expect(container).toMatchSnapshot()
  })

  test('ModalOverlay DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.ModalOverlay />)
    expect(container).toMatchSnapshot()
  })

  test('TextoMensagem DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoMensagem />)
    expect(container).toMatchSnapshot()
  })

  test('TextoTitulo DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoTitulo />)
    expect(container).toMatchSnapshot()
  })
})
