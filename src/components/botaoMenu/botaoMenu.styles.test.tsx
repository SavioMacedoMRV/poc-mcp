import {render} from '@testing-library/react'
import * as S from './botaoMenu.styles'

describe('BotaoMenu.styles', () => {
  test('BotaoMenuIcone DEVE ser igual ao snapshot', () => {
    const {container} = render(
      <S.BotaoMenuIcone aoClicar={jest.fn()} icone={() => <svg />} />,
    )
    expect(container).toMatchSnapshot()
  })

  test('BotaoMenuTexto DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoMenuTexto />)
    expect(container).toMatchSnapshot()
  })

  test('ContainerBotaoMenu DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.ContainerBotaoMenu />)
    expect(container).toMatchSnapshot()
  })

  test('ContainerSuspenso DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.ContainerSuspenso />)
    expect(container).toMatchSnapshot()
  })

  test('IconeBotao DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeBotao />)
    expect(container).toMatchSnapshot()
  })

  test('IconeBotao DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeBotao />)
    expect(container).toMatchSnapshot()
  })

  test('TextoBotao DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoBotao />)
    expect(container).toMatchSnapshot()
  })

  test('TextoTitulo DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoTitulo />)
    expect(container).toMatchSnapshot()
  })
})
