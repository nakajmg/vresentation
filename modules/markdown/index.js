import MarkdownIt from 'markdown-it'
import highlight from './highlight'
// import highlightLines from './highlightLines'
import containers from './containers'
// import lineNumbers from './lineNumbers'
import preWrapper from './preWrapper'
import emoji from 'markdown-it-emoji'
import linkAttributes from 'markdown-it-link-attributes'

export default ({ markdown = {} } = {}) => {
  const md = MarkdownIt({
    html: true,
    highlight,
    linkify: true,
  })
    .use(preWrapper)
    .use(containers)
    .use(emoji)
    // .use(highlightLines)
    // .use(lineNumbers)
    .use(linkAttributes, {
      pattern: /^https?:/,
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })

  return md
}
