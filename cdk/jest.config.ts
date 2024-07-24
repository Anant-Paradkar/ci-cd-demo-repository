import type {Config} from 'jest'

const config: Config = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest'
}

export default config
