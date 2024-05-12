import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'

export class Group {
  private readonly apiClient: ApiClient
  private readonly token: string
  groups: Record<string, string>

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
    this.groups = {}
  }

  async identify(group: string, id: string, properties?: Record<string, any>) {
    const context = new Context()

    this.groups[group] = id

    await this.apiClient.tracking.identifyEvent(this.token, {
      context,
      group,
      id,
      properties,
    })
  }
}
