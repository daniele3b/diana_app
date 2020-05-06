<template>
  <div class="card">
    
   
    
    <div class="card-body">
    
      <div class = "card-img-top">
        <!--  MAPPA  -->
           <a href="#"> <img src="../assets/aereoNero.png" style="width:30px; float:right;"></a>
          
          <center>
            
            <GmapMap
              class = "mappa"
              :center="{lat:41.9109, lng:12.6818}"
              :zoom="9"
              map-type-id="terrain"
              style="width: 420px; height: 320px"
            >
              <GmapMarker
                :key = index
                v-for="(sensor, index) in sensors"
                :id = "sensor.lat+';'+sensor.lng"
                :position="google && new google.maps.LatLng(sensor.lat, sensor.lng)"
                :clickable="true"
                :animation= google.maps.Animation.DROP
                :icon="{ url: require('../assets/markerSensore.png')}"
                @click="showInfoDetails"
              />
           
            </GmapMap>
          
          </center>

      </div>

        <!--  INFO SENSORE  -->
        
        <div v-if="markerClicked" class="row mt-4" id="infoSensori">

        

          <table class="table" id="tabella-info-sensori">
              
            <thead class="thead-light" id="header-1">
              <tr class = "headerSensorInfo">
                <th class="header" scope="col">Sensore</th>
                <th class="header" scope="col">UID</th>
                <th class="header" scope="col">Latitudine</th>
                <th class="header" scope="col">Longitudine</th>
              </tr>
            </thead>
              
            <tbody class = "bodySensorInfo">
              <tr>
                <td class="data"> {{clickedSensor.sensor}} </td>
                <td class="data"> {{clickedSensor.uid}} </td>
                <td class="data"> {{clickedSensor.lat}} </td>
                <td class="data"> {{clickedSensor.lng}} </td>
              </tr>
              
            </tbody>
            
          </table>

        </div>
        
        <center>

          <div v-if="markerClicked" class="table-responsive" id="mytable">
 
            
            <table class="table" >
              
              <thead class="thead-light" id="header-2">
                <tr class = "headerChemicalAgentInfo">
                  <th class="header" scope="col">Tipo</th>
                  <th class="header" scope="col">Valore</th>
                  <th class="header" scope="col">Media</th>
                  <th class="header" scope="col">Criticità</th>
                </tr>
              </thead>
              
              <tbody>
                <tr  class = "bodyChemicalAgentInfo" v-for="chemical_agent in currentSensorsInfo" :key="chemical_agent.types">
                  <td class="data">{{chemical_agent.types}}</td>
                    <td class="data">{{chemical_agent.value}}</td>
                    <td class="data">{{chemical_agent.avg}}</td>
                    <td class="data" v-if="chemical_agent.sogliaSuperata"><img src="../assets/rosso.jpg" style="height=15px; width:15px"></td>
                    <td class="data" v-else><img src="../assets/verde.jpg" style="height=15px; width:15px"></td>
                  </tr>
              </tbody>
            </table>
            
  
          </div>
        </center>
    </div>
  </div>

</template>



<script>
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'

export default {
  name : "Map",

  computed: {
    google: gmapApi
  },


  data () {
    return {
      info : [],
      sensors : [],
      markerClicked : false,
      text : null,
      currentSensorsInfo : [],
      clickedSensor : {},
      avgs : [],
      linkImg : "",
      immagineSogliaImpostata : false
    }
  },

  mounted:
    function getDataFromSensors(){
      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents',
        headers: {
          "x-diana-auth-token": localStorage.token
        }
      })
      .then((response) => {
        let i=0
        const dim = response.data.length
        for(i=0;i<dim;i++){ 
          const toPush = {
            value : response.data[i].value,
            type : response.data[i].types
          }

          if(!this.info.includes(toPush)) this.info.push(toPush)

          if(!this.sensors.includes(response.data[i])){
            this.sensors.push({
              sensor : response.data[i].sensor,
              uid : response.data[i].uid,
              lat : response.data[i].lat,
              lng : response.data[i].long
            })
          }
        }
      })
      .catch((error) => {
          console.log(error)
      })
          
    },
    
    methods : {
      showInfoDetails : async function(event){
        this.markerClicked = true
        this.currentSensorsInfo = []

        this.text = JSON.stringify(event.latLng)
        const lat = JSON.parse(this.text).lat
        const lng = JSON.parse(this.text).lng
        
        const sensors = this.sensors
        const dim = sensors.length
        let i
        let sensoreCliccato 

        //C'E' UNA FUNZIONE FATTA APPOSTANON ITERARE A CASO (FILTER) oppure findIndex
        for(i=0;i<dim;i++){
          if(sensors[i].lat == lat && sensors[i].lng == lng){
            sensoreCliccato = sensors[i]
            this.clickedSensor = sensoreCliccato
            break
          }
        }

        const sensorsInfo = await this.receiveData(sensoreCliccato)
        
        if(sensorsInfo.length == 0){
          console.log("Errore nella ricezione dal server")
          return
        }

        const size = sensorsInfo.length
        for(i=0;i<size;i++){
          if(sensorsInfo[i].value > sensorsInfo[i].avg){
            sensorsInfo[i].sogliaSuperata = true
          } 
          else{
            sensorsInfo[i].sogliaSuperata = false
          }
        }

        this.currentSensorsInfo = sensorsInfo
      },

      receiveData(sensoreCliccato){
        let sensorsInfo = []

        return new Promise(function(resolve, reject){
          axios({
            method: 'get',
            url: 'http://localhost:8081/chemical_agents/current/'+sensoreCliccato.uid,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          })
          .then((response) => {
            const data = response.data
            const dim = data.length
            let i
            for(i=0;i<dim;i++){
              sensorsInfo.push({
                value : data[i].value,
                types : data[i].types,
                sensor : data[i].sensor,
                lat : data[i].lat,
                long : data[i].long,
                avg : 0.0
              })
            }

            axios({
              method: 'get',
              url: 'http://localhost:8081/chemical_agents/filter/avg/'+sensoreCliccato.uid,
              headers: {
                "x-diana-auth-token": localStorage.token
              }
            })
            .then((response) => {
              let avgs = response.data
              const dim = avgs.length
              let i
              for(i=0;i<dim;i++){
                const size = sensorsInfo.length
                let j
                for(j=0;j<size;j++){
                  if(avgs[i].avg !== null && sensorsInfo[j].types == avgs[i].types){
                    sensorsInfo[j].avg = avgs[i].avg.toFixed(2)
                  }
                } 
              }

              resolve(sensorsInfo)
            })
            .catch((error) => {
              reject(error)
            })
          
          })
          .catch((error) => {
            reject(error)
          })
        })
      }
      
    },

}

</script>



<style scoped>

.bodyChemicalAgentInfo{
  font-size: 13px;
  text-align: center;
}

.headerChemicalAgentInfo{
  font-size: 15px;
  text-align: center;
}

.headerSensorInfo{
  font-size: 15px;
  text-align: center;
}

.bodySensorInfo{
  font-size: 13px;
  text-align: center;
}

#mytable{
  overflow-y: scroll;
  overflow-x: hidden;
  width: 410px;
  height: 160px;
}

.card{
  border-color: green;
}

</style>