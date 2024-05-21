import { ConsolaInstance, createConsola as createLogger } from 'consola'
import { getGlobalScope } from './utils/globalScope'
import { UUID } from './utils/uuid'
import { PageProperties } from './modules/pageProperties'
import { ElementProperties } from './modules/elementProperties'
import { Context } from './modules/context'
import { LocalStorage } from './modules/localStorage'
import { ApiClient } from './api-client/apiClient'
import { TrackEventRequest } from './api'
import { Config, OptiConfig } from './modules/config'
import { Env } from '../env'
import { User } from './modules/user'
import { Group } from './modules/group'
import { ANONYMOUS_ID_KEY, EVENT_NAME_CLICK, EVENT_NAME_PAGE } from '@/constants'
import { LogLevelName } from '@/utils/logLevel'

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
    this.__logger.info('Log Level:', LogLevelName[this.__logger.level])

    if (!this.config.token) {
      this.__logger.error('Token is required')
      return
    }

    this.user = new User(this.__apiClient, this.__logger, this.config.token)
    this.group = new Group(this.__apiClient, this.__logger, this.config.token)

    this.initAnonymousId()

    if (this.config.autotrack === false) return
    this.enableAutoTrack()
  }

  async track(event: TrackEventRequest['event'], properties?: TrackEventRequest['properties']) {
    this.__logger.verbose('Track Event:', event, properties)
    const context = new Context()

    await this.__apiClient.tracking.trackEvent(this.config.token, {
      anonymousId: this.user?.userId ? undefined : this.config.anonymousId,
      context,
      event,
      properties,
      userId: this.user?.userId,
      groups: this.group?.groups,
    })
  }

  private trackPageLoad() {
    window.onload = () => {
      const properties = new PageProperties()
      this.track(EVENT_NAME_PAGE, properties)
    }
  }

  private trackElementsClick() {
    const SELECTORS = ['button', 'a']

    const trackClickEvent = (element: Element) => {
      element.addEventListener('click', event => {
        const el = event.target as HTMLElement
        const properties = new ElementProperties(el)

        this.track(EVENT_NAME_CLICK, properties)
      })
    }

    const elements = document.querySelectorAll(SELECTORS.join(','))
    elements.forEach(trackClickEvent)
  }

  private enableAutoTrack() {
    this.__logger.debug('Auto track enabled')
    this.trackPageLoad()
    this.trackElementsClick()
  }

  private initAnonymousId() {
    this.config.anonymousId = LocalStorage.getOrSet(ANONYMOUS_ID_KEY, UUID()) as string
  }
}

export const createInstance = () => new OptiprismBrowser()

const globalScope = getGlobalScope()
if (globalScope) {
  // @ts-expect-error global scope
  globalScope.optiprism = createInstance()
}
