import unfetch from 'unfetch'
import { getGlobalScope } from '../utils/globalScope'

let fetch = unfetch
if (typeof window !== 'undefined') {
  // @ts-ignore
  fetch = window.fetch || unfetch
}

export type Dispatcher = (url: string, body: object, method?: 'post' | 'put') => Promise<unknown>

const headers = { 'Content-Type': 'text/plain' }

export default function (): { dispatch: Dispatcher } {
  function dispatch(url: string, body: object, method = 'post'): Promise<unknown> {
    return unfetch(url, {
      headers,
      method,
      body: JSON.stringify(body),
    })
  }
  return {
    dispatch,
  }
}

export const sendBeacon = async (url: string, payload: object) => {
  const globalScope = getGlobalScope()
  if (!globalScope?.navigator.sendBeacon) {
    throw new Error('SendBeaconTransport is not supported')
  } else {
    navigator.sendBeacon(url, JSON.stringify(payload))
  }
}
