const LS_TOKEN_KEY = 'test_token'
const token =
  new URLSearchParams(window.location.search).get('token') || localStorage.getItem(LS_TOKEN_KEY)

if (token) localStorage.setItem(LS_TOKEN_KEY, token)

globalThis.optiprism.configure({
  token,
})
