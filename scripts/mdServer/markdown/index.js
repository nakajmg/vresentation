const MarkdownIt = require('markdown-it')
const highlight = require('./highlight')
const containers = require('./containers')
const preWrapper = require('./preWrapper')
const emoji = require('markdown-it-emoji')
const linkAttributes = require('markdown-it-link-attributes')

module.exports = ({ markdown = {} } = {}) => {
  const md = MarkdownIt({
    html: true,
    highlight,
    linkify: true,
  })
    .use(preWrapper)
    .use(containers)
    .use(emoji)
    .use(linkAttributes, {
      pattern: /^https?:/,
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })

  return md
}
