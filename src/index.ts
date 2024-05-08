import {
  Config,
  Group as GroupType,
  Logger as LoggerType,
  TrackOptions,
  User as UserType,
} from './types'

import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects'
import { store } from './store'
import { UUID } from './utils/uuid'
import { Logger } from './utils/logger'

import { Group } from './group'
import { User } from './user'
import { trackPageLoad } from './modules/trackPageLoad'
import { trackElementsClick } from './modules/trackElementsClick'
import { EventName, IEventType } from './types/event'
import { getTrackContext } from './modules/getTrackContext'
import { LocalStorage } from './utils/localStorage'
import { apiClient } from './api/apiClient'

const ANONYMOUS_ID_KEY = 'opti_anonymous_id'

export class OptiprismBrowser {
  user: UserType
  group: GroupType
  logger: LoggerType

  constructor() {
    this.logger = new Logger()
    this.group = new Group()
    this.user = new User()
  }

  configure(config: Config): void {
    if (!config.token) this.logger.error('token is required')

    this.__initAnonymousId()

    if (!store.deviceId) {
      store.deviceId = UUID()
    }

    store.config = mergeObjects(store.config, config)

    if (config.autotrack === false) return
    this.enableAutoTrack()
  }

  async track(
    eventName: EventName,
    eventType: IEventType,
    properties?: any,
    options?: TrackOptions
  ) {
    const context = getTrackContext()
    try {
      await apiClient.auth.trackEvent({
        trackEventRequest: {
          anonymousId: store.anonymousId,
          context,
          event: eventName,
          type: eventType,
          properties,
        },
        projectToken: store.config.token,
      })
    } catch (e) {
      this.logger.error('track', JSON.stringify(e))
    }
  }

  enableAutoTrack() {
    trackPageLoad(this)
    trackElementsClick(this)
  }

  __initAnonymousId() {
    const anonymousId = LocalStorage.getOrSet(ANONYMOUS_ID_KEY, UUID())
    store.anonymousId = anonymousId
  }
}

export const createInstance = () => new OptiprismBrowser()
export default createInstance()

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-ignore
  globalScope.optiprism = createInstance()
}
