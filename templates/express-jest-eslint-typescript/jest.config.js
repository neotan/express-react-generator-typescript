module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setupFile.ts'],
  moduleNameMapper: {
    '^@daos(.*)$': '<rootDir>/src/daos$1',
    '^@entities(.*)$': '<rootDir>/src/entities$1',
    '^@shared(.*)$': '<rootDir>/src/shared$1',
    '^@server(.*)$': '<rootDir>/src/server$1',
  },
}
