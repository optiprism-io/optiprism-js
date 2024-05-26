const resetBtn = document.querySelectorAll('[data-reset]')[0]
const registerBtn = document.querySelectorAll('[data-register]')[0]

const TEST_SUPER_KEY = 'SuperPropKey'
const TEST_SUPER_VALUE = 'SuperPropValue'

resetBtn.addEventListener('click', () => {
  globalThis.optiprism.reset()
})

registerBtn.addEventListener('click', () => {
  globalThis.optiprism.register({ [TEST_SUPER_KEY]: TEST_SUPER_VALUE })
})
