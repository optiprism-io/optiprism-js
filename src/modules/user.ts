import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'
import { USER_GROUP, USER_ID_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'
import { ConsolaInstance } from 'consola'

export class User {
  private readonly __apiClient: ApiClient
  private readonly __logger: ConsolaInstance
  private readonly token: string
  userId?: string

  constructor(client: ApiClient, logger: ConsolaInstance, token: string) {
    this.__apiClient = client
    this.__logger = logger
    this.token = token
    this.userId = LocalStorage.get(USER_ID_KEY) as string
  }

  async identify(id: string, properties?: IdentifyEventRequest['properties']) {
    const context = new Context()

    this.userId = id
    LocalStorage.set(USER_ID_KEY, this.userId)

    this.__logger.verbose('Identify User:', id, properties)

    await this.__apiClient.tracking.identifyEvent(this.token, {
      context,
      group: USER_GROUP,
      id,
      properties,
    })
  }
}
