import MD from '../modules/markdown'
import frontmatter from 'frontmatter'
import compact from 'lodash/compact'
import { heading12, heading34 } from '../modules/regex.js'
const mdit = MD()
export default {
  page({ route }) {
    return parseInt(route.params.page) || 0
  },
  slug({ route }) {
    return route.params.slug || ''
  },
  currentFile(state, { slug }) {
    return state.contents.find(content => content.slug === slug)
  },
  currentContent(state, { currentFile }) {
    if (!currentFile) return { meta: {}, content: '' }
    const frontMattered = frontmatter(currentFile.markdown)
    const renderedMarkdown = mdit.render(frontMattered.content)
    const meta = frontMattered.data || { title: currentFile.slug }
    if (currentFile.title) {
      meta.title = currentFile.title
    }
    meta.slug = currentFile.slug
    return {
      meta,
      content: renderedMarkdown,
    }
  },
  currentPages(state, { currentContent }) {
    return compact(currentContent.content.split('<h2>')).map(content => `<h2>${content}`)
  },
  currentHeading(state, { currentPages }) {
    return currentPages.map(content => {
      let matched = content.match(heading12)
      if (matched && matched[1] !== '') return matched[1]
      matched = content.match(heading34)
      if (matched && matched[1] !== '') return matched[1]
      return 'No Heading'
    })
  },
  currentPageContent(state, { currentPages, page }) {
    return currentPages[page - 1]
  },
  currentContentMeta(state, { currentContent }) {
    return currentContent.meta
  },
  isStartPage(state, { page }) {
    return page === 0
  },
  isEndPage(state, { page, currentPages }) {
    return page === currentPages.length
  },
  filterStyle({ filter }) {
    const { brightness, contrast, saturate } = filter
    return `filter: brightness(${brightness}) contrast(${contrast}) saturate(${saturate});`
  },
}
