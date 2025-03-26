import type {Config} from 'jest'
import {compilerOptions} from './tsconfig.json'

function getAliases() {
  const paths: Record<string, string> = {}
  Object.entries(compilerOptions.paths).forEach(([alias, [value]]) => {
    paths[`^${alias.slice(0, -2)}/(.*)`] = `<rootDir>/${value.slice(0, -2)}/$1`
  })

  return paths
}

const config: Config = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  fakeTimers: {
    enableGlobally: true,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^.+.(css|styl|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    ...getAliases(),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '@testing-library/react'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  verbose: true,
}

export default config
