import MD from '../markdown/index'
import frontmatter from 'frontmatter'
import { compact } from 'lodash-es'
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
  pageContent(state, { pages, page }) {
    return pages[page - 1]
  },
  pageMeta(state, { parsedMarkdown }) {
    const { meta, rendered } = parsedMarkdown
    if (meta === null && rendered === '') return {}
    if (state.markdown !== '' && meta === null) {
      const matched = rendered.match(/<h[1,2]>(.*?)<\/h[1,2]>\n/)
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
