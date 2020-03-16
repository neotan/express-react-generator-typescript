module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./util/jest.setupFile.js'],
  moduleNameMapper: {
    '^~daos(.*)$': '<rootDir>/src/daos$1',
    '^~entities(.*)$': '<rootDir>/src/entities$1',
    '^~shared(.*)$': '<rootDir>/src/shared$1',
    '^~server(.*)$': '<rootDir>/src/server$1',
  },
}
