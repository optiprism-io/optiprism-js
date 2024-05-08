interface Autotrack {
  pageViews: boolean
  selectors?: string[]
  elements?: Element[]
}

export interface Config {
  token: string
  autotrack?: Autotrack | boolean
  anonymousId?: string
}

export class OptiConfig {
  token: Config['token']
  autotrack?: Config['autotrack']
  anonymousId?: Config['anonymousId']

  constructor(config?: Config) {
    this.token = config?.token || ''
    this.autotrack = config?.autotrack || true
    this.anonymousId = config?.anonymousId
  }
}
