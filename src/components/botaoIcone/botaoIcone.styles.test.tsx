import {render} from '@testing-library/react'
import * as S from './botaoIcone.styles'

describe('BotaoIcone.styles', () => {
  test('BotaoStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.BotaoStyled />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot QUANDO $borda for verdadeiro', () => {
    const {container} = render(<S.BotaoStyled $borda />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot QUANDO $borda for verdadeiro e cor', () => {
    const {container} = render(<S.BotaoStyled $borda cor={'red'} />)
    expect(container).toMatchSnapshot()
  })

  test('BotaoStyled DEVE ser igual ao snapshot QUANDO $semMargem for verdadeiro', () => {
    const {container} = render(<S.BotaoStyled $semMargem />)
    expect(container).toMatchSnapshot()
  })
})
