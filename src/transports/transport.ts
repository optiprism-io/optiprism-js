import unfetch from 'unfetch'
import { getGlobalScope } from '../utils/globalScope'
import { deleteFalsyValuesMutable } from '../utils/deleteFalsyValuesMutable'

let fetch = unfetch
if (typeof window !== 'undefined') {
  // @ts-ignore
  fetch = window.fetch || unfetch
}

const headers = { 'Content-Type': 'text/plain' }

export class Transport {
  static sendBeacon(url: string, payload: object) {
    const globalScope = getGlobalScope()
    if (!globalScope?.navigator.sendBeacon) {
      throw new Error('SendBeaconTransport is not supported')
    } else {
      /* TODO: think about the middleware layer */
      const data = JSON.stringify(deleteFalsyValuesMutable(payload))
      navigator.sendBeacon(url, data)
    }
  }

  static dispatch(url: string, body: object, method = 'post'): Promise<unknown> {
    return unfetch(url, {
      headers,
      method,
      body: JSON.stringify(body),
    })
  }
}
