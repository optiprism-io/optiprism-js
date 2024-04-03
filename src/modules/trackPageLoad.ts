import { Event } from '../types/event'
import { OptiprismBrowser } from '../index'

export function trackPageLoad(ob: OptiprismBrowser) {
  window.onload = () => {
    const properties = new PageProperties()
    ob.track(Event.page, properties)
  }
}

class PageProperties {
  path: string
  referer: string
  search: string
  title: string
  url: string

  constructor({ path, referer, search, title, url }: Partial<PageProperties> = {}) {
    this.path = path || location.pathname
    this.referer = referer || document.referrer
    this.search = search || location.search
    this.title = title || document.title
    this.url = url || location.href
  }
}
