export interface Logger {
  disable(): void
  enable(logLevel: LogLevel): void
  log(...args: any[]): void
  warn(...args: any[]): void
  info(...args: any[]): void
  error(...args: any[]): void
  debug(...args: any[]): void
}

export enum LogLevel {
  None = 0,
  Verbose = 1,
  Warn = 2,
  Error = 3,
  Info = 4,
  Debug = 5,
}

export interface LogConfig {
  logger: Logger
  logLevel: LogLevel
}

type TimeKey = 'start' | 'end'

export interface DebugContext {
  type: string
  name: string
  args: string[] | string
  stacktrace?: string[] | string
  time?: { [key in TimeKey]?: string }
  states?: { [key: string]: any }
}
