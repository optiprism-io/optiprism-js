import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'
import { USER_GROUP } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'

export class User {
  private readonly apiClient: ApiClient
  private readonly token: string
  userId?: string

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
  }

  async identify(id: string, properties?: IdentifyEventRequest['properties']) {
    const context = new Context()

    this.userId = id

    await this.apiClient.tracking.identifyEvent(this.token, {
      context,
      group: USER_GROUP,
      id,
      properties,
    })
  }
}
