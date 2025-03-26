import api from 'infrastructure/api'
import {DataResponse} from 'infrastructure/api/schemas/responses'
import {obterDadoApi} from './dadoApi.service'

const id = 'id'

const response: DataResponse<{
  id: string
  descricao: string
}> = {
  data: {id: 'abc-1234', descricao: 'descrição abc'},
}

const apiMock = api as jest.Mocked<typeof api>
jest.mock('infrastructure/api', () => ({
  get: jest.fn().mockImplementation(() => ({
    data: response,
  })),
}))

describe('DadoAPi.service', () => {
  describe('obterDadoApi', () => {
    test('DEVE listar todas os dashbord retornadas pela API', async () => {
      const servico = await obterDadoApi({id})

      expect(servico).toEqual(response.data)
    })

    test('DEVE retornar uma lista vazia QUANDO a API não retornar dados', async () => {
      apiMock.get.mockResolvedValueOnce({data: ''})

      const servico = await obterDadoApi({id})

      expect(servico).toEqual({})
    })

    test('DEVE executar uma chamada "get" ao endpoint "template"', async () => {
      await obterDadoApi({id})

      expect(api.get).toHaveBeenCalledWith(`template/${id}`)
    })
  })
})
