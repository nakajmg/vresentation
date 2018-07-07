import types from './types'
export default {
  [types.SET_MARKDOWN](state, { markdown }) {
    state.markdown = markdown
  },
  [types.SET_THEME](state, { theme }) {
    state.theme = theme
  },
  [types.SET_FILTER](state, { name, value }) {
    state.filter[name] = value
  },
  [types.RESET_FILTER](state) {
    state.filter = {
      brightness: 1,
      contrast: 1,
      saturate: 1,
    }
  },
  [types.SET_VISIBILITY](state, { type, value }) {
    state.visibility[type] = value
  },
}
