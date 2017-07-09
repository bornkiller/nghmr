module.exports = {
  roots: [
    '<rootDir>/packages/core'
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  // Coverage report
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html'],
  // Test configuration
  testMatch: ['**/__tests__/**/*.spec.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
};
