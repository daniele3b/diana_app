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

      const url = 'http://localhost:8081/chemical_agents/filter/date/'+this.$store.getters.getStazione+'/'+anno+'-'+mese+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno
      
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

      .catch(() => {})
    },

    mounted(){
      //this.renderChart(data, options)
    },

    beforeDestroy(){
      this.$store.commit('setStazione', "")
    },

    methods : {

      ...mapMutations([
        'setStazione'
      ]),

      getDataFromStation(){
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

        const url = 'http://localhost:8081/chemical_agents/filter/date/'+this.$store.getters.getStazione+'/'+anno+'-'+mese+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno
      
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
      }
    },
}

</script>

<style scoped>



</style>