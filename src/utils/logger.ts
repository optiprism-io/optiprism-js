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

const PREFIX = 'Optiprism Logger'

export class OptiLogger implements Logger {
  logLevel: LogLevel

  constructor() {
    this.logLevel = LogLevel.Error
  }

  disable(): void {
    this.logLevel = LogLevel.None
  }

  enable(logLevel: LogLevel = LogLevel.Warn): void {
    this.logLevel = logLevel
  }

  log(...args: any[]): void {
    if (this.logLevel < LogLevel.Verbose) {
      return
    }
    console.log(`${PREFIX}[Log]: ${args.join(' ')}`)
  }

  warn(...args: any[]): void {
    if (this.logLevel < LogLevel.Warn) {
      return
    }
    console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`)
  }

  error(...args: any[]): void {
    if (this.logLevel < LogLevel.Error) {
      return
    }
    console.error(`${PREFIX}[Error]: ${args.join(' ')}`)
  }

  info(...args: any[]): void {
    if (this.logLevel < LogLevel.Info) {
      return
    }
    console.log(`${PREFIX}[Info]: ${args.join(' ')}`)
  }

  debug(...args: any[]): void {
    if (this.logLevel < LogLevel.Debug) {
      return
    }
    // console.debug output is hidden by default in chrome
    console.log(`${PREFIX}[Debug]: ${args.join(' ')}`)
  }
}
