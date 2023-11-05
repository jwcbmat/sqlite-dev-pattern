import type { Config } from "jest"

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\.(t|j)s$": "ts-jest"
  },
  moduleFileExtensions: [ "js", "ts" ]
};

export default config
