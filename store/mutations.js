import types from './types'
export default {
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
  [types.SET_HEADING](state, heading) {
    state.heading = heading
  },
  [types.SET_CONTENTS_LIST](state, contentsList) {
    state.contentsList = contentsList
  },
}
