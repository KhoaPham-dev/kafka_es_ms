/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  coveragePathIgnorePatterns: ["/node_modules"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
