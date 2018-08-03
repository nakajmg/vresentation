const express = require('express')
const router = express.Router()
const fs = require('fs')
const striptags = require('striptags')
const parseMarkdown = require('./parseMarkdown')
const pageSplitter = require('./pageSplitter')
const baseDir = __dirname + '/../../talks'
const { heading12, heading34 } = require('./markdown/regex')

router.get('/list', (req, res) => {
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
router.get('/:slug/heading', ({ params }, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const slug = params.slug
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  const heading = pages.map(content => {
    let matched = content.match(heading12)
    if (matched && matched[1] !== '') return striptags(matched[1])
    matched = content.match(heading34)
    if (matched && matched[1] !== '') return striptags(matched)[1]
    return 'No Heading'
  })
  res.send(heading)
})

router.get('/:slug/:page', ({ params }, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
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
