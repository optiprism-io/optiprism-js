import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'
import { GROUP_ID_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'
import { ConsolaInstance } from 'consola'

export class Group {
  private readonly __apiClient: ApiClient
  private readonly __logger: ConsolaInstance
  private readonly token: string
  groups: Record<string, string>

  constructor(client: ApiClient, logger: ConsolaInstance, token: string) {
    this.__apiClient = client
    this.__logger = logger
    this.token = token
    this.groups = (LocalStorage.get(GROUP_ID_KEY) as Record<string, string>) || {}
  }

  async identify(group: string, id: string, properties?: IdentifyEventRequest['properties']) {
    const context = new Context()

    this.groups[group] = id
    LocalStorage.set(GROUP_ID_KEY, this.groups)

    this.__logger.verbose('Identify User:', id, properties)

    await this.__apiClient.tracking.identifyEvent(this.token, {
      context,
      group,
      id,
      properties,
    })
  }
}
