import { Event, EventType } from '../types/event'
import { OptiprismBrowser } from '../index'

const SELECTORS = ['button', 'a']

export function trackElementsClick(ob: OptiprismBrowser) {
  const trackClickEvent = (element: Element) => {
    element.addEventListener('click', event => {
      const el = event.target as HTMLElement
      const properties = new ElementProperties(el)

      ob.track(Event.click, EventType.track, properties)
    })
  }

  const elements = document.querySelectorAll(SELECTORS.join(','))
  elements.forEach(trackClickEvent)
}

class ElementProperties {
  Element: string
  Name: string
  ID: string
  Class: string
  Href: string
  Text: string

  constructor(el: HTMLElement) {
    this.Element = el.tagName
    this.Name = el.getAttribute('name') || ''
    this.ID = el.getAttribute('id') || ''
    this.Class = el.getAttribute('class') || ''
    this.Href = el.getAttribute('href') || ''
    this.Text = el.innerText
  }
}
