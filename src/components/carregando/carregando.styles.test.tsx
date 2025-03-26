import {render} from '@testing-library/react'
import * as S from './carregando.styles'

describe('Carregando.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Container />)
    expect(container).toMatchSnapshot()
  })

  test('Animacao DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Animacao animationData={{json: 'json'}} />)

    expect(container).toMatchSnapshot()
  })
})
