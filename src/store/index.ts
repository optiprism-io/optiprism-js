import { LogLevel, StorageMethod } from '../types'

export const store = {
  config: {
    token: '',
    serverUrl: '',
    logLevel: LogLevel.Error,
    cookieExpiration: new Date(),
    cookieSecure: false,
    storage: StorageMethod.LocalStorage,
  },
  properties: {},
  deviceId: '',
  groupKey: '',
  groups: null,
  sessionId: '',
  anonymousId: '',
  userId: '',
  optedOut: false,
}
