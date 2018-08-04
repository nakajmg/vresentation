const express = require('express')
const router = express.Router()
const fs = require('fs')
const striptags = require('striptags')
const parseMarkdown = require('./parseMarkdown')
const pageSplitter = require('./pageSplitter')
const baseDir = __dirname + '/../../talks'
const { heading12, heading34 } = require('./markdown/regex')
const getContentsList = require('./getContentsList')

function getContents({ slug }) {
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  return {
    meta: parsed.meta,
    pages,
  }
}

router.get('/list', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(getContentsList(baseDir))
})

router.get('/:slug', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const params = req.params
  const slug = params.slug
  const { meta, pages } = getContents({ slug })
  const page = 0
  res.send({
    slug,
    page,
    meta,
    contents: pages,
    pageLength: pages.length,
    hasNextPage: page < pages.length,
    hasPrevPage: page > 0,
  })
})
router.get('/:slug/heading', ({ params }, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const slug = params.slug
  const { pages } = getContents({ slug })
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
  const { meta, pages } = getContents({ slug })
  const content = pages[page - 1] || ''
  res.send({
    slug,
    page,
    content,
    meta,
    pageLength: pages.length,
    hasNextPage: page < pages.length,
    hasPrevPage: page > 0,
  })
})

module.exports = router
