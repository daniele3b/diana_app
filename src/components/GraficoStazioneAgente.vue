<template>
    <div>
        GRAFICO STAZIONE AGENTE
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "GraficoStazioneAgente",
    
    data(){
      return {
        dati_stazione : [],
      }
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
          console.log(response)
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