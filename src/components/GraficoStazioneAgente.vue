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

 
        let data=new Date()

        let month=data.getMonth()+1
        let day=data.getDate()
        let year=data.getFullYear()

        let day_start=day-7
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day
        if(day_start<10)
          day='0'+day

      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/filter/date/'+year+'-'+month+'-'+day_start+'/'+year+'-'+month+'-'+day+'/type/'+this.$store.getters.getAgente+'/'+this.$store.getters.getStazione,
        headers: {
          "x-diana-auth-token": localStorage.token
        }})
        .then((response) => {
          console.log(response)
        })

        .catch((error) => {
          console.log(error)
        })
     
    },

    methods : {
      
    },
}

</script>

<style scoped>



</style>