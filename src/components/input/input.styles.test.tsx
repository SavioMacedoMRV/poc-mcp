import {render} from '@testing-library/react'
import * as S from './input.styles'

describe('Input.styles', () => {
  test('InputContainer DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.InputContainer />)
    expect(container).toMatchSnapshot()
  })

  test('InputContainer DEVE ser igual ao snapshot QUANDO $tipoTextArea for true', () => {
    const {container} = render(<S.InputContainer $tipoTextArea={true} />)
    expect(container).toMatchSnapshot()
  })

  test('InputContainer DEVE ser igual ao snapshot QUANDO altura for 16', () => {
    const {container} = render(<S.InputContainer altura={16} />)
    expect(container).toMatchSnapshot()
  })

  test('InputContainer DEVE ser igual ao snapshot QUANDO $semBorda for true', () => {
    const {container} = render(<S.InputContainer $semBorda={true} />)
    expect(container).toMatchSnapshot()
  })

  test('InputContainer DEVE ser igual ao snapshot QUANDO $desabilitado for true', () => {
    const {container} = render(<S.InputContainer $desabilitado={true} />)
    expect(container).toMatchSnapshot()
  })

  test('InputContainer DEVE ser igual ao snapshot QUANDO for passado uma cor na $corBordaFocada', () => {
    const {container} = render(<S.InputContainer $corBordaFocada="#00ff00" />)
    expect(container).toMatchSnapshot()
  })

  test('InputStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.InputStyled />)
    expect(container).toMatchSnapshot()
  })

  test('TextAreaStyled DEVE ser igual ao snapshot', () => {
    const {container} = render(<S.TextAreaStyled />)
    expect(container).toMatchSnapshot()
  })

  test('TextAreaStyled DEVE ser igual ao snapshot QUANDO passar o estilo, alinhamento, cursor, transformar, $numeroMaxLinhas e $corTextoDesativado', () => {
    const {container} = render(
      <S.TextAreaStyled
        estilo="bold"
        alinhamento="justify"
        cursor="default"
        transformar="capitalize"
        $numeroMaxLinhas={3}
        $corTextoDesativado="#ff0000"
      />,
    )
    expect(container).toMatchSnapshot()
  })

  test('InputIconePesquisa DEVE ser igual ao snapshot', () => {
    const {container} = render(
      <S.InputIconePesquisa aoClicar={jest.fn()} icone={() => <svg />} />,
    )

    expect(container).toMatchSnapshot()
  })
})
