const http = require('http')
const nStatic = require('node-static')
const fileServer = new nStatic.Server('./public')
http
  .createServer(function (req, res) {
    fileServer.serve(req, res)
  })
  .listen(3000)

console.log('\x1b[33m url: http://localhost:3000 \x1b[0m')
