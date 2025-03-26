import {render} from '@testing-library/react'
import * as S from './cabecalho.styles'

describe('Cabecalho.styles', () => {
  test('BotaoSair DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoSair aoClicar={jest.fn} />)

    expect(container).toMatchSnapshot()
  })

  test('BotaoVoltar DEVE ser igual ao snapshot', () => {
    const {container} = render(
      <S.BotaoVoltar icone={S.IconeVoltar} aoClicar={jest.fn} />,
    )

    expect(container).toMatchSnapshot()
  })

  test('Container DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.Container />)
    expect(container).toMatchSnapshot()
  })

  test('HeaderCenter DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.HeaderCenter />)
    expect(container).toMatchSnapshot()
  })

  test('HeaderLeft DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.HeaderLeft />)
    expect(container).toMatchSnapshot()
  })

  test('HeaderRight DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.HeaderRight />)
    expect(container).toMatchSnapshot()
  })

  test('IconeFiltro DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeFiltro />)
    expect(container).toMatchSnapshot()
  })

  test('IconeLocal DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeLocal />)
    expect(container).toMatchSnapshot()
  })

  test('IconeVoltar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.IconeVoltar />)
    expect(container).toMatchSnapshot()
  })

  test('InputPesquisar DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.InputPesquisar />)
    expect(container).toMatchSnapshot()
  })

  test('TextoObra DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoObra />)
    expect(container).toMatchSnapshot()
  })

  test('TextoProjeto DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextoProjeto />)
    expect(container).toMatchSnapshot()
  })
})
