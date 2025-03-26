import api from 'infrastructure/api'

export interface Hub {
  id: string
  nome: string
  estado: string
  cidade: string
  area: number
  capacidadeTotal: number
  ocupacaoAtual: number
  status: 'ativo' | 'inativo'
  endereco: string
  responsavel: string
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
    ocupacaoAtual: 285,
    status: 'ativo',
    endereco: 'Av. Torquato Tapajós, 7200 - Colônia Terra Nova',
    responsavel: 'João Silva'
  },
  {
    id: '2',
    nome: 'BA - Camaçari',
    estado: 'BA',
    cidade: 'Camaçari',
    area: 2500,
    capacidadeTotal: 350,
    ocupacaoAtual: 180,
    status: 'ativo',
    endereco: 'Via Axial, 890 - Polo Industrial',
    responsavel: 'Maria Santos'
  },
  {
    id: '3',
    nome: 'SP - Sumaré',
    estado: 'SP',
    cidade: 'Sumaré',
    area: 4000,
    capacidadeTotal: 600,
    ocupacaoAtual: 450,
    status: 'ativo',
    endereco: 'Rua da Indústria, 1500 - Distrito Industrial',
    responsavel: 'Carlos Oliveira'
  },
  {
    id: '4',
    nome: 'MG - Contagem',
    estado: 'MG',
    cidade: 'Contagem',
    area: 3500,
    capacidadeTotal: 500,
    ocupacaoAtual: 0,
    status: 'inativo',
    endereco: 'Av. General David Sarnoff, 2737 - Cidade Industrial',
    responsavel: 'Ana Pereira'
  }
]

export const hubFormasService = {
  listarHubs: () => Promise.resolve(mockHubs),
  // Future API integration:
  // listarHubs: () => api.get<Hub[]>('/hubs'),
}