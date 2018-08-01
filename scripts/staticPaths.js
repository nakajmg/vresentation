const fs = require('fs')
const path = require('path')
const frontmatter = require('frontmatter')
const mdit = require('markdown-it')()
const compact = require('lodash/compact')
const flatten = require('lodash/flatten')

function createPaths({ markdown, slug }) {
  const parsed = frontmatter(markdown)
  const rendered = mdit.render(parsed.content)
  const pages = compact(rendered.split('<h2>')).map(content => `<h2>${content}`)
  const paths = pages.map((content, index) => `/${slug}/${index + 1}`)
  paths.unshift(`/${slug}`)
  return paths
}

module.exports = function() {
  const list = JSON.parse(fs.readFileSync(path.resolve('./static/talks.json'), 'utf-8'))
  const paths = list.map(({ slug }) => {
    return createPathsBySlug({ slug })
  })
  return flatten(paths)
}

function createPathsBySlug({ slug }) {
  const markdown = fs.readFileSync(path.resolve(`./static/talks/${slug}/index.md`), 'utf-8')
  return createPaths({ markdown, slug })
}

module.exports.createPathsBySlug = createPathsBySlug
