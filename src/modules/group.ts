import { ApiClient } from '../api-client/apiClient'
import { Context } from './context'
import { IdentifyEventRequest } from '../api'
import { GROUP_ID_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'

export class Group {
  private readonly apiClient: ApiClient
  private readonly token: string
  groups: Record<string, string>

  constructor(client: ApiClient, token: string) {
    this.apiClient = client
    this.token = token
    this.groups = (LocalStorage.get(GROUP_ID_KEY) as Record<string, string>) || {}
  }

  async identify(group: string, id: string, properties?: IdentifyEventRequest['properties']) {
    const context = new Context()

    this.groups[group] = id
    LocalStorage.set(GROUP_ID_KEY, this.groups)

    await this.apiClient.tracking.identifyEvent(this.token, {
      context,
      group,
      id,
      properties,
    })
  }
}
