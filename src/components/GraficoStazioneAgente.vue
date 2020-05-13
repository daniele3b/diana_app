<template>
    <div>
        GRAFICO STAZIONE AGENTE
        {{dati_stazione}}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "GraficoStazioneAgente",
    
    data(){
      return {
        dati_stazione : [],
        stat:'',
        agent:''
      }
    },

computed: {
    checkStazione () {
    return this.$store.getters.getStazione
  },
  checkAgente(){
    return this.$store.getters.getAgente
  }
},

watch:{
    checkStazione(value) {
       this.stat=value
       this.updateData()
    },
    checkAgente(value)
    {
      this.agent=value
      this.updateData()
    }
},


beforeCreate(){

        this.stat=this.$store.getters.getStazione
        this.agent=this.$store.getters.getAgente
        
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
          this.dati_stazione=response.data
        
        })

        .catch((error) => {
         this.dati_stazione=[]
        })
     
    },
    methods:
    {
      updateData:function()
      {

        this.stat=this.$store.getters.getStazione
        this.agent=this.$store.getters.getAgente
        
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
        url: 'http://localhost:8081/chemical_agents/filter/date/'+year+'-'+month+'-'+day_start+'/'+year+'-'+month+'-'+day+'/type/'+this.agent+'/'+this.stat,
        headers: {
          "x-diana-auth-token": localStorage.token
        }})
        .then((response) => {
         this.dati_stazione=response.data
        })

        .catch((error) => {
          this.dati_stazione=[]
        })
      }

    }
    


}

</script>

<style scoped>



</style>