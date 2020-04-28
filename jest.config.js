module.exports = {
  collectCoverageFrom: [
    'src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageReporters: [
    'lcov',
    'text'
  ]
}
