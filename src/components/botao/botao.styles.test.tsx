import {render} from '@testing-library/react'
import * as S from './botao.styles'

describe('Botao.styles', () => {
  test('BotaoStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoStyled />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot com o espaco passado', () => {
    const {container} = render(<S.BotaoStyled espaco={16} />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot com o largura passado', () => {
    const {container} = render(<S.BotaoStyled largura={16} />)
    expect(container).toMatchSnapshot()
  })
  test('BotaoStyled DEVE ser igual ao snapshot com o altura passado', () => {
    const {container} = render(<S.BotaoStyled altura={16} />)
    expect(container).toMatchSnapshot()
  })
  test('BotaoStyled DEVE ser igual ao snapshot com o disabled como true', () => {
    const {container} = render(<S.BotaoStyled disabled={true} />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot com o disabled como true e a $corDesabilitado com a cor passada', () => {
    const {container} = render(
      <S.BotaoStyled disabled={true} $corDesabilitado="#00ff00}" />,
    )
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot com o cor passada', () => {
    const {container} = render(<S.BotaoStyled cor="#ff0000" />)
    expect(container).toMatchSnapshot()
  })

  test('TextoBotao DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoBotao />)
    expect(container).toMatchSnapshot()
  })
})
