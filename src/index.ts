import { Config, Group as GroupType, Logger as LoggerType, User as UserType } from './types'

import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects'
import { store } from './store'
import { UUID } from './utils/uuid'
import { Logger } from './utils/logger'

import { Group } from './group'
import { User } from './user'
import { trackPageLoad } from './modules/trackPageLoad'
import { trackElementsClick } from './modules/trackElementsClick'
import { TrackContext } from './modules/trackContext'
import { LocalStorage } from './utils/localStorage'
import { apiClient } from './api-client/apiClient'
import { TrackEventRequest } from './api'

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

  async track(event: TrackEventRequest['event'], properties?: TrackEventRequest['properties']) {
    const context = new TrackContext()
    try {
      await apiClient.tracking.trackEvent(store.config.token, {
        anonymousId: store.anonymousId,
        context,
        event,
        properties,
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

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-ignore
  globalScope.optiprism = createInstance()
}
