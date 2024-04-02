import {
  Config,
  Group as GroupType,
  Logger as LoggerType,
  LogLevel,
  OptiPrism,
  PropertyName,
  PropertyValue,
  StorageMethod,
  TrackOptions,
  User as UserType,
} from './types'
import { trackService } from './transports'

import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects'
import store from './utils/store'
import { UUID } from './utils/uuid'
import { Logger } from './utils/logger'

import { Group } from './group'
import { User } from './user'

export class OptiprismBrowser {
  user: UserType
  group: GroupType
  logger: LoggerType
  constructor() {
    this.logger = new Logger()
    this.group = new Group()
    this.user = new User()
  }
  async _sendTrackOnClick(item: {
    element: string
    name: string | null
    id: string | null
    class: string | null
    properties?: Map<PropertyName, PropertyValue>
  }) {
    const props = item
    const trackContext = store.getTrackContext()
    const logger = this.logger

    return async function sendTrack() {
      try {
        const res = await trackService.trackClick({
          context: trackContext,
          ...props,
        })
        logger.info('trackClick', res)
      } catch (e) {
        logger.error('trackClick', JSON.stringify(e))
      }
    }
  }
  reset() {
    store.config = {
      projectId: 0,
      token: 'test-token',
      serverUrl: '',
      logLevel: LogLevel.Error,
      cookieExpiration: new Date(),
      cookieSecure: false,
      storage: StorageMethod.LocalStorage,
    }
    store.anonymousId = UUID()
    store.sessionId = UUID()
    store.properties = {}
    store.userId = ''
  }
  configure(config: Config): void {
    if (!store.deviceId) {
      store.deviceId = UUID()
    }
    if (!store.anonymousId) {
      store.anonymousId = UUID()
      store.sessionId = UUID()
    }

    store.config = mergeObjects(store.config, config)
  }
  async page(props?: Map<PropertyName, PropertyValue>) {
    try {
      const res = await trackService.trackPage({
        context: store.getTrackContext(),
        path: 'string',
        referer: 'string',
        search: 'string',
        title: 'string',
        url: 'string',
        properties: props,
      })
      this.logger.info('page', res)
    } catch (e) {
      this.logger.error('page', JSON.stringify(e))
    }
  }
  register(data: Map<PropertyName, PropertyValue>): void {
    store.setProperties(data)
  }
  unregister(data: Map<PropertyName, PropertyValue>): void {
    const properties = store.properties
    // @ts-ignore
    Object.keys(data).forEach(key => delete properties[key])
    store.properties = properties
  }
  async trackOnClick(
    el: HTMLElement,
    eventName: string,
    properties?: Map<PropertyName, PropertyValue>,
    options?: TrackOptions
  ) {
    if (el) {
      const track = await this._sendTrackOnClick({
        element: el.tagName as string,
        name: el.getAttribute('name'),
        id: el.getAttribute('id'),
        class: el.getAttribute('class'),
        properties: properties,
      })
      el.addEventListener('click', track)
    }
  }
  async track(
    eventName: string,
    properties?: Map<PropertyName, PropertyValue>,
    options?: TrackOptions
  ) {
    try {
      const res = await trackService.trackEvent({
        context: store.getTrackContext(),
        eventName: eventName,
        properties: properties,
      })
      this.logger.info('track', res)
    } catch (e) {
      this.logger.error('track', JSON.stringify(e))
    }
  }
}

export const createInstance = (): OptiPrism => {
  const client = new OptiprismBrowser()
  return client
}

export default createInstance()

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-ignore
  globalScope.optiprism = createInstance()
}
