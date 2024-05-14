import { Context as IContext } from '../api'
import { name, version } from '../../package.json'

export class Context implements IContext {
  library?: IContext['library']
  page?: IContext['page']
  userAgent?: IContext['userAgent']
  ip?: IContext['ip']

  constructor() {
    this.library = {
      name,
      version,
    }
    this.page = {
      path: location.pathname,
      referrer: document.referrer,
      search: location.search,
      title: document.title,
      url: location.href,
    }
    this.userAgent = navigator.userAgent

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
