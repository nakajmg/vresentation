import types from './types'
import axios from 'axios'
export default {
  async [types.FETCH_MARKDOWN]({ commit }, { slug }) {
    const markdown = await axios.get(`/static/talks/${slug}/index.md`).then(res => res.data)
    return commit(types.SET_MARKDOWN, { markdown })
  },
}
