import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'

export class Group {
  private readonly apiClient: ApiClient
  private readonly token: string
  groups: Record<string, string>

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
    this.groups = {}
  }

  async identify(group: string, id: string, properties?: IdentifyEventRequest['properties']) {
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
