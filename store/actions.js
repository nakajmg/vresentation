import types from './types'
import axios from 'axios'
export default {
  async [types.NUXT_SERVER_INIT]({ commit, dispatch, getters }) {
    const json = await axios.get(`${process.env.baseURL}/talks.json`)
      .then(res => res.data)
    const contents = await Promise.all(json.map((meta) => {
      return axios.get(`${process.env.baseURL}/talks/${meta.slug}/index.md`)
        .then(res => res.data)
        .then(markdown => {
          meta.markdown = markdown
          return meta
        })
    }))
    return commit(types.SET_CONTENTS, { contents })
  },
  async [types.FETCH_MARKDOWN]({ commit }, { slug }) {
    const markdown = await axios.get(`${process.env.baseURL}/talks/${slug}/index.md`).then(res => res.data)
    return commit(types.SET_MARKDOWN, { markdown })
  },
}
