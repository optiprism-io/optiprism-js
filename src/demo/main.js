const LS_TOKEN_KEY = 'test_token'
const token =
  new URLSearchParams(window.location.search).get('token') || localStorage.getItem(LS_TOKEN_KEY)

if (token) localStorage.setItem(LS_TOKEN_KEY, token)

globalThis.optiprism.configure({
  token,
  serverUrl: 'https://demdxx.optiprism.io/api',
})

const setTokenBtn = document.querySelectorAll('[data-set-token]')[0]

setTokenBtn.addEventListener('click', () => {
  const url = new URL(location.href)
  url.searchParams.set('token', self.crypto.randomUUID())
  location.href = url.href
})
