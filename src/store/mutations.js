import types from './types'
export default {
  [types.SET_MARKDOWN](state, { markdown }) {
    state.markdown = markdown
  },
  [types.SET_THEME](state, { theme }) {
    state.theme = theme
  },
  [types.SET_FONTSIZE](state, { fontSize }) {
    state.fontSize = fontSize
  },
}
