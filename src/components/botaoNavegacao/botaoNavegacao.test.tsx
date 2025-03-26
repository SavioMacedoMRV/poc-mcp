import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BotaoNavegacao } from './botaoNavegacao'
import { ThemeProvider } from 'styled-components'

describe('BotaoNavegacao', () => {
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    render(
      <ThemeProvider theme={{}}>
        <BotaoNavegacao onSelect={mockOnSelect} />
      </ThemeProvider>
    )
  })

  it('should render the main button with Hubs text', () => {
    expect(screen.getByText('Hubs')).toBeInTheDocument()
  })

  it('should show options when clicked', () => {
    const button = screen.getByText('Hubs')
    fireEvent.click(button)

    expect(screen.getByText('Obras')).toBeInTheDocument()
    expect(screen.getByText('Fornecedores')).toBeInTheDocument()
    expect(screen.getByText('Peças')).toBeInTheDocument()
  })

  it('should call onSelect when an option is clicked', () => {
    const button = screen.getByText('Hubs')
    fireEvent.click(button)

    const obrasOption = screen.getByText('Obras')
    fireEvent.click(obrasOption)

    expect(mockOnSelect).toHaveBeenCalledWith('obras')
  })

  it('should close dropdown when clicking outside', () => {
    const button = screen.getByText('Hubs')
    fireEvent.click(button)

    expect(screen.getByText('Obras')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)

    expect(screen.queryByText('Obras')).not.toBeInTheDocument()
  })
})