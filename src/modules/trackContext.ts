import { Context } from '../api'

export class TrackContext implements Context {
  library?: Context['library']
  page?: Context['page']
  userAgent?: Context['userAgent']
  ip?: Context['ip']

  constructor() {
    this.userAgent = navigator.userAgent
    this.page = {
      path: location.pathname,
      referrer: document.referrer,
      search: location.search,
      title: document.title,
      url: location.href,
    }

    // locale:
    //   navigator.languages && navigator.languages.length
    //     ? navigator.languages[0]
    //     : navigator.language,
    // screen: {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // },
    // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}
