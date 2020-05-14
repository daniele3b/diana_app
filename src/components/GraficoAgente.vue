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
                      <!-- SWITCH STAZIONI -->
                      <div style="text-align:left;">
                        <hr class="my-4">
                          Visualizza per stazione: <br> <br>
                          <div class="row">
                            <div class="col-sm-4">
                              Colleferro: <label class="switch"><input type="checkbox" checked> <span @click="changingVis=true; hidStations[0]=!hidStations[0]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Villa Ada: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[1]=!hidStations[1]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Guido: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[2]=!hidStations[2]" class="slider round"></span></label>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-4">
                              Francia: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[3]=!hidStations[3]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Cipro: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[4]=!hidStations[4]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Arenula: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[5]=!hidStations[5]" class="slider round"></span></label>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-4">
                              Guidonia: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[6]=!hidStations[6]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Cavaliere: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[7]=!hidStations[7]" class="slider round"></span></label>
                            </div>
                            <div class="col-sm-4">
                              Cinecittà: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[8]=!hidStations[8]" class="slider round"></span></label>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-4">
                              Malagrotta: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[9]=!hidStations[9]" class="slider round"></span></label>
                            </div>
                            <div class="col-md-8">
                              Fiumicino Villa Guglielmi: <label class="switch"><input type="checkbox"> <span @click="changingVis=true; hidStations[10]=!hidStations[10]" class="slider round"></span></label>
                            </div>
                          </div>
                          <hr class="my-4">
                      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
</template>

<script>

import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    name: "GraficoAgente",
    
    data(){
      return {
        changingVis : false,
        hidStations : [false,true,true,true,true,true,true,true,true,true,true],

        dati_stazione : ['ciao'],
        agente:'PM10',
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
        this.agent=value
        this.updateData()
      },
      changingVis: function(){
        if(this.changingVis == true){
          this.chartdata.datasets[0].hidden = this.hidStations[0]
          this.chartdata.datasets[1].hidden = this.hidStations[1]
          this.chartdata.datasets[2].hidden = this.hidStations[2]
          this.chartdata.datasets[3].hidden = this.hidStations[3]
          this.chartdata.datasets[4].hidden = this.hidStations[4]
          this.chartdata.datasets[5].hidden = this.hidStations[5]
          this.chartdata.datasets[6].hidden = this.hidStations[6]
          this.chartdata.datasets[7].hidden = this.hidStations[7]
          this.chartdata.datasets[8].hidden = this.hidStations[8]
          this.chartdata.datasets[9].hidden = this.hidStations[9]
          this.chartdata.datasets[10].hidden = this.hidStations[10]
          this.renderChart(this.chartdata, this.options)
          this.changingVis=false
        }
      }
    },
    mounted()
    {   
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
        this.renderChart(this.chartdata, this.options)
    },
    beforeCreate(){
        this.agente=this.$store.getters.getAgente
    }
}

</script>

<style scoped>
.card-signin {
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
  
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