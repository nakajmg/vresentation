import types from './types'
export default {
  [types.SET_CONTENTS](state, { contents }) {
    state.contents = contents
  },
  [types.SET_MARKDOWN](state, { markdown, slug }) {
    state.markdown = markdown
    state.currentSlug = slug
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
  [types.SET_RESPONSE](state, response) {
    Object.assign(state, response)
  },
}
