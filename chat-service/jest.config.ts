const coverageDirectories = ['api', 'dataAccess'];

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom: [
    `src/{${coverageDirectories.join(',')}}/**/*.{js,jsx,ts,tsx}`,
  ],
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/?(*.)+(e2e-spec|test|spec).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
