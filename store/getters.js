import MD from '../modules/markdown'
import frontmatter from 'frontmatter'
import pageSplitter from '../modules/pageSplitter'
import { heading12, heading34 } from '../modules/regex.js'
const mdit = MD()
export default {
  page({ route }) {
    return parseInt(route.params.page) || 0
  },
  slug({ route }) {
    return route.params.slug || ''
  },
  currentContent(state) {
    if (!state.markdown) return
    const frontMattered = frontmatter(state.markdown)
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
  },
  meta(state, { currentContent }) {
    if (!currentContent) return { title: '' }
    return currentContent.meta
  },
  currentPages(state, { currentContent }) {
    return pageSplitter(currentContent.content)
  },
  content(state, { currentPages, page }) {
    return currentPages[page - 1]
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
