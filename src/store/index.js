import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    token : "",
    type : ""
  },
  getters: {
    getLogged: state => {
      return state.logged
    },

    getToken : state => {
      return state.token
    },

    getType : state => {
      return state.type
    }
  },
  mutations: {
    setLogged: (state,val)=> {
      state.logged=val
    },

    setToken: (state, token)=> {
      state.token = token
    },

    setType: (state, type)=> {
      state.type = type
    }
  },
  actions: {
    
  },
  modules: {
  }
})
