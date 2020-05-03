<template>
  <div class="card">
    <div class="card-body">
          <div class = "card-img-top ml-3">
            <GmapMap
              :center="{lat:41.9109, lng:12.6818}"
              :zoom="9"
              map-type-id="terrain"
              style="width: 400px; height: 300px"
            >

              <GmapMarker
                :key = sensor.lat
                  v-for="sensor in sensors" 
                  :position="google && new google.maps.LatLng(sensor.lat, sensor.lng)"
                  :clickable="true"
                  :animation= google.maps.Animation.DROP
              />
          
           
          </GmapMap>
          </div>

        <hr>

        <div class="row">ALTRA RIGA</div>
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
      info : [],
      sensors : [],
      clicked : false
    }
  },

  beforeCreate(){

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
          
      },
    
    methods : {
      click(){
        console.log('CLICKED ON MARKER!')
      }
    }
    
  }

</script>



<style scoped>

</style>