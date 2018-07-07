import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
})

export default store
