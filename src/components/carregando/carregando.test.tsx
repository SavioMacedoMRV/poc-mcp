import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import {Carregando} from './carregando'

describe('Carregando', () => {
  test('DEVE renderizar o componente de carregamento corretamente', () => {
    const {getByTestId} = render(<Carregando />)

    const componenteCarregando = getByTestId('carregando')

    expect(componenteCarregando).toBeInTheDocument()
  })
})
