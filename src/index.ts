import { ConsolaInstance, createConsola } from 'consola'
import { getGlobalScope } from './utils/globalScope'
import mergeObjects from './utils/mergeObjects'
import { UUID } from './utils/uuid'
import { trackPageLoad } from './modules/trackPageLoad'
import { trackElementsClick } from './modules/trackElementsClick'
import { TrackContext } from './modules/trackContext'
import { LocalStorage } from './modules/localStorage'
import { ApiClient } from './api-client/apiClient'
import { TrackEventRequest } from './api'
import { Config, OptiConfig } from './modules/config'
import { Env } from '../env'

const ANONYMOUS_ID_KEY = 'opti_anonymous_id'

export class OptiprismBrowser {
  logger: ConsolaInstance
  apiClient: ApiClient
  config: Config

  constructor() {
    this.logger = createConsola({
      level: Env.logLevel,
    })
    this.apiClient = new ApiClient(this.logger)
    this.config = new OptiConfig()
  }

  configure(config: Config): void {
    this.config = mergeObjects(this.config, config)
    this.logger.info('this.logger.level', this.logger.level)

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
      await this.apiClient.tracking.trackEvent(this.config.token, {
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
