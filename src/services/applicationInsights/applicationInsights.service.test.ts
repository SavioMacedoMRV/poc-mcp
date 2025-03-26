import {
  ApplicationInsights,
  ITelemetryItem,
} from '@microsoft/applicationinsights-web'

jest.mock('@microsoft/applicationinsights-web', () => {
  return {
    ApplicationInsights: jest.fn().mockImplementation(() => ({
      loadAppInsights: jest.fn(),
      addTelemetryInitializer: jest.fn(),
    })),
  }
})

describe('Application Insights', () => {
  let appInsights: ApplicationInsights
  let mockAddTelemetryInitializer: jest.Mock<any, any, any>
  let telemetryInitializer: (arg0: ITelemetryItem) => void

  beforeAll(() => {
    ;({appInsights} = require('./applicationInsights.service'))
    mockAddTelemetryInitializer =
      appInsights.addTelemetryInitializer as jest.Mock

    telemetryInitializer = mockAddTelemetryInitializer.mock.calls[0][0]
  })

  test('DEVE chamar addTelemetryInitializer corretamente e adicionar a tag do Template', () => {
    const telemetryItem: ITelemetryItem = {name: 'template'}
    telemetryInitializer(telemetryItem)

    const tagsEsperadas = {'ai.cloud.role': 'Portal360-Template'}
    expect(telemetryItem.tags).toEqual(tagsEsperadas)
  })

  test('DEVE chamar addTelemetryInitializer corretamente com as tags do Template', () => {
    const telemetryItem: ITelemetryItem = {
      name: 'template',
      tags: {'ai-role': 'other-role'},
    }
    telemetryInitializer(telemetryItem)

    const tagsEsperadas = {
      'ai-role': 'other-role',
      'ai.cloud.role': 'Portal360-Template',
    }
    expect(telemetryItem.tags).toEqual(tagsEsperadas)
  })
})
