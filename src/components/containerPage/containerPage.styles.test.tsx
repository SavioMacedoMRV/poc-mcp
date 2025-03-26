import {render} from '@testing-library/react'
import * as S from './containerPage.styles'

describe('ContainerPage.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Container />)
    expect(container).toMatchSnapshot()
  })

  test('Container DEVE ser igual ao snapshot QUANDO for passado uma cor de fundo', () => {
    const {container} = render(<S.Container $corFundo="#ff0000" />)
    expect(container).toMatchSnapshot()
  })

  test('Content DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Content />)
    expect(container).toMatchSnapshot()
  })
})
