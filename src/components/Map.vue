<template>
  <div class="card">

    <!--  SOLO OPERATORI E ADMIN HANNO ACCESSO AL TRAFFICO AEREO  -->
    <span v-if="userType!='cittadino'"> <img @click="planeClicked" src="../assets/aereoNero.png"  :class="imgClass" style="width:30px; float:right;"></span>

    <div class="card-body">
    
      <div class = "card-img-top">
        <!--  MAPPA  -->
          
          <center>
            
            <GmapMap
              class = "mappa"
              :center="{lat:latMap, lng:lngMap}"
              :zoom="zoomMap"
              map-type-id="terrain"
              style="width: 420px; height: 320px"
            >

              <!--  MARKER SENSORI  -->
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

              <!--  MARKER AEREI  -->
              <GmapMarker
                :key = plane.icao
                v-for="plane in planes"
                :id = "plane.lat+';'+plane.lng"
                :position="google && new google.maps.LatLng(plane.lat, plane.lng)"
                :clickable="false"
                :icon="{ url: require('../assets/aereoVerde.png')}"
                :visible = "planeVisible"
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
          
          <!--  INFO AGENTI CHIMICI DEL SENSORE CLICCATO  -->
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
      userType : '',
      info : [],
      sensors : [],
      markerClicked : false,
      text : null,
      currentSensorsInfo : [],
      clickedSensor : {},
      avgs : [],
      linkImg : "",
      immagineSogliaImpostata : false,
      planeVisible : false,
      planes : [],
      imgClass : 'imgNonEvidenziata mt-1 mr-1',
      latMap : 41.9109,
      lngMap : 12.6818,
      zoomMap : 9
    }
  },

  created(){
    this.userType = localStorage.type

    // PRENDO I DATI SUL TRAFFICO AEREO IN TEMPO REALE

      axios({
        method: 'get',
        url: 'http://localhost:8081/air_traffic',
        headers: {
          "x-diana-auth-token": localStorage.token
        }
      })
      .then((response) => {

        const dim = response.data.length

        let i
        for(i=0;i<dim;i++){
          this.planes.push({
            icao : response.data[i].icao,
            lat : response.data[i].lat,
            lng : response.data[i].lon
          })
        }
      })
      .catch((error) => {
        this.imgClass='imgEvidenziataRossa mt-1 mr-1'
        console.log(error)
      })
  },

  mounted:
    function getDataFromSensors(){
      // PRENDO I DATI DEGLI AGENTI CHIMICI DA TUTTI I SENSORI E MI SALVO I SENSORI IN UN ARRAY A PARTE
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
        alert("[/chemical_agents] Dati non disponibili")
        console.log(error)
      })
          
    },
    
    methods : {

      // QUANDO CLICCO SUL SENSORE DOVRO' MOSTRARE I DATI DEGLI AGENTI CHIMICI RELATIVI A QUEL SENSORE
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

        // RECUPERO IL SENSORE CHE HO CLICCATO TRAMITE EVENT, IL QUALE MI FORNIRA' LATITUDINE E LONGITUDINE DEL SENSORE
        for(i=0;i<dim;i++){
          if(sensors[i].lat == lat && sensors[i].lng == lng){
            sensoreCliccato = sensors[i]
            this.clickedSensor = sensoreCliccato
            break
          }
        }

        // RECUPERO I DATI DEGLI AGENTI CHIMICI RELATIVI A TALE SENSORE
        const sensorsInfo = await this.receiveData(sensoreCliccato)
        
        if(sensorsInfo.length == 0){
          console.log("Errore nella ricezione dal server")
          return
        }

        // VERIFICO SE I VALORI DI CIASCUN AGENTE SONO SUPERIORI O INFERIORI ALLA MEDIA
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
        
        // SETTO LATITUDINE E LONGITUDINE DELLA MAPPA AI VALORI DEL SENSORE CLICCATO IN MODO DA CENTRARLO,
        // E APPLICO UN LEGGERO ZOOM RISPETTO AL 9 DI DEFAULT
        this.latMap = lat
        this.lngMap = lng
        this.zoomMap = 9.5
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
              alert("[/filter/avg] Nessun dato disponibile")
              reject(error)
            })
          
          })
          .catch((error) => {
            alert("[/current/:uid] Nessun dato disponibile")
            reject(error)
          })
        })
      },

      planeClicked(){
        if(this.planeVisible) this.imgClass='imgNonEvidenziata mt-1 mr-1'; 
        else if(!this.planeVisible && this.planes.length > 0) this.imgClass='imgEvidenziataVerde mt-1 mr-1'
        this.planeVisible = !this.planeVisible
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

.imgNonEvidenziata{ 
  cursor: pointer; 
}

.imgEvidenziataVerde{ 
  cursor: pointer;   /* Per mostrare la mano quando il cursore va sull'immagine dell'aereo */
  background-color :  rgba(7, 182, 7, 0.938)
}

.imgEvidenziataRossa{
  pointer-events: none; /* Per bloccare il click del mouse e altri eventi di stato o di cursore sull'immagine dell'aereo */ 
  background-color : red
}

</style>