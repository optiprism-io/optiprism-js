import { ConsolaInstance } from 'consola'

import { Env } from '@/../env'
import { Configuration, DefaultApi } from '@/api'

import { LoggerMiddleware, RemoveEmptyMiddleware } from './middlewares'
import { sendBeaconApi } from './sendBeaconApi'

export class ApiClient {
  config: Configuration
  tracking: DefaultApi

  constructor(logger: ConsolaInstance) {
    this.config = new Configuration({
      fetchApi: sendBeaconApi,
      basePath: Env.basePath,
      middleware: [new RemoveEmptyMiddleware(), new LoggerMiddleware(logger)],
    })

    this.tracking = new DefaultApi(this.config)
  }
}
