import { cleanEmptyValues } from '../utils/cleanEmptyValues'

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
export function sendBeaconApi(
  url: URL | RequestInfo,
  init?: RequestInit | undefined
): Promise<Response> {
  if (typeof url === 'string' && typeof init?.body === 'string') {
    /* TODO: think about the middleware layer */
    const jsonBody = JSON.parse(init.body)
    const data = cleanEmptyValues(jsonBody)
    const result = navigator.sendBeacon(url, JSON.stringify(data))
    if (result) {
      return Promise.resolve(new Response(null, { status: 200 }))
    }
  }
  return Promise.reject()
}
