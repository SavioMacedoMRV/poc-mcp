import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import {ComponenteErro} from './componenteErro'

describe('ComponenteErro', () => {
  test('DEVE exibir a mensagem de erro de estado vazio quando estadoVazio for verdadeiro', () => {
    const {getByTestId} = render(<ComponenteErro estadoVazio />)

    const mensagemErroEstadoVazio = getByTestId('mensagem-erro-estado-vazio')

    expect(mensagemErroEstadoVazio).toBeInTheDocument()
    expect(mensagemErroEstadoVazio).toHaveTextContent(
      'Nenhum item foi encontrado',
    )
  })

  test('DEVE exibir a mensagem de erro padrão quando estadoVazio for falso', () => {
    const {getByTestId} = render(<ComponenteErro estadoVazio={false} />)

    const mensagemErroPadrao = getByTestId('mensagem-erro')

    expect(mensagemErroPadrao).toBeInTheDocument()
    expect(mensagemErroPadrao).toHaveTextContent(
      'Houve um erro ao acessar o Portal 360',
    )
  })
})
