import { ConsolaInstance, createConsola as createLogger } from 'consola'
import { getGlobalScope } from './utils/globalScope'
import { UUID } from './utils/uuid'
import { trackPageLoad } from './modules/trackPageLoad'
import { trackElementsClick } from './modules/trackElementsClick'
import { Context } from './modules/context'
import { LocalStorage } from './modules/localStorage'
import { ApiClient } from './api-client/apiClient'
import { TrackEventRequest } from './api'
import { Config, OptiConfig } from './modules/config'
import { Env } from '../env'
import { User } from './modules/user'
import { Group } from './modules/group'

const ANONYMOUS_ID_KEY = 'opti_anonymous_id'

export class OptiprismBrowser {
  readonly __logger: ConsolaInstance
  readonly __apiClient: ApiClient
  config: Config
  user?: User
  group?: Group

  constructor() {
    this.__logger = createLogger({
      level: Env.logLevel,
    })
    this.__apiClient = new ApiClient(this.__logger)
    this.config = new OptiConfig()
  }

  configure(config: Config): void {
    this.config = Object.assign(this.config, config)
    this.__logger.info('this.logger.level', this.__logger.level)

    if (!this.config.token) {
      this.__logger.error('token is required')
      return
    }

    this.user = new User(this.__apiClient, this.config.token)
    this.group = new Group(this.__apiClient, this.config.token)

    this.initAnonymousId()

    if (this.config.autotrack === false) return
    this.enableAutoTrack()
  }

  async track(event: TrackEventRequest['event'], properties?: TrackEventRequest['properties']) {
    const context = new Context()
    try {
      await this.__apiClient.tracking.trackEvent(this.config.token, {
        anonymousId: this.config.anonymousId,
        context,
        event,
        properties,
        userId: this.user?.userId,
        groups: this.group?.groups,
      })
    } catch (e) {
      this.__logger.error('track', JSON.stringify(e))
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
  // @ts-expect-error global scope
  globalScope.optiprism = createInstance()
}
