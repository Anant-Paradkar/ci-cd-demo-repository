export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jestSetup.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest' 
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '^.+\\.(css|less)$': '<rootDir>/CSSStub.js'
  },
}
