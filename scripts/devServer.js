const express = require('express')
const app = express()
const ip = require('ip')
const api = require('./mdServer')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
;(async () => {
  const nuxt = new Nuxt(config)
  app.use('/api', api)
  app.use(nuxt.render)
  await new Builder(nuxt).build()
  const port = 3000
  await app.listen({ port })
  process.env['dev'] = true
  process.env['baseURL'] = `http://localhost:${port}`
  console.log(`> local   : http://localhost:${port}/`)
  console.log(`> external: http://${ip.address()}:${port}/\n`)
})()
