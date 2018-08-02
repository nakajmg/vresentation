import types from './types'
import axios from 'axios'
const baseURL = process.server ? process.env.baseURL : ''
export default {
  async [types.NUXT_SERVER_INIT]({ commit, dispatch }, { params }) {
    const { slug } = params
    const contents = await axios.get(`${baseURL}/talks.json`).then(res => res.data)
    commit(types.SET_CONTENTS, { contents })
    if (slug) return dispatch(types.FETCH_MARKDOWN, { slug })
  },
  async [types.FETCH_MARKDOWN]({ commit, state }, { slug }) {
    if (state.currentSlug === slug) return
    const markdown = await axios.get(`${baseURL}/talks/${slug}/index.md`).then(res => res.data)
    return commit(types.SET_MARKDOWN, { markdown, slug })
  },
}
