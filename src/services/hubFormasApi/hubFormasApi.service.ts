import api from 'infrastructure/api'
import { DataResponse } from 'infrastructure/api/schemas/responses'

/**
 * Service for HubFormas BFF API 
 * URL: https://apiqas.mrv.com.br/v1.0/portal360/hubformas
 */
export const hubFormasApi = {
  /**
   * Obtém a lista de formulários disponíveis
   */
  obterFormularios: async () => {
    const { data } = await api.get<DataResponse<any>>('formularios')
    return data.data ?? []
  },
  
  /**
   * Obtém os detalhes de um formulário pelo ID
   * @param id - ID do formulário
   */
  obterFormulario: async (id: string) => {
    const { data } = await api.get<DataResponse<any>>(`formulario/${id}`)
    return data.data ?? {}
  },

  /**
   * Envia um formulário preenchido
   * @param formularioId - ID do formulário
   * @param dadosFormulario - Dados do formulário preenchido
   */
  enviarFormulario: async (formularioId: string, dadosFormulario: any) => {
    const { data } = await api.post<DataResponse<any>>(`formulario/${formularioId}/enviar`, dadosFormulario)
    return data.data ?? {}
  }
}