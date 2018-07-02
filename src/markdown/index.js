import MarkdownIt from 'markdown-it'
import highlight from './highlight'
import highlightLines from './highlightLines'
import containers from './containers'
import lineNumbers from './lineNumbers'
import preWrapper from './preWrapper'
import emoji from 'markdown-it-emoji'

export default ({ markdown = {} } = {}) => {
  const md = MarkdownIt({
    html: true,
    highlight,
  })
    .use(highlightLines)
    .use(preWrapper)
    .use(containers)
    .use(emoji)
    .use(lineNumbers)

  return md
}
