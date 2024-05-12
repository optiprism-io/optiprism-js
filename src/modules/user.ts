import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'

const USER = 'user'

export class User {
  private readonly apiClient: ApiClient
  private readonly token: string
  userId?: string

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
  }

  async identify(id: string, properties?: Record<string, any>) {
    const context = new Context()

    this.userId = id

    await this.apiClient.tracking.identifyEvent(this.token, {
      context,
      group: USER,
      id,
      properties,
    })
  }
}
