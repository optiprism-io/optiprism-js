import mergeObjects from '../utils/mergeObjects'
import { LogLevel, PropertyName, PropertyValue, StorageMethod } from '../types'

export const store = {
  config: {
    projectId: 0,
    token: 'test-token',
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
  setProperties(properties: Map<PropertyName, PropertyValue>) {
    this.properties = mergeObjects(this.properties, properties)
  },
  getProperties() {
    return this.properties
  },
  getPropertiesLength() {
    return Object.keys(this.properties).length
  },
}
