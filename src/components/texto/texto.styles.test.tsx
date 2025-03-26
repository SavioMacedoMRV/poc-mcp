import {render} from '@testing-library/react'
import {TextoStyled} from './texto.styles'

describe('Texto.styles', () => {
  test('TextoStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<TextoStyled />)
    expect(container).toMatchSnapshot()
  })
})
