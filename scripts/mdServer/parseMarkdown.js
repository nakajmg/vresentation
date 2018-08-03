const MD = require('./markdown')
const mdit = MD()
const frontmatter = require('frontmatter')
const { heading12 } = require('./markdown/regex.js')

module.exports = function parseMarkdown(markdown) {
  const frontMattered = frontmatter(markdown)
  const renderedMarkdown = mdit.render(frontMattered.content)
  const meta = frontMattered.data || {}
  if (frontMattered.data === null) {
    const matched = renderedMarkdown.match(heading12)
    meta.title = matched[1]
  }
  return {
    content: renderedMarkdown,
    meta,
  }
}
