import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects'
import { UUID } from './utils/uuid'
import { Logger, OptiLogger } from './utils/logger'
import { trackPageLoad } from './modules/trackPageLoad'
import { trackElementsClick } from './modules/trackElementsClick'
import { TrackContext } from './modules/trackContext'
import { LocalStorage } from './utils/localStorage'
import { apiClient } from './api-client/apiClient'
import { TrackEventRequest } from './api'
import { Config, OptiConfig } from './utils/config'

const ANONYMOUS_ID_KEY = 'opti_anonymous_id'

export class OptiprismBrowser {
  logger: Logger
  config: Config

  constructor() {
    this.logger = new OptiLogger()
    this.config = new OptiConfig()
  }

  configure(config: Config): void {
    this.config = mergeObjects(this.config, config)

    if (!this.config.token) {
      this.logger.error('token is required')
      return
    }

    this.initAnonymousId()

    if (this.config.autotrack === false) return
    this.enableAutoTrack()
  }

  async track(event: TrackEventRequest['event'], properties?: TrackEventRequest['properties']) {
    const context = new TrackContext()
    try {
      await apiClient.tracking.trackEvent(this.config.token, {
        anonymousId: this.config.anonymousId,
        context,
        event,
        properties,
      })
    } catch (e) {
      this.logger.error('track', JSON.stringify(e))
    }
  }

  private enableAutoTrack() {
    trackPageLoad(this)
    trackElementsClick(this)
  }

  private initAnonymousId() {
    this.config.anonymousId = LocalStorage.getOrSet(ANONYMOUS_ID_KEY, UUID())
  }
}

export const createInstance = () => new OptiprismBrowser()

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-ignore
  globalScope.optiprism = createInstance()
}
