import {appInsights} from 'services/applicationInsights'
import {RegistrarErro, RegistrarComportamento, RegistrarEvento} from './logs'
import {Evento} from 'src/types/enums'

jest.mock('services/applicationInsights', () => ({
  appInsights: {
    trackException: jest.fn(),
    trackTrace: jest.fn(),
    trackEvent: jest.fn(),
  },
}))

const mockAppInsights = appInsights as jest.Mocked<typeof appInsights>

const mockPropriedades = {customProperty: 'mockValue'}

describe('RegistrarErro', () => {
  test('DEVE chamar trackException corretamente', () => {
    const erro = new Error('Teste de erro')
    RegistrarErro({erro, propriedades: mockPropriedades})
    expect(mockAppInsights.trackException).toHaveBeenCalledWith(
      {exception: erro, severityLevel: 3},
      mockPropriedades,
    )
  })
})

describe('RegistrarComportamento', () => {
  test('DEVE chamar trackTrace corretamente', () => {
    const mensagem = 'Teste de comportamento'
    RegistrarComportamento({mensagem, propriedades: mockPropriedades})
    expect(mockAppInsights.trackTrace).toHaveBeenCalledWith(
      {message: mensagem, severityLevel: 1},
      mockPropriedades,
    )
  })
})

describe('RegistrarEvento', () => {
  test('DEVE chamar trackEvent corretamente', () => {
    const evento = 'Teste de evento' as Evento
    RegistrarEvento({evento, propriedades: mockPropriedades})
    expect(mockAppInsights.trackEvent).toHaveBeenCalledWith(
      {name: evento},
      mockPropriedades,
    )
  })
})
