import {render} from '@testing-library/react'
import * as S from './componenteErro.styles'

describe('ComponenteErro.styles', () => {
  test('Container DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Container />)
    expect(container).toMatchSnapshot()
  })

  test('IconeAlerta DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeAlerta />)
    expect(container).toMatchSnapshot()
  })

  test('IconeLupa DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeLupa />)
    expect(container).toMatchSnapshot()
  })

  test('Mensagem DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Mensagem />)
    expect(container).toMatchSnapshot()
  })
})
