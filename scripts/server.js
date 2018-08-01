const express = require('express')
const portfinder = require('portfinder')
const { Nuxt, Builder } = require('nuxt')

async function createServer() {
  const app = express()
  const port = await portfinder.getPortPromise()
  const baseURL = `http://localhost:${port}`
  process.env['baseURL'] = baseURL
  const config = require('../nuxt.config.js')
  const nuxt = new Nuxt(config)
  app.use(nuxt.render)
  await new Builder(nuxt).build()
  return app.listen({ port })
}

module.exports = createServer
