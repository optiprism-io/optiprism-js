import { LogLevel, StorageMethod } from '../types'

export const store = {
  config: {
    token: '',
    serverUrl: 'http://localhost:8080/api/v1',
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
