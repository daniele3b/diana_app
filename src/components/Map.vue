<template>
  <div class="card">
    <div class="card-body">
          <div class = "card-img-top ml-3">
            <!--  MAPPA  -->

            <GmapMap
              :center="{lat:41.9109, lng:12.6818}"
              :zoom="9"
              map-type-id="terrain"
              style="width: 400px; height: 300px"
            >
              <GmapMarker
                :key = index
                v-for="(sensor, index) in sensors"
                :id = "sensor.lat+';'+sensor.lng"
                :position="google && new google.maps.LatLng(sensor.lat, sensor.lng)"
                :clickable="true"
                :animation= google.maps.Animation.DROP
                @click="showInfoDetails"
              />
          
          
           
          </GmapMap>
          </div>

        <!--  INFO SENSORE  -->

        <div v-if="markerClicked" class="row">

          <table class="table">
              
            <thead>
              <tr>
                <th scope="col">Sensore</th>
                <th scope="col">UID</th>
                <th scope="col">Latitudine</th>
                <th scope="col">Longitudine</th>
              </tr>
            </thead>
              
            <tbody>
              <tr>
                <td> {{clickedSensor.sensor}} </td>
                  <td> {{clickedSensor.uid}} </td>
                  <td> {{clickedSensor.lat}} </td>
                  <td> {{clickedSensor.lng}} </td>
              </tr>
            </tbody>
            
          </table>
            
        <div class="row">
          <div class="table-responsive">
            <table class="table">
              
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Valore</th>
                  <th scope="col">Media</th>
                  <th scope="col">Criticità</th>
                </tr>
              </thead>
              
              <tbody>
                <tr v-for="chemical_agent in currentSensorsInfo" :key="chemical_agent.types">
                  <td>{{chemical_agent.types}}</td>
                    <td>{{chemical_agent.value}}</td>
                    <td>{{chemical_agent.avg}}</td>
                    <td>0</td>
                  </tr>
              </tbody>
            </table>
  
          </div>
        </div>

      </div>
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
      avgs : []
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
                    sensorsInfo[j].avg = avgs[i].avg
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

</style>