import {render} from '@testing-library/react'
import * as S from './homePage.styles'

describe('HomePage.styles', () => {
  test('BotaoNavegar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoNavegar aoClicar={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })

  test('Container DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Container />)
    expect(container).toMatchSnapshot()
  })

  test('Contente DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Content />)
    expect(container).toMatchSnapshot()
  })

  test('Logo DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Logo />)
    expect(container).toMatchSnapshot()
  })

  test('StyledSvgDEVE ser igual ao snapshot', () => {
    const {container} = render(<S.StyledSvg />)
    expect(container).toMatchSnapshot()
  })
})
