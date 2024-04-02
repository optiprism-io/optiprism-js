import { Event } from '../types/event'
import { OptiprismBrowser } from '../index'

const SELECTORS = ['button', 'a']

export function trackElementsClick(context: OptiprismBrowser) {
  const trackClickEvent = (element: Element) => {
    element.addEventListener('click', event => {
      const el = event.target as HTMLElement
      const properties = new ElementProperties(el)

      context.track(Event.click, properties)
    })
  }

  const elements = document.querySelectorAll(SELECTORS.join(','))
  elements.forEach(trackClickEvent)
}

class ElementProperties {
  element: string
  name: string
  id: string
  class: string
  href: string
  style = {}
  text: string

  constructor(el: HTMLElement) {
    this.element = el.tagName
    this.name = el.getAttribute('name') || ''
    this.id = el.getAttribute('id') || ''
    this.class = el.getAttribute('class') || ''
    this.href = el.getAttribute('href') || ''
    this.style = el.style
    this.text = el.innerText
  }
}
