<template>
    <div class="container">
      <div class="row">
       <div class="col-lg-12 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5  border-success">
            <div class="card-body">
                <h6><b>{{nomeStazione}}</b></h6>
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

export default {
    extends: Line,

    name: "GraficoStazione",
    
    data(){
      return {
        uidStazione : "",
        nomeStazione : "",

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

    mounted(){
      this.uidStazione = this.$store.getters.getStazione

      this.getDataFromStation()
    },

    methods : {

      getDataFromStation(){
        const dati_filtrati = []
        const dati = [[], [], [], []]  // [[SO2], [PM10], [O3], [PM25]]

        // PRENDO TUTTI I DATI SU UN CERTO SENSORE A PARTIRE DA SETTE GIORNI FA FINO A OGGI
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

          this.nomeStazione = res[0].sensor

          let i
          let dim = res.length
          for(i=0;i<dim;i++){
            res[i].reg_date = res[i].reg_date.split('T')[0]
          }

          // SALVO I DATI IN dati_stazione
          const dati_stazione = res
        
          // FILTRO I DATI PRENDENDO LA PRIMA OCCORRENZA DI CIASCUN TIPO DI AGENTE PER OGNI GIORNO
          dim = dati_stazione.length

          for(i=0;i<dim;i++){

            const anno_agente = dati_stazione[i].reg_date.split('-')[0]
            const mese_agente = dati_stazione[i].reg_date.split('-')[1]
            const giorno_agente = dati_stazione[i].reg_date.split('-')[2]

            const oggi = new Date(mese+'/'+giorno+'/'+anno)
            const dataRilevazione = new Date(mese_agente+'/'+giorno_agente+'/'+anno_agente)
          
            // Differenza in tempo
            var diffTempo = Math.abs(oggi.getTime() - dataRilevazione.getTime());

            // Differenza in giorni
            var diff = Math.ceil(diffTempo / (1000 * 3600 * 24));
          
            // Devo controllare che la differenza tra le due date sia < 7  :):)
            if(diff < 7){
              const obj = {
                reg_date : dati_stazione[i].reg_date,
                types : dati_stazione[i].types
              }

              if(!this.inArray(obj, dati_filtrati)){
                dati_filtrati.push(dati_stazione[i])
              }
            }
          }
        
        
        // SALVO IN LABELS GLI ULTIMI 7 GIORNI (OGGI INCLUSO) PER POTERLI PIAZZARE SULL?ASSE DELLE ASCISSE DEL GRAFICO
        let giorni = []
      
        for(i=0;i<=6;i++){
          let date = new Date();
          let last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
          let day = last.getDate();
          let month = last.getMonth() + 1;
          if(day < 10 ) day = '0' + day
          if(month < 10 ) month = '0' + month
          giorni[6-i] = day + '/' + month
        }
        giorni[6] = 'Oggi'  
        
        this.chartdata.labels = giorni   // SALVO IN LABELS
      
        // ASSEGNO I VALORI FILTRATI DI CIASCUN AGENTE A UN ARRAY DI ARRAY DI APPOGGIO
        dim = dati_filtrati.length
      
        for(i=0;i<dim;i++){
          if(dati_filtrati[i].types == "SO2")  dati[0].push(dati_filtrati[i].value)
          if(dati_filtrati[i].types == "PM10") dati[1].push(dati_filtrati[i].value)
          if(dati_filtrati[i].types == "O3")   dati[2].push(dati_filtrati[i].value)
          if(dati_filtrati[i].types == "PM25") dati[3].push(dati_filtrati[i].value)
        }

        // ASSEGNO CIASCUN ARRAY ALL'ARRAY DATA DELL'OGGETTO CORRISPONDENTE NEL DATASETS
        this.chartdata.datasets[0].data = dati[0]
        this.chartdata.datasets[1].data = dati[1]
        this.chartdata.datasets[2].data = dati[2]
        this.chartdata.datasets[3].data = dati[3]

        this.renderChart(this.chartdata, this.options)
      })

      .catch(() => {})
      },


      inArray(elem, arr){
        let i
        const dim = arr.length

        for(i=0;i<dim;i++){
          if(arr[i].reg_date == elem.reg_date && arr[i].types == elem.types) return true
        }
        return false
      }

    },
}

</script>

