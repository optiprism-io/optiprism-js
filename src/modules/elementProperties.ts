export class ElementProperties {
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
