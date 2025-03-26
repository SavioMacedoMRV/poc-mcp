import {render} from '@testing-library/react'
import * as S from './botaoScrollTop.styles'

describe('BotaoScrollTop.styles', () => {
  test('BotaoStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoStyled />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot QUANDO $exibir for verdadeiro', () => {
    const {container} = render(<S.BotaoStyled $exibir />)
    expect(container).toMatchSnapshot()
  })

  test('IconeScrollTop DEVE ser igual ao snapshot', () => {
    const container = render(<S.IconeScrollTop />)
    expect(container).toMatchSnapshot()
  })

  test('TextoScrollTop DEVE ser igual ao snapshot', () => {
    const container = render(<S.TextoScrollTop />)
    expect(container).toMatchSnapshot()
  })
})
