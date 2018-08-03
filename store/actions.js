import types from './types'
import request from '../modules/request'
const baseURL = `${process.server ? process.env.baseURL : ''}/api`
const cache = new Map()
export default {
  async [types.NUXT_SERVER_INIT]({ commit }) {},
  async [types.FETCH_CONTENTS_LIST]({ commit }) {
    const filePath = `${baseURL}/list`
    const contentsList = await request(filePath)
    return commit(types.SET_CONTENTS_LIST, contentsList)
  },
  async [types.FETCH_CONTENT]({ commit, state }, { slug, page }) {
    const filePath = `${baseURL}/${slug}/${page}`
    const cacheResponse = cache.get(filePath)
    if (cacheResponse) return commit(types.SET_RESPONSE, cacheResponse)
    const response = await request(filePath)
    cache.set(filePath, response)
    return commit(types.SET_RESPONSE, response)
  },
  async [types.FETCH_HEADING]({ commit, state }, { slug }) {
    if (state.heading.length !== 0 && state.slug === slug) return
    const filePath = `${baseURL}/${slug}/heading`
    const cacheResponse = cache.get(filePath)
    if (cacheResponse) return commit(types.SET_HEADING, cacheResponse)
    const heading = await request(filePath)
    cache.set(filePath, heading)
    return commit(types.SET_HEADING, heading)
  },
}
