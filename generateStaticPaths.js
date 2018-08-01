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
  return pages.map((content, index) => `/${slug}/${index}`)
}

module.exports = function() {
  const list = JSON.parse(fs.readFileSync(path.resolve('./static/talks.json'), 'utf-8'))
  const paths = list.map(({ slug }) => {
    const markdown = fs.readFileSync(path.resolve(`./static/talks/${slug}/index.md`), 'utf-8')
    return createPaths({ markdown, slug })
  })
  return flatten(paths)
}
