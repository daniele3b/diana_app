<template>
  <div class="card" style="height:770px;width:470px">
    <div class="card-body">
      <div class="container">
        <div class="row" style=height:385px;>
          <GmapMap
            :center="{lat:41.9109, lng:12.6818}"
            :zoom="9"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
          <GmapMarker
            :key = sensor.lat
            v-for="sensor in sensors" 
            :position="google && new google.maps.LatLng(sensor.lat, sensor.lng)"
            :clickable="true"
            :draggable="true"
          />
          
           
          </GmapMap>
        </div>

        <hr>

        <div class="row" style=height:385px;>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'

export default {
  computed: {
    google: gmapApi
  },


  data () {
    return {
      center : {lat : 0.0, lng : 0.0},
      info : [],
      sensors : []
    }
  },

  beforeCreate(){

  },

  mounted:
    function getDataFromSensors(){
      console.log("MOUNTED -> DIM="+this.sensors.length)
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
              this.info.push({
                value : response.data[i].value,
                sensor : response.data[i].sensor,
                uid : response.data[i].uid,
                lat : response.data[i].lat,
                lng : response.data[i].long,
              })

              if(!this.sensors.includes(response.data[i])){
                this.sensors.push({
                  lat : response.data[i].lat,
                  lng : response.data[i].long
                })
              }
            }

          })
          .catch((error) => {
              console.log(error)
          })
          console.log(this.info)
          console.log(this.sensors)
      },
    
    methods : {
      trovato(arr, sensor){
        let dim = arr.length
        let i
        for(i=0;i<dim;i++){
          if(arr[i].lat == sensor[i].lat && arr[i].lng == sensor[i].long) return true
        }
        return false
      }
    }
    
    }

</script>



<style scoped>

</style>