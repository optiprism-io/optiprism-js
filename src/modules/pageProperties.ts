export class PageProperties {
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
