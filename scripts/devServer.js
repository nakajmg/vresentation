const express = require('express')
const app = express()
const chokidar = require('chokidar')
const SSE = require('express-sse')
const sse = new SSE()
const ip = require('ip')
const copyAssets = require('./copyAssets')
const port = 3000
process.env['dev'] = true
process.env['baseURL'] = `http://localhost:${port}`
const api = require('./mdServer')
const { Nuxt, Builder } = require('nuxt')
;(async () => {
  const config = require('../nuxt.config.js')
  app.get('/stream', sse.init)
  const nuxt = new Nuxt(config)
  await copyAssets()
  app.use('/api', api)
  app.use(nuxt.render)
  app.use(express.static(`${__dirname}/../.nuxt`))
  // app.use('/_nuxt', express.static('./_nuxt'))
  // await new Builder(nuxt).build()
  await app.listen({ port })
  console.log(`> local   : http://localhost:${port}/`)
  console.log(`> external: http://${ip.address()}:${port}/\n`)

  const watcher = chokidar.watch('./talks/**/*.md')
  watcher.on('change', path => {
    console.log('updated:', path)
    const slug = path.match(/talks\/(.*)\/.*/)[1]
    sse.send({ slug }, 'updated')
  })
})()
