import unfetch from 'unfetch'
import { deleteFalsyValuesMutable } from '../utils/deleteFalsyValuesMutable'

let fetch = unfetch
if (typeof window !== 'undefined') {
  // @ts-ignore
  fetch = window.fetch || unfetch
}

const headers = { 'Content-Type': 'text/plain' }

export class Transport {
  static sendBeacon(url: string, payload: object) {
    /* TODO: think about logger level */
    try {
      /* TODO: think about the middleware layer */
      const data = JSON.stringify(deleteFalsyValuesMutable(payload))
      navigator.sendBeacon(url, data)
    } catch (e) {
      console.error(e)
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
