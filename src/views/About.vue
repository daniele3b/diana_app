<template>
  <div class="about">
    <button @click="removeCredentials()" type="button" class="btn btn-sm btn-success btn-block text-uppercase">Logout</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "About",

  computed : {

  },

  methods : {
    removeCredentials(){
      this.$store.commit('setLogged', false)
      this.$store.commit('setToken', '')
      this.$store.commit('setType', '')
      
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.removeItem('password')
      localStorage.removeItem('type')

      this.$router.push('/')
    },

    ...mapMutations([
        'setLogged',
        'setToken',
        'setType'
      ])
  }
}
</script>