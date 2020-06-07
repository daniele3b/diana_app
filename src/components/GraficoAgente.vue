<template>
    <div class="container">
      <div class="row">
       <div class="col-lg-12 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5  border-success">
            <div class="card-body">
                <h4>Agente {{agente}}</h4>
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
    name: "GraficoAgente",
    
    data(){
      return {

        dati_stazione : ['ciao'],
        agente:'PM10',

        datiValue: [[],[],[],[],[],[],[],[],[],[],[]],

        chartdata: {
            labels: [],
            datasets: [
              { label: 'Colleferro',
                data: [1,2,3,4,5,6,7],
                hidden: false,
                backgroundColor: "rgba(78, 240, 14, 0.2)",
                borderColor: "rgba(79, 207, 29, 1)",
                borderWidth: 1
              },
              { label: 'Villa Ada',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(229, 255, 0, 0.2)",
                borderColor: "rgba(195, 217, 0, 1)",
                borderWidth: 1
              },
              { label: 'Guido',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(255, 158, 0, 0.2)",
                borderColor: "rgba(173, 107, 0, 1)",
                borderWidth: 1
              },
              { label: 'Francia',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(245, 0, 255, 0.2)",
                borderColor: "rgba(155, 0, 161, 1)",
                borderWidth: 1
              },
              { label: 'Cipro',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(4, 0, 255, 0.2)",
                borderColor: "rgba(2, 0, 125, 1)",
                borderWidth: 1
              },
              { label: 'Arenula',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(166, 166, 166, 0.2)",
                borderColor: "rgba(71, 71, 71, 1)",
                borderWidth: 1
              },
              { label: 'Guidonia',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderColor: "rgba(138, 0, 0, 1)",
                borderWidth: 1
              },
              { label: 'Cavaliere',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(0, 255, 234, 0.2)",
                borderColor: "rgba(0, 156, 143, 1)",
                borderWidth: 1
              },
              { label: 'Cinecittà',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(255, 0, 98, 0.2)",
                borderColor: "rgba(115, 0, 44, 1)",
                borderWidth: 1
              },
              {label: 'Malagrotta',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(16, 117, 24, 0.2)",
                borderColor: "rgba(0, 71, 5, 1)",
                borderWidth: 1
              },
              { label: 'Fiumicino V. Guglielmi',
                data: [1,2,3,4,5,6,7],
                hidden: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
      }
    },
    computed: {
      checkAgente(){
        return this.$store.getters.getAgente
      }
    },

    watch:{
        checkAgente(value)
        {
            this.agente=value
            this.dati_stazione=[]
            this.datiValue= [[],[],[],[],[],[],[],[],[],[],[]];
         
         
                 
        const oggi = new Date()
      
        let setteGiorniFa = new Date()
        setteGiorniFa.setDate(oggi.getDate() - 7)

        let giorno = oggi.getDate()
        let mese = oggi.getMonth() + 1
        let anno = oggi.getFullYear()

        let giorno_inizio =  setteGiorniFa.getDate()
        let mese_inizio = setteGiorniFa.getMonth() + 1
        let anno_inizio = setteGiorniFa.getFullYear()

        if(giorno_inizio==31){
            giorno_inizio=1
             mese_inizio+=1
        }
        
        if(mese < 10)
          mese = '0' + mese
        if(giorno < 10)
          giorno = '0' + giorno
      
        if(giorno_inizio < 10)
          giorno_inizio = '0' + giorno_inizio
        if(mese_inizio < 10)
          mese_inizio = '0' + mese_inizio



            var url = 'http://localhost:8081/chemical_agents/filter/date/'+anno_inizio+'-'+mese_inizio+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno+'/type/'+this.agente
            
            axios({
              method: 'get',
              url: url,
              headers: {
                "x-diana-auth-token": localStorage.token
              }})
            .then((response) => {
              let app=response.data
              let i=0
              for(i=0;i<app.length;i++){
                let j=0
                let t=true
                let data=app[i].reg_date
                let res=data.split('T')
                app[i].reg_date=res[0]

                let sensor = app[i].sensor
                app[i].sensor = sensor
                
                for(j=0;j<this.dati_stazione.length;j++){
                    if(this.dati_stazione[j].reg_date==app[i].reg_date &&
                        this.dati_stazione[j].sensor==app[i].sensor){
                      t=false
                      break
                  }
                }
                if(t==true)
                this.dati_stazione.push(app[i])
              }
              //AGGIORNA CHARTDATA CON I DATI OTTENUTI
            for(i=0; i<this.dati_stazione.length;i++){
              if(this.dati_stazione[i].sensor=='Colleferro Europa, Roma, Lazio, Italy')this.datiValue[0].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Villa ada, Roma, Lazio, Italy')this.datiValue[1].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Guido, Roma, Lazio, Italy')this.datiValue[2].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Francia, Roma, Lazio, Italy')this.datiValue[3].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Cipro, Roma, Lazio, Italy')this.datiValue[4].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Arenula, Roma, Lazio, Italy')this.datiValue[5].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Guidonia, Roma, Lazio, Italy')this.datiValue[6].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Cavaliere, Roma, Lazio, Italy')this.datiValue[7].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Cinecitta\', Roma, Lazio, Italy')this.datiValue[8].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Malagrotta, Roma, Lazio, Italy')this.datiValue[9].push(this.dati_stazione[i].value)
              if(this.dati_stazione[i].sensor=='Fiumicino Villa Guglielmi, Roma, Lazio, Italy')this.datiValue[10].push(this.dati_stazione[i].value)
            }
            this.chartdata.datasets[0].data=this.datiValue[0]
            this.chartdata.datasets[1].data=this.datiValue[1]
            this.chartdata.datasets[2].data=this.datiValue[2]
            this.chartdata.datasets[3].data=this.datiValue[3]
            this.chartdata.datasets[4].data=this.datiValue[4]
            this.chartdata.datasets[5].data=this.datiValue[5]
            this.chartdata.datasets[6].data=this.datiValue[6]
            this.chartdata.datasets[7].data=this.datiValue[7]
            this.chartdata.datasets[8].data=this.datiValue[8]
            this.chartdata.datasets[9].data=this.datiValue[9]
            this.chartdata.datasets[10].data=this.datiValue[10]
            this.renderChart(this.chartdata, this.options)

            })
            .catch(() => {
              alert('Errore interno')
            })
        }
    },
    
    mounted()
    {   //GIORNI LABEL


        const oggi = new Date()
      
        let setteGiorniFa = new Date()
        setteGiorniFa.setDate(oggi.getDate() - 7)

        let giorno = oggi.getDate()
        let mese = oggi.getMonth() + 1
        let anno = oggi.getFullYear()

        let giorno_inizio =  setteGiorniFa.getDate()
        let mese_inizio = setteGiorniFa.getMonth() + 1
        let anno_inizio = setteGiorniFa.getFullYear()

        if(giorno_inizio==31){
            giorno_inizio=1
             mese_inizio+=1
        }
        
        if(mese < 10)
          mese = '0' + mese
        if(giorno < 10)
          giorno = '0' + giorno
      
        if(giorno_inizio < 10)
          giorno_inizio = '0' + giorno_inizio
        if(mese_inizio < 10)
          mese_inizio = '0' + mese_inizio

        var setteGiorni = []
        var i = 0
        for(i=0; i<=6;i++){
          var date = new Date();
          var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
          var day =last.getDate();
          var month=last.getMonth()+1;
          if(day < 10 ) day = '0'+day
          if(month < 10 ) month = '0'+month
          setteGiorni[6-i] = day+'/'+month
        }
        setteGiorni[6] = 'Oggi'
        
        this.agente=this.$store.getters.getAgente

        this.chartdata.labels = setteGiorni

        //GETDATA
        this.dati_stazione=[]
      
        

        var url = 'http://localhost:8081/chemical_agents/filter/date/'+anno_inizio+'-'+mese_inizio+'-'+giorno_inizio+'/'+anno+'-'+mese+'-'+giorno+'/type/'+this.agente

        axios({
          method: 'get',
          url: url,
          headers: {
            "x-diana-auth-token": localStorage.token
          }})
        .then((response) => {
          let app=response.data
          let i=0
          for(i=0;i<app.length;i++){
            let j=0
            let t=true
            let data=app[i].reg_date
            let res=data.split('T')
            app[i].reg_date=res[0]

            let sensor = app[i].sensor
            app[i].sensor = sensor

            for(j=0;j<this.dati_stazione.length;j++){
                if(this.dati_stazione[j].reg_date==app[i].reg_date &&
                    this.dati_stazione[j].sensor==app[i].sensor){
                  t=false
                  break
              }
            }
            if(t==true)
            this.dati_stazione.push(app[i])
          }
          //AGGIORNA CHARTDATA CON I DATI OTTENUTI
        for(i=0; i<this.dati_stazione.length;i++){
          if(this.dati_stazione[i].sensor=='Colleferro Europa, Roma, Lazio, Italy')this.datiValue[0].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Villa ada, Roma, Lazio, Italy')this.datiValue[1].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Guido, Roma, Lazio, Italy')this.datiValue[2].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Francia, Roma, Lazio, Italy')this.datiValue[3].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Cipro, Roma, Lazio, Italy')this.datiValue[4].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Arenula, Roma, Lazio, Italy')this.datiValue[5].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Guidonia, Roma, Lazio, Italy')this.datiValue[6].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Cavaliere, Roma, Lazio, Italy')this.datiValue[7].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Cinecitta\', Roma, Lazio, Italy')this.datiValue[8].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Malagrotta, Roma, Lazio, Italy')this.datiValue[9].push(this.dati_stazione[i].value)
          if(this.dati_stazione[i].sensor=='Fiumicino Villa Guglielmi, Roma, Lazio, Italy')this.datiValue[10].push(this.dati_stazione[i].value)
        }
        

        this.chartdata.datasets[0].data=this.datiValue[0]
        this.chartdata.datasets[1].data=this.datiValue[1]
        this.chartdata.datasets[2].data=this.datiValue[2]
        this.chartdata.datasets[3].data=this.datiValue[3]
        this.chartdata.datasets[4].data=this.datiValue[4]
        this.chartdata.datasets[5].data=this.datiValue[5]
        this.chartdata.datasets[6].data=this.datiValue[6]
        this.chartdata.datasets[7].data=this.datiValue[7]
        this.chartdata.datasets[8].data=this.datiValue[8]
        this.chartdata.datasets[9].data=this.datiValue[9]
        this.chartdata.datasets[10].data=this.datiValue[10]

        this.renderChart(this.chartdata, this.options)

        })
        .catch(() => {
          alert('Errore interno')
        })

        
    }
    
}

</script>

<style scoped>
.card-signin {
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}



.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(151, 148, 148);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 15px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(204, 248, 7);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: rgb(32, 196, 32);
}

input:checked + .slider:before {
  -webkit-transform: translateX(14px);
  -ms-transform: translateX(14px);
  transform: translateX(14px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 20px;
}

.switch {
  position: relative;
  display:inline-block;
  width: 35px;
  margin-top: 5px;
  margin-left: 5px;
  height: 20px;
}


</style>