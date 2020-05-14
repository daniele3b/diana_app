<template>
    <div>
        
        <div v-for="(agente, index) in dati_stazione" :key = index>
            {{agente}}
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {mapMutations} from 'vuex'

export default {
    extends: Bar,

    name: "GraficoStazione",
    
    data(){
      return {
        dati_stazione : [],
        clicked : false,
        uidStazione : ""
      }
    },

    computed: {
      getStazione () {
        return this.$store.getters.getStazione
      },
    },

    watch:{
      getStazione(value) {
        this.uidStazione = value
        this.getDataFromStation()
      },
    },

    beforeCreate(){

      this.uidStazione = this.$store.getters.getStazione
      
      const oggi = new Date()
      
      let setteGiorniFa = new Date()
      setteGiorniFa.setDate(oggi.getDate() - 7) 

      let giorno = oggi.getDate()
      let mese = oggi.getMonth() + 1
      let anno = oggi.getFullYear()

      let giorno_inizio =  setteGiorniFa.getDate()
      let mese_inizio = setteGiorniFa.getMonth() + 1
      let anno_inizio = setteGiorniFa.getFullYear()
        
      if(mese < 10)
        mese = '0' + mese
      if(giorno < 10)
        giorno = '0' + giorno
      
      if(giorno_inizio < 10)
        giorno_inizio = '0' + giorno_inizio
      if(mese_inizio < 10)
        mese_inizio = '0' + mese_inizio

      const url = 'http://localhost:8081/chemical_agents/filter/date/'+this.$store.getters.getStazione+'/'+anno_inizio+
      '-'+mese_inizio+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno

      axios({
        method: 'get',
        url: url,
        headers: {
          "x-diana-auth-token": localStorage.token
        }
        
      })

      .then((response) => {
        let res = response.data

        let i
        const dim = res.length
        for(i=0;i<dim;i++){
          res[i].reg_date = res[i].reg_date.split('T')[0]
        }

        this.dati_stazione = res
      })

      .catch(() => {})
    },

    mounted(){
      //this.renderChart(data, options)
    },

    methods : {

      ...mapMutations([
        'setStazione'
      ]),

      getDataFromStation(){
        this.uidStazione = this.$store.getters.getStazione
      
      const oggi = new Date()
      
      let setteGiorniFa = new Date()
      setteGiorniFa.setDate(oggi.getDate() - 7) 

      let giorno = oggi.getDate()
      let mese = oggi.getMonth() + 1
      let anno = oggi.getFullYear()

      let giorno_inizio =  setteGiorniFa.getDate()
      let mese_inizio = setteGiorniFa.getMonth() + 1
      let anno_inizio = setteGiorniFa.getFullYear()
        
      if(mese < 10)
        mese = '0' + mese
      if(giorno < 10)
        giorno = '0' + giorno
      
      if(giorno_inizio < 10)
        giorno_inizio = '0' + giorno_inizio
      if(mese_inizio < 10)
        mese_inizio = '0' + mese_inizio

      const url = 'http://localhost:8081/chemical_agents/filter/date/'+this.$store.getters.getStazione+'/'+anno_inizio+
      '-'+mese_inizio+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno

      axios({
        method: 'get',
        url: url,
        headers: {
          "x-diana-auth-token": localStorage.token
        }
        
      })

      .then((response) => {
        let res = response.data

        let i
        const dim = res.length
        for(i=0;i<dim;i++){
          res[i].reg_date = res[i].reg_date.split('T')[0]
        }

        this.dati_stazione = res
      })

      .catch(() => {})
      },

      /*inArray(agente){
        let i
        const dim = this.dati_stazione.length

        const oggi = new Date()

        let mese = oggi.getMonth() + 1
        let giorno = oggi.getDate()
        let anno = oggi.getFullYear()

        let giorno_inizio = giorno - 7
        
        if(mese < 10)
          mese = '0' + mese
        if(giorno < 10)
          giorno = '0' + giorno
        if(giorno_inizio < 10)
          giorno_inizio = '0' + giorno_inizio

        for(i=0;i<dim;i++){
          console.log("UN ATTIMO")
        }
      }*/

    },
}

</script>

<style scoped>



</style>