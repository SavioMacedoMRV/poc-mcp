// Mock data for states and cities
export interface Estado {
  id: string;
  nome: string;
  uf: string;
}

export interface Cidade {
  id: string;
  nome: string;
  estadoId: string;
}

const estados: Estado[] = [
  { id: '1', nome: 'São Paulo', uf: 'SP' },
  { id: '2', nome: 'Minas Gerais', uf: 'MG' }
];

const cidades: Cidade[] = [
  // São Paulo cities
  { id: '1', nome: 'São Paulo', estadoId: '1' },
  { id: '2', nome: 'Campinas', estadoId: '1' },
  { id: '3', nome: 'Santos', estadoId: '1' },
  { id: '4', nome: 'Ribeirão Preto', estadoId: '1' },
  { id: '5', nome: 'São José dos Campos', estadoId: '1' },
  
  // Minas Gerais cities
  { id: '6', nome: 'Belo Horizonte', estadoId: '2' },
  { id: '7', nome: 'Uberlândia', estadoId: '2' },
  { id: '8', nome: 'Contagem', estadoId: '2' },
  { id: '9', nome: 'Juiz de Fora', estadoId: '2' },
  { id: '10', nome: 'Betim', estadoId: '2' }
];

// Mock API service for location data
export const locationService = {
  // Get all states
  obterEstados: async (): Promise<Estado[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(estados);
      }, 300);
    });
  },

  // Get cities by state ID
  obterCidadesPorEstado: async (estadoId: string): Promise<Cidade[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const cidadesFiltradas = cidades.filter(cidade => cidade.estadoId === estadoId);
        resolve(cidadesFiltradas);
      }, 300);
    });
  }
};