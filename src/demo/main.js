const LS_TOKEN_KEY = 'test_token'
const token =
  new URLSearchParams(window.location.search).get('token') || localStorage.getItem(LS_TOKEN_KEY)

if (token) localStorage.setItem(LS_TOKEN_KEY, token)

globalThis.optiprism.configure({
  token,
})

const setTokenBtn = document.querySelectorAll('[data-set-token]')[0]
const clearStorageBtn = document.querySelectorAll('[data-clear-storage]')[0]

setTokenBtn.addEventListener('click', () => {
  const url = new URL(location.href)
  url.searchParams.set('token', self.crypto.randomUUID())
  location.href = url.href
})

clearStorageBtn.addEventListener('click', () => {
  localStorage.clear()
})
