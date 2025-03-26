import '@testing-library/jest-dom'
import {RenderResult, render} from '@testing-library/react'
import {Icone} from './icone'

describe('Icone', () => {
  let component: RenderResult
  const IconeMock = (p: any) => <svg {...p} />

  beforeEach(() => {
    component = render(<Icone data-testid={'icone'} icone={IconeMock} />)
  })

  test('DEVE renderizar o ícone corretamente', () => {
    expect(component.getByTestId('icone')).toBeInTheDocument()
  })

  test('DEVE aplicar a cor ao icone', () => {
    const cor = 'blue'
    component.rerender(
      <Icone data-testid={'icone'} icone={IconeMock} cor={cor} />,
    )

    expect(component.getByTestId('icone').getAttribute('fill')).toBe(`${cor}`)
  })

  test('DEVE aplicar a altura e largura corretas ao icone', () => {
    const altura = 50
    const largura = 100
    component.rerender(
      <Icone
        data-testid={'icone'}
        icone={IconeMock}
        altura={altura}
        largura={largura}
      />,
    )

    expect(component.getByTestId('icone').getAttribute('height')).toBe(
      `${altura}`,
    )
    expect(component.getByTestId('icone').getAttribute('width')).toBe(
      `${largura}`,
    )
  })

  test('DEVE renderizar o icone com o estilo fixando as dimensões', () => {
    component.rerender(
      <Icone data-testid={'icone'} icone={IconeMock} cor="red" />,
    )
    expect(component.getByTestId('icone')).toHaveStyle(
      `min-width: 32px; min-height: 32px; max-width: 32px; max-height: 32px`,
    )
  })

  test('DEVE renderizar o icone com a inclinação indicada', () => {
    component.rerender(
      <Icone data-testid={'icone'} icone={IconeMock} inclinacao={25} />,
    )
    expect(component.getByTestId('icone')).toHaveStyle(
      `transform: rotate(25deg)`,
    )
  })
})
