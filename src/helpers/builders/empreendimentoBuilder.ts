import {fakerPT_BR as faker} from '@faker-js/faker'
import {Empreendimento} from 'types/interfaces'

export class EmpreendimentoBuilder {
  private id: string
  private nome: string

  constructor() {
    this.id = faker.string.uuid()
    this.nome = 'Residencial ' + faker.word.words({count: {min: 1, max: 3}})
  }

  comNome(nome: string) {
    this.nome = nome
    return this
  }

  comId(id: string) {
    this.id = id
    return this
  }

  criar(): Empreendimento {
    return {
      id: this.id,
      nome: this.nome,
    }
  }

  criarLista(numObras = 1): Empreendimento[] {
    return Array.from({length: numObras}, () =>
      new EmpreendimentoBuilder().criar(),
    )
  }
}
