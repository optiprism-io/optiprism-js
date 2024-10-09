import { ConsolaInstance } from 'consola'

import { Configuration, DefaultApi } from '@/api'

import { LoggerMiddleware, RemoveEmptyMiddleware } from './middlewares'
import { sendBeaconApi } from './sendBeaconApi'

export class ApiClient {
  config: Configuration
  tracking: DefaultApi

  constructor(serverUrl: string, logger: ConsolaInstance) {
    this.config = new Configuration({
      fetchApi: sendBeaconApi,
      basePath: serverUrl,
      middleware: [new RemoveEmptyMiddleware(), new LoggerMiddleware(logger)],
    })

    this.tracking = new DefaultApi(this.config)
  }
}
