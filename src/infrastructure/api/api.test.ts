import api from 'infrastructure/api'

describe('Api', () => {
  test('DEVE retornar a "url base"', () => {
    expect(api.defaults).toHaveProperty(
      'baseURL',
      `${process.env.API_BASE_URL}/${process.env.API_PATH}/`,
    )
  })
})
