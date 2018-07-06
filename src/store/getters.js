import MD from '../modules/markdown'
import frontmatter from 'frontmatter'
import { compact } from 'lodash-es'
import { heading12, heading34 } from '../modules/regex.js'
const mdit = MD()
export default {
  page({ route }) {
    return parseInt(route.params.page) || 0
  },
  slug({ route }) {
    return route.params.slug
  },
  parsedMarkdown({ markdown }) {
    const parsed = frontmatter(markdown)
    const rendered = mdit.render(parsed.content)
    return { meta: parsed.data, rendered }
  },
  pages(state, { parsedMarkdown }) {
    return compact(parsedMarkdown.rendered.split('<h2>')).map(content => `<h2>${content}`)
  },
  pagesHeading(state, { pages }) {
    return pages.map(content => {
      let matched = content.match(heading12)
      if (matched && matched[1] !== '') return matched[1]
      matched = content.match(heading34)
      if (matched && matched[1] !== '') return matched[1]
      return 'No Heading'
    })
  },
  pageContent(state, { pages, page }) {
    return pages[page - 1]
  },
  pageMeta(state, { parsedMarkdown }) {
    const { meta, rendered } = parsedMarkdown
    if (meta === null && rendered === '') return {}
    if (state.markdown !== '' && meta === null) {
      const matched = rendered.match(heading12)
      return {
        title: matched[1],
      }
    }
    return meta
  },
  isStartPage(state, { page }) {
    return page === 0
  },
  isEndPage(state, { page, pages }) {
    return page === pages.length
  },
}
