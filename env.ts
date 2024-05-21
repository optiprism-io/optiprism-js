import { LogLevel } from './src/utils/logLevel'

export const Env = {
  basePath: 'http://localhost:8080/api',
  logLevel: LogLevel.Debug,
} as const
