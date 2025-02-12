export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^musicLibrary/MusicLibrary$": "<rootDir>/src/mocks/MusicLibraryMock.tsx",
    "^.*[.](css|CSS)$": "<rootDir>/src/mocks/styleMock.ts"
  },
};
