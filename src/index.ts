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
import { EventName } from './types/event'
import { getTrackContext } from './modules/getTrackContext'
import { trackService } from './transports'

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
    if (!store.deviceId) {
      store.deviceId = UUID()
    }
    if (!store.anonymousId) {
      store.anonymousId = UUID()
      store.sessionId = UUID()
    }

    store.config = mergeObjects(store.config, config)

    if (config.autotrack === false) return
    this.enableAutoTrack()
  }

  async track(eventName: EventName, properties?: any, options?: TrackOptions) {
    const context = getTrackContext()
    try {
      const res = await trackService.trackEvent({
        context,
        eventName: eventName,
        properties: properties,
      })
      this.logger.info('track', res)
    } catch (e) {
      this.logger.error('track', JSON.stringify(e))
    }
  }

  enableAutoTrack() {
    trackPageLoad(this)
    trackElementsClick(this)
  }
}

export const createInstance = () => new OptiprismBrowser()
export default createInstance()

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-ignore
  globalScope.optiprism = createInstance()
}
