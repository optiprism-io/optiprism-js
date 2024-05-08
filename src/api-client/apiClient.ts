import { ConsolaInstance } from 'consola'
import { Configuration, DefaultApi } from '../api'
import { sendBeaconApi } from './sendBeaconApi'
import { Env } from '../../env'
import { LoggerMiddleware } from './middlewares'

export class ApiClient {
  config: Configuration
  tracking: DefaultApi

  constructor(logger: ConsolaInstance) {
    this.config = new Configuration({
      fetchApi: sendBeaconApi,
      basePath: Env.basePath,
      middleware: [new LoggerMiddleware(logger)],
    })

    this.tracking = new DefaultApi(this.config)
  }
}
