const fs = require('fs')
const path = require('path')
const frontmatter = require('frontmatter')
const mdit = require('markdown-it')()
const compact = require('lodash/compact')
const flatten = require('lodash/flatten')
const parseMarkdown = require('./mdServer/parseMarkdown')
const pageSplitter = require('./mdServer/pageSplitter')

function getContents({ slug }) {
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  return {
    meta: parsed.meta,
    pages,
  }
}

function createPaths({ markdown, slug }) {
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)
  const paths = pages.map((content, index) => `/${slug}/${index + 1}`)
  paths.unshift(`/${slug}`)
  return paths
}

module.exports = function() {
  const list = JSON.parse(fs.readFileSync(path.resolve('./static/api/list.json'), 'utf-8'))
  const paths = list.map(({ slug }) => {
    return createPathsBySlug({ slug })
  })
  return flatten(paths)
}

function createPathsBySlug({ slug }) {
  const markdown = fs.readFileSync(path.resolve(`./talks/${slug}/index.md`), 'utf-8')
  return createPaths({ markdown, slug })
}

module.exports.createPathsBySlug = createPathsBySlug
