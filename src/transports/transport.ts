import unfetch from 'unfetch'
import { getGlobalScope } from '../utils/globalScope'

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
      navigator.sendBeacon(url, JSON.stringify(payload))
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
