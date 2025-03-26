import {EmpreendimentoBuilder} from './empreendimentoBuilder'

describe('EmpreendimentoBuilder', () => {
  test('DEVE construir uma Empreendimento válida', () => {
    const empreendimento = new EmpreendimentoBuilder().criar()

    expect(empreendimento).toMatchObject({
      id: expect.any(String),
      nome: expect.any(String),
    })
  })

  test('DEVE construir uma Empreendimento válida com as propriedades especificadas', () => {
    const id = 'id123'
    const nome = 'empreendimento abc'

    const empreendimento = new EmpreendimentoBuilder()
      .comId(id)
      .comNome(nome)

      .criar()

    expect(empreendimento).toMatchObject({
      id,
      nome,
    })
  })

  test('DEVE construir um array de Empreendimentos válido com apenas um empreendimento', () => {
    const empreendimentos = new EmpreendimentoBuilder().criarLista()

    expect(empreendimentos).toHaveLength(1)
  })

  test('DEVE construir um array de Empreendimentos válido com 3 empreendimentos', () => {
    const numEmpreendimentos = 3
    const empreendimentos = new EmpreendimentoBuilder().criarLista(
      numEmpreendimentos,
    )

    expect(empreendimentos).toHaveLength(numEmpreendimentos)
  })
})
