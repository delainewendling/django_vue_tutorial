import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
//import * as getters from './getters';
//import * as mutations from './mutations';
Vue.use(Vuex)

const state = {
  token: null,
  isAuthenticated: true
}

const getters = {
    token: state => state.token,
    isAuthenticated: state => state.isAuthenticated
}

const mutations = {
    setUser(state, token) {
        state.token = token;
        state.isAuthenticated = true;
    }
}

const actions = {

}


export default new Vuex.Store({
  state,
  getters,
  mutations
})