<template>
    <div>
        
        <div v-for ="(agente, index) in dati_stazione" :key="index">
          {{agente}} <br>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {

    name: "GraficoStazione",
    
    data(){
      return {
        dati_stazione : [],
      }
    },

    beforeCreate(){
    
      const url = 'http://localhost:8081/chemical_agents/current/'+this.$store.getters.getStazione

      axios({
        method: 'get',
        url: url,
        headers: {
          "x-diana-auth-token": localStorage.token
        }
        
      })

      .then((response) => {
        this.dati_stazione = response.data
      })
    },

    methods : {
      
    },
}

</script>

<style scoped>



</style>