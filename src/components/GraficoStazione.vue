<template>
    <div>
        
        <div v-for="(agente, index) in dati_filtrati" :key = index>
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
        dati_filtrati : [],
        clicked : false,
        uidStazione : "",
        giorno : "",
        mese : "",
        anno: "",
        giorno_inizio : "",
        mese_inizio : "",
        anno_inizio : "",
        oggi : null,
        setteGiorniFa : null
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

      this.oggi = oggi
      this.setteGiorniFa = setteGiorniFa

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

      this.giorno = giorno
      this.mese = mese
      this.anno = anno
      this.giorno_inizio = giorno_inizio
      this.mese_inizio = mese_inizio
      this.anno_inizio = anno_inizio

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

        this.filtraDati()
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

        this.oggi = oggi
        this.setteGiorniFa = setteGiorniFa

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

        this.giorno = giorno
        this.mese = mese
        this.anno = anno
        this.giorno_inizio = giorno_inizio
        this.mese_inizio = mese_inizio
        this.anno_inizio = anno_inizio

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

          this.filtraDati()
        })

        .catch(() => {})
      },

      filtraDati(){

        const oggi = new Date()

        let giorno = oggi.getDate()
        let mese = oggi.getMonth() + 1
        let anno = oggi.getFullYear()
        
        if(mese < 10)
          mese = '0' + mese
        if(giorno < 10)
          giorno = '0' + giorno
      
        let i
        const dim = this.dati_stazione.length

        for(i=0;i<dim;i++){

          const anno_agente = this.dati_stazione[i].reg_date.split('-')[0]
          const mese_agente = this.dati_stazione[i].reg_date.split('-')[1]
          const giorno_agente = this.dati_stazione[i].reg_date.split('-')[2]

          const oggi = new Date(mese+'/'+giorno+'/'+anno)
          const dataRilevazione = new Date(mese_agente+'/'+giorno_agente+'/'+anno_agente)
          
          // differenza in tempo
          var timeDiff = Math.abs(oggi.getTime() - dataRilevazione.getTime());

          // differenza in giorni
          var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          
          // Devo controllare (per qualche motivo del cazzo) che la differenza tra le due date sia <= 7
          if(diff <= 7){
            const obj = {
              reg_date : this.dati_stazione[i].reg_date,
              types : this.dati_stazione[i].types
            }

            if(!this.inArray(obj)){
              this.dati_filtrati.push(this.dati_stazione[i])
            }
          }
        }
      },

      inArray(elem){
        let i
        const dati_filtrati = this.dati_filtrati
        const dim = dati_filtrati.length

        for(i=0;i<dim;i++){
          if(dati_filtrati[i].reg_date == elem.reg_date && dati_filtrati[i].types == elem.types) return true
        }
        return false
      }

    },
}

</script>

<style scoped>



</style>