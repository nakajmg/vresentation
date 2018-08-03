const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')
const parseMarkdown = require('./parseMarkdown')
const pageSplitter = require('./pageSplitter')
const times = require('lodash/times')
const baseDir = __dirname + '/../../talks'

router.get('/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  try {
    const talks = fs.readFileSync(`${baseDir}.json`)
    res.send(talks)
  } catch (e) {
    const ret = fs.readdirSync(baseDir)
    res.send(ret.map(slug => ({ slug, title: slug })))
  }
})

router.get('/:slug', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const params = req.params
  const slug = params.slug
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  const page = 0
  res.send({
    slug,
    page,
    contents: pages,
    pageLength: pages.length,
    hasNextPage: page < pages.length,
    hasPrevPage: page > 0,
  })
})
router.get('/:slug/:page', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const params = req.params
  const slug = params.slug
  const page = parseInt(params.page)
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  const content = pages[page - 1] || ''
  res.send({
    slug,
    page,
    content,
    meta: parsed.meta,
    pageLength: pages.length,
    hasNextPage: page < pages.length,
    hasPrevPage: page > 0,
  })
})
module.exports = router
