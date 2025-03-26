import 'jest-styled-components'
import '@testing-library/jest-dom'
import React from 'react'
import jestFetchMock from 'jest-fetch-mock'

global.React = React
process.env.API_BASE_URL = 'http://fake'
process.env.API_PATH = 'v1/template'
process.env.AUTH_ACCESS_TOKEN = 'jest_access_token'
process.env.AUTH_ID_TOKEN = 'jest_id_token'
process.env.OBRA_ID = 'jest_id_empreendimento'
process.env.OBRA_NOME = 'jest_obra_nome'

jestFetchMock.enableMocks()

jest.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    addTelemetryInitializer: jest.fn(),
    loadAppInsights: jest.fn(),
  })),
}))
