const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 4000

app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
