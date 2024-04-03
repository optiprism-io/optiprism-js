interface Element {
  tag: string
  attrs: string[]
}

interface Autotrack {
  pageViews: boolean
  selectors?: string[]
  elements?: Element[]
}

export enum StorageMethod {
  Cookie = 'Cookie',
  LocalStorage = 'LocalStorage',
}

export enum LogLevel {
  Error = 'Error',
  Info = 'Info',
  Debug = 'Debug',
}

export interface Config {
  projectId: number
  token: string
  serverUrl?: string
  autotrack?: Autotrack | boolean
  logLevel?: LogLevel
  cookieExpiration?: Date
  cookieSecure?: boolean
  storage?: StorageMethod
  attribution?: string[]
}
