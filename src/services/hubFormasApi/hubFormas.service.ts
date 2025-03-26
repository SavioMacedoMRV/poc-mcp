import api from 'infrastructure/api'

export interface Hub {
  id: string
  nome: string
  estado: string
  cidade: string
  area: number
  capacidadeTotal: number
  ocupacaoAtual: number
}

// Mock data - will be replaced with actual API calls later
const mockHubs: Hub[] = [
  {
    id: '1',
    nome: 'AM - Manaus',
    estado: 'AM',
    cidade: 'Manaus',
    area: 3000,
    capacidadeTotal: 400,
    ocupacaoAtual: 0
  },
  {
    id: '2',
    nome: 'BA - Camaçari',
    estado: 'BA',
    cidade: 'Camaçari',
    area: 3000,
    capacidadeTotal: 400,
    ocupacaoAtual: 0
  },
  {
    id: '3',
    nome: 'SP - Sumaré',
    estado: 'SP',
    cidade: 'Sumaré',
    area: 3000,
    capacidadeTotal: 400,
    ocupacaoAtual: 0
  }
]

export const hubFormasService = {
  listarHubs: () => Promise.resolve(mockHubs),
  // Future API integration:
  // listarHubs: () => api.get<Hub[]>('/hubs'),
}