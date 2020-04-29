import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false
  },
  getters: {
    getLogged: state => {
      return state.logged
    }
  },
  mutations: {
    setLogged: (state,val)=> {
      state.logged=val
    }
  },
  actions: {
  },
  modules: {
  }
})
