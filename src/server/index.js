const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const app = express()
const port = 8080
const SERVER_TIMEOUT = 1000

app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/ingest/:token/track', (req, res) => {
  sleep(SERVER_TIMEOUT).then(() => {
    res.send(req.params)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
