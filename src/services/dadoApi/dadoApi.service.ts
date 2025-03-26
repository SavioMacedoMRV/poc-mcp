import api from 'infrastructure/api'
import {DataResponse} from 'infrastructure/api/schemas/responses'

export async function obterDadoApi({id}: Readonly<{id: string}>) {
  const {data} = await api.get<
    DataResponse<{
      id: string
      descricao: string
    }>
  >(`template/${id}`)

  return data.data ?? {}
}
