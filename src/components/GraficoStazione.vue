<template>
    <div>
        GRAFICO STAZIONE
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
    name: "GraficoStazione",
    
    data(){
      return {
        dati_stazione : [],
      }
    },

    computed : {
      ...mapGetters([
        'getStazione'
      ])
    },

    beforeCreate(){

      // VEDERE SE NEL LOCAL STORAGE C'E' L'ID DELLA STAZIONE

      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/current/9343',
        headers: {
          "x-diana-auth-token": localStorage.token
        }

        .then((response) => {
          
        })

        .catch((error) => {
          console.log(error)
        })
      })
    },

    methods : {
      
    },
}

</script>

<style scoped>



</style>