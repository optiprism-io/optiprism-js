const resetBtn = document.querySelectorAll('[data-reset]')[0]

resetBtn.addEventListener('click', () => {
  globalThis.optiprism.reset()
})
