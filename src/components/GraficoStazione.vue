<template>
    <div class="container">
      <div class="row">
       <div class="col-lg-12 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5  border-success">
            <div class="card-body">
                <h4>GRAFICO STAZIONE</h4>
                <hr class="my-4">
                
                <div>
                    <canvas
                        ref="canvas"
                        id="canvas"
                        class="bg"
                        width="400"
                        height="400">
                    </canvas>
                </div>
                      
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Line } from 'vue-chartjs'
import {mapMutations} from 'vuex'

export default {
    extends: Line,

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
        setteGiorniFa : null,

        chartdata: {
          labels: [],
          datasets: [
            {
              label: 'SO2',
              data: [1,2,3,4,5,6,7],
              hidden: false,
              backgroundColor: "rgba(78, 240, 14, 0.2)",
              borderColor: "rgba(79, 207, 29, 1)",
              borderWidth: 1
            },

            {
              label: 'PM10',
              data: [1,2,3,4,5,6,7],
              hidden: true,
              backgroundColor: "rgba(229, 255, 0, 0.2)",
              borderColor: "rgba(195, 217, 0, 1)",
              borderWidth: 1
            },

            {
              label: 'O3',
              data: [1,2,3,4,5,6,7],
              hidden: true,
              backgroundColor: "rgba(255, 158, 0, 0.2)",
              borderColor: "rgba(173, 107, 0, 1)",
              borderWidth: 1
            },

            {
              label: 'PM25',
              data: [1,2,3,4,5,6,7],
              hidden: true,
              backgroundColor: "rgba(245, 0, 255, 0.2)",
              borderColor: "rgba(155, 0, 161, 1)",
              borderWidth: 1
            },
          ]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
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
      

      let giorni = []
      let i
      for(i=0; i<=6;i++){
        let date = new Date();
        let last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
        let day = last.getDate();
        let month = last.getMonth() + 1;
        if(day < 10 ) day = '0' + day
        if(month < 10 ) month = '0' + month
        giorni[6-i] = day + '/' + month
      }
      giorni[6] = 'Oggi'  
        
      this.chartdata.labels = giorni

      const dim = this.dati_filtrati.length

  
      for(i=0;i<dim;i++){
        if(this.dati_filtrati[i].types == "SO2") this.chartdata.datasets[0].data[i] = this.dati_filtrati[i].value
        if(this.dati_filtrati[i].types == "PM10") this.chartdata.datasets[1].data[i] = this.dati_filtrati[i].value
        if(this.dati_filtrati[i].types == "O3") this.chartdata.datasets[2].data[i] = this.dati_filtrati[i].value
        if(this.dati_filtrati[i].types == "PM25") this.chartdata.datasets[3].data[i] = this.dati_filtrati[i].value
      }

      this.renderChart(this.chartdata, this.options)
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
          
          // Devo controllare che la differenza tra le due date sia < 7  :):)
          if(diff < 7){
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