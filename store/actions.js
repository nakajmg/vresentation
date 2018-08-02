import types from './types'
import request from '../modules/request'

export default {
  async [types.NUXT_SERVER_INIT]({ commit }) {
    const filePath = process.server ? './static/talks.json' : `/talks.json`
    const contents = await request(filePath)
    commit(types.SET_CONTENTS, { contents })
  },
  async [types.FETCH_MARKDOWN]({ commit, state }, { slug }) {
    if (state.currentSlug === slug) return
    const filePath = process.server ? `./static/talks/${slug}/index.md` : `/talks/${slug}/index.md`
    const markdown = await request(filePath)
    return commit(types.SET_MARKDOWN, { markdown, slug })
  },
}
