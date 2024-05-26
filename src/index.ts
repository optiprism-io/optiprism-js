import { ConsolaInstance, createConsola as createLogger } from 'consola'

import { Env } from '@/../env'
import { ANONYMOUS_ID_KEY, EVENT_NAME_CLICK, EVENT_NAME_PAGE } from '@/constants'
import { SuperProps, SuperPropsData } from '@/modules/superProps'
import { LogLevelName } from '@/utils/logLevel'

import { TrackEventRequest } from './api'
import { ApiClient } from './api-client/apiClient'
import { Config, OptiConfig } from './modules/config'
import { Context } from './modules/context'
import { ElementProperties } from './modules/elementProperties'
import { Group } from './modules/group'
import { LocalStorage } from './modules/localStorage'
import { PageProperties } from './modules/pageProperties'
import { User } from './modules/user'
import { getGlobalScope } from './utils/globalScope'
import { UUID } from './utils/uuid'

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

    const allProps = Object.assign(SuperProps.get(), properties)

    await this.__apiClient.tracking.trackEvent(this.config.token, {
      anonymousId: this.user?.userId ? undefined : this.config.anonymousId,
      context,
      event,
      properties: allProps,
      userId: this.user?.userId,
      groups: this.group?.groups,
    })
  }

  register(superProps: SuperPropsData) {
    this.__logger.debug('Register:', superProps)
    SuperProps.set(superProps)
  }

  register_once(superProps: SuperPropsData) {
    this.__logger.debug('Register Once:', superProps)
    SuperProps.set(superProps, { overwrite: false })
  }

  unregister(key: string) {
    this.__logger.debug('Unregister:', key)
    SuperProps.remove(key)
  }

  reset() {
    this.__logger.verbose('Reset')
    this.user?.reset()
    this.group?.reset()
    LocalStorage.remove(ANONYMOUS_ID_KEY)
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
