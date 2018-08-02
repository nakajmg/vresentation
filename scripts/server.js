const express = require('express')
const portfinder = require('portfinder')

async function createServer() {
  const app = express()
  const port = await portfinder.getPortPromise()
  const baseURL = `http://localhost:${port}`
  process.env['baseURL'] = baseURL
  app.use(express.static(__dirname + '/../dist'))
  return app.listen({ port })
}

module.exports = createServer
