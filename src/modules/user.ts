import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'
import { USER_GROUP, USER_ID_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'

export class User {
  private readonly apiClient: ApiClient
  private readonly token: string
  userId?: string

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
    this.userId = LocalStorage.get(USER_ID_KEY) as string
  }

  async identify(id: string, properties?: IdentifyEventRequest['properties']) {
    const context = new Context()

    this.userId = id
    LocalStorage.set(USER_ID_KEY, this.userId)

    await this.apiClient.tracking.identifyEvent(this.token, {
      context,
      group: USER_GROUP,
      id,
      properties,
    })
  }
}
