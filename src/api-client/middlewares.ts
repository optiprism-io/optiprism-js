import { ConsolaInstance } from 'consola'
import { ErrorContext, Middleware, RequestContext } from '../api'
import { cleanEmptyValues } from '@/utils/cleanEmptyValues'

export class LoggerMiddleware implements Middleware {
  logger: ConsolaInstance

  constructor(logger: ConsolaInstance) {
    this.logger = logger
  }

  pre(context: RequestContext) {
    this.logger.debug('Send Request:', { url: context.url, body: context.init.body })
    return Promise.resolve(context)
  }

  onError(context: ErrorContext) {
    this.logger.error('Request Error:', context.error)
    return Promise.reject()
  }
}

export class RemoveEmptyMiddleware implements Middleware {
  pre(context: RequestContext) {
    const cleanContext = { ...context }
    if (typeof cleanContext.init.body === 'string') {
      const jsonBody = JSON.parse(cleanContext.init.body)
      const data = cleanEmptyValues(jsonBody)
      cleanContext.init.body = data
    }
    return Promise.resolve(cleanContext)
  }
}
