const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // set verbose to true if you dont want to see logs
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  verbose: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ['./examples'],
  testPathIgnorePatterns: ['./node_modules'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/{!(index),}.ts'],
  coverageDirectory: '<rootDir>/coverage-report',
  reporters: ['default', 'jest-junit'],
  coverageThreshold: {
    global: {
      lines: 0,
    },
  },
  silent: false,
};
