import { Event } from '../types/event'
import { OptiprismBrowser } from '../index'

export function trackPageLoad(ob: OptiprismBrowser) {
  window.onload = () => {
    const properties = new PageProperties()
    ob.track(Event.page, properties)
  }
}

class PageProperties {
  ['Page Path']: string;
  ['Page Referer']: string;
  ['Page Search']: string;
  ['Page Title']: string;
  ['Page URL']: string

  constructor(page: Partial<PageProperties> = {}) {
    this['Page Path'] = page['Page Path'] || location.pathname
    this['Page Referer'] = page['Page Referer'] || document.referrer
    this['Page Search'] = page['Page Search'] || location.search
    this['Page Title'] = page['Page Title'] || document.title
    this['Page URL'] = page['Page URL'] || location.href
  }
}
