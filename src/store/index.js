
import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
	plugins: [createPersistedState({ storage: window.sessionStorage })]
})

export default store
