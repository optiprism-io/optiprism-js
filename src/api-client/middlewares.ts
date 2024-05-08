import { Middleware } from '../api'

export const log: Middleware = {
  pre(context) {
    console.info('Send Request:', context)
    return Promise.resolve(context)
  },
  onError(context) {
    console.error('Request Error:', context.error)
    return Promise.reject()
  },
}
