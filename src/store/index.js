import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  markdown: '',
  theme: 'Light',
  fontSize: 2,
  themes: ['Light', 'Dark'],
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
})

export default store
