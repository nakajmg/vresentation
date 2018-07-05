import MD from '../markdown/index'
import frontmatter from 'frontmatter'
import { compact } from 'lodash-es'
import axios from 'axios'
export default slug => {
  return axios
    .get(`/static/talks/${slug}/index.md`)
    .then(res => res.data)
    .then(md => {
      const mdit = MD()
      const parsed = frontmatter(md)
      const rendered = mdit.render(parsed.content)
      const pages = compact(rendered.split('<h2>')).map(content => `<h2>${content}`)
      if (parsed.data === null) {
        const matched = rendered.match(/<h[1,2]>(.*?)<\/h[1,2]>\n/)
        parsed.data = {
          title: matched[1],
        }
      }
      return { pageMeta: parsed.data, pages }
    })
}
