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

export interface CreateHubRequest {
  nome: string
  descricao?: string
  capacidade: number
  cep: string
  estado: string
  cidade: string
  endereco: string
  numero: string
  complemento?: string
  estadosAtendidos: string[]
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
  
  criarHub: (data: CreateHubRequest) => {
    const novoHub: Hub = {
      id: (mockHubs.length + 1).toString(),
      nome: data.nome,
      estado: data.estado,
      cidade: data.cidade,
      area: data.capacidade,
      capacidadeTotal: data.capacidade,
      ocupacaoAtual: 0,
      status: 'ativo',
      endereco: `${data.endereco}, ${data.numero}${data.complemento ? ` - ${data.complemento}` : ''} - ${data.cidade}, ${data.estado} - CEP: ${data.cep}`,
      responsavel: 'Usuário Atual' // In a real implementation, this would come from the authenticated user
    }
    mockHubs.push(novoHub)
    return Promise.resolve(novoHub)
  }

  // Future API integration:
  // listarHubs: () => api.get<Hub[]>('/hubs'),
  // criarHub: (data: CreateHubRequest) => api.post<Hub>('/hubs', data),
}