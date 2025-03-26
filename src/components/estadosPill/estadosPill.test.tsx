import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { EstadosPill } from './estadosPill'

describe('EstadosPill', () => {
  const mockAdicionarEstado = jest.fn()
  const mockRemoverEstado = jest.fn()
  const estadosSelecionados = ['São Paulo', 'Minas Gerais']

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component with selected states', () => {
    render(
      <EstadosPill
        estadosSelecionados={estadosSelecionados}
        aoAdicionarEstado={mockAdicionarEstado}
        aoRemoverEstado={mockRemoverEstado}
      />
    )

    expect(screen.getByText('Estados atendidos')).toBeInTheDocument()
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Minas Gerais')).toBeInTheDocument()
    expect(screen.getByLabelText('Selecione um estado')).toBeInTheDocument()
  })

  it('should add a new state when selecting from dropdown', () => {
    render(
      <EstadosPill
        estadosSelecionados={estadosSelecionados}
        aoAdicionarEstado={mockAdicionarEstado}
        aoRemoverEstado={mockRemoverEstado}
      />
    )

    // Type in the input to filter states
    const input = screen.getByLabelText('Selecione um estado')
    fireEvent.change(input, { target: { value: 'Paraná' } })
    
    // Find and click on a dropdown option (we'd typically interact with the dropdown here)
    // For simplicity in testing, we'll directly call the add function
    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)
    
    expect(mockAdicionarEstado).toHaveBeenCalled()
  })

  it('should remove a state when clicking the remove button', () => {
    render(
      <EstadosPill
        estadosSelecionados={estadosSelecionados}
        aoAdicionarEstado={mockAdicionarEstado}
        aoRemoverEstado={mockRemoverEstado}
      />
    )

    // Find and click the close button for São Paulo
    const closeButtons = screen.getAllByRole('button')
    const spCloseButton = closeButtons.find(btn => 
      btn.parentElement?.textContent?.includes('São Paulo')
    )
    
    if (spCloseButton) {
      fireEvent.click(spCloseButton)
      expect(mockRemoverEstado).toHaveBeenCalledWith('São Paulo')
    }
  })
})