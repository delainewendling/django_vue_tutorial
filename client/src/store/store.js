import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'vue-cookie';
//import * as getters from './getters';
//import * as mutations from './mutations';
Vue.use(Vuex)

const state = {
  isAuthenticated: Cookies.get('csrftoken')
}

const getters = {
    isAuthenticated: state => state.isAuthenticated
}

export default new Vuex.Store({
  state,
  getters
})