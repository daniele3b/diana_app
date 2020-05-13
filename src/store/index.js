import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    token : "",
    type : "",
    menuclicked:false,
    statomenu:"",
    stazione:"",
    agente:""
  },
  getters: {
    getStazione: state=>{
      return state.stazione
    },
    getAgente: state =>{
      return state.agente
    },
    getLogged: state => {
      return state.logged
    },
    getStatoMenu: state => {
      return state.statomenu
    },
    getMenu: state => {
      return state.menuclicked
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
    setAgente: (state,val)=>
    {
      state.agente=val
    },
    setStazione: (state,val)=>
    {
      state.stazione=val
    },

    setToken: (state, token)=> {
      state.token = token
    },

    setType: (state, type)=> {
      state.type = type
    },
    setMenu: (state, menu)=> {
      state.menuclicked = menu
    },
    setStatoMenu: (state, menu)=> {
      state.statomenu= menu
    }
  },
  actions: {
    
  },
  modules: {
  }
})
