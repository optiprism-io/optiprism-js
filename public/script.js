const SELECTORS = ['button', 'a']

const trackClickEvent = element => {
  element.addEventListener('click', event => {
    console.log('click', element)
  })
}

const elements = document.querySelectorAll(SELECTORS.join(','))
elements.forEach(trackClickEvent)
