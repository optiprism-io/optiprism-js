import { ConsolaInstance } from 'consola'
import { ErrorContext, Middleware, RequestContext } from '../api'

export class LoggerMiddleware implements Middleware {
  logger: ConsolaInstance

  constructor(logger: ConsolaInstance) {
    this.logger = logger
  }

  pre(context: RequestContext) {
    this.logger.info('Send Request:', context)
    return Promise.resolve(context)
  }

  onError(context: ErrorContext) {
    this.logger.error('Request Error:', context.error)
    return Promise.reject()
  }
}
