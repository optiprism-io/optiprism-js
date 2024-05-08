import { Configuration, DefaultApi, Middleware } from './api'
import { deleteFalsyValuesMutable } from './utils/deleteFalsyValuesMutable'

/*
 * The sendBeaconApi function is a custom fetch API function that uses
 * the navigator.sendBeacon method to send HTTP requests.
 * This function is designed to be used in a context where the fetch API is replaced
 * with a beacon sending mechanism.
 *
 * The function returns a Promise that resolves with a Response object.
 * The Response object is created with a status of 200 and no body,
 * indicating a successful request. This is because the navigator.sendBeacon
 * method does not provide a response.
 * */
function sendBeaconApi(url: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  /* TODO: think about the middleware layer */
  if (typeof url === 'string' && init) {
    const data = deleteFalsyValuesMutable(init.body)
    const result = navigator.sendBeacon(url, data)
    if (result) {
      return Promise.resolve(new Response(null, { status: 200 }))
    }
  }
  return Promise.reject()
}

const log: Middleware = {
  pre(context) {
    console.info('Send Request:', context)
    return Promise.resolve(context)
  },
  onError(context) {
    console.error('Request Error:', context.error)
    return Promise.reject()
  },
}

const config = new Configuration({
  fetchApi: sendBeaconApi,
  basePath: 'http://localhost:8080/api',
  middleware: [log],
})

class ApiClient {
  tracking: DefaultApi

  constructor(configuration?: Configuration) {
    this.tracking = new DefaultApi(configuration)
  }
}

const apiClient = new ApiClient(config)

export { apiClient }
