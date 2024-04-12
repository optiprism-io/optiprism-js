import { TrackContext } from '../types'

export function getTrackContext(): TrackContext {
  const context: TrackContext = {
    userAgent: navigator.userAgent,
    locale:
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    timezone: String(new Date().getTimezoneOffset() / 60),
  }

  if (location) {
    context.page = {
      path: location.pathname,
      referer: document.referrer,
      search: location.search,
      title: document.title,
      url: location.href,
    }
  }
  return context
}
