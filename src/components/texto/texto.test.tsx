import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {Texto} from './texto'

describe('Texto', () => {
  test('DEVE renderizar corretamente com as props padrão', () => {
    render(<Texto>Teste</Texto>)

    expect(screen.getByText('Teste')).toBeInTheDocument()

    expect(screen.getByText('Teste')).toHaveStyle(`
      font-size: 12px;
      line-height: normal;
      font-family: AvertaStd-Regular;
      color: #242625;
      font-weight: 400;
      text-align: start;
      cursor: text;
    `)
  })

  test('DEVE renderizar corretamente com props personalizadas', () => {
    render(
      <Texto
        tamanho={16}
        alturalinha={24}
        estilo="bold"
        cor="#ff0000"
        alinhamento="left"
        cursor="pointer"
      >
        Teste Personalizado
      </Texto>,
    )

    expect(screen.getByText('Teste Personalizado')).toBeInTheDocument()

    expect(screen.getByText('Teste Personalizado')).toHaveStyle(`
      font-size: 16px;
      line-height: 24px;
      font-family: AvertaStd-Black;
      color: #ff0000;
      font-weight: 400;
      text-align: left;
      cursor: pointer;
    `)
  })

  test('DEVE renderizar corretamente o texto filho', () => {
    render(<Texto>Texto Filho</Texto>)
    expect(screen.getByText('Texto Filho')).toBeInTheDocument()
  })

  test('DEVE renderizar corretamente a cor do texto', () => {
    render(<Texto cor="#ff0000">Texto Cor</Texto>)
    expect(screen.getByText('Texto Cor')).toHaveStyle('color: #ff0000')
  })

  test('DEVE renderizar corretamente o estilo do texto Bold', () => {
    render(<Texto estilo="bold">Texto Negrito</Texto>)
    expect(screen.getByText('Texto Negrito')).toHaveStyle(
      'font-family: AvertaStd-Black',
    )
  })

  test('DEVE renderizar corretamente o estilo do texto Semibold', () => {
    render(<Texto estilo="semibold">Texto Semibold</Texto>)
    expect(screen.getByText('Texto Semibold')).toHaveStyle(
      'font-family: AvertaStd-Semibold',
    )
  })

  test('DEVE renderizar corretamente o tamanho do texto', () => {
    render(<Texto tamanho={20}>Texto Grande</Texto>)
    expect(screen.getByText('Texto Grande')).toHaveStyle('font-size: 20px')
  })

  test('DEVE renderizar corretamente a altura do texto', () => {
    render(<Texto alturalinha={28}>Texto Alto</Texto>)
    expect(screen.getByText('Texto Alto')).toHaveStyle('line-height: 28px')
  })

  test('DEVE renderizar corretamente o peso do texto', () => {
    render(<Texto peso={600}>Texto Alto</Texto>)
    expect(screen.getByText('Texto Alto')).toHaveStyle('font-weight: 600')
  })

  test('DEVE renderizar corretamente o alinhamento do texto', () => {
    render(<Texto alinhamento="right">Texto Alinhado à Direita</Texto>)
    expect(screen.getByText('Texto Alinhado à Direita')).toHaveStyle(
      'text-align: right',
    )
  })

  test('DEVE renderizar corretamente o cursor do texto', () => {
    render(<Texto cursor="pointer">Texto Clicável</Texto>)
    expect(screen.getByText('Texto Clicável')).toHaveStyle('cursor: pointer')
  })

  test('DEVE renderizar corretamente a transformação do texto', () => {
    render(
      <Texto data-testid="texto" transformar={'uppercase'}>
        Texto
      </Texto>,
    )
    expect(screen.getByTestId('texto')).toHaveStyle('text-transform: uppercase')
  })
})
