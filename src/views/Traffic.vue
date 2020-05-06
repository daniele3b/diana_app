<template>
  <div>
    <div class="row">

        <div class="col">
            <div class="row mt-3">
                <router-link to="/avanzato"><img src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;"></router-link>
            </div>
            
            <div class="row">
                <div class="btn-toolbar mt-3 ml-3" role="toolbar">
                    <div class="btn-group mr-2" role="group">
                        <button @click="indirizzoTrue=true; zonaTrue=false" type="button" class="btn btn-success">Indirizzo</button> 
                    </div>
                
                    <div class="btn-group mr-2" role="group">
                        <button @click="indirizzoTrue=false; zonaTrue=true" type="button" class="btn btn-success" style="width:90px">Zona</button>
                    </div>
  
                </div>
            </div>

        </div>

        <div class="col">
            
            <div class = "row mt-3">
                <input type="text" class="inserimento" v-model="indirizzoZona" :placeholder="placeholderIndirizzoZona" style="width:250px">
            </div>
            
            <div v-if="indirizzoTrue && !zonaTrue" class="row mt-2">
                <input type="number" class="inserimento" v-model="raggio" min="1" placeholder="Inserisci il raggio" style="width:250px">
            </div>
            
            <div class="row">
                <img @click="invia()" src="../assets/cerca.png" class="search mt-1" style="width:30px; heigth:30px; margin-left:110px">
            </div>
            
            
            
        </div>

        <div class="col">
        
            <table v-if="inviato && tempoViaggioCorrente > 0" class="table mt-3">
                <thead class="thead-light" id="head">
                    <tr>
                        <th scope="col">Velocità attuale</th>
                        <th scope="col">Velocità di flusso libero</th>
                        <th scope="col">Confidenza</th>
                        <th scope="col">Tempo di viaggio corrente</th>
                    </tr>
                </thead>
                <tbody id="body">
                    <tr>
                        <td>{{velocitaAttuale}}</td>
                        <td>{{velocitaFlussoLibero}}</td>
                        <td>{{confidenza}}</td>
                        <td>{{tempoViaggioCorrente}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    
        <!--  MAPPA CON IL SENSORE PIU' VICINO ALLA ZONA SPECIFICATA  -->
        
        <center>
        <GmapMap v-if="showNearestSensor"
            class = "mappa"
            :center="{lat:41.9109, lng:12.6818}"
            :zoom="9"
            map-type-id="terrain"
            style="width: 620px; height: 320px"
        >

        <GmapMarker
            :key = index
            v-for="(sensor, index) in sensorePiuVicino"
            :id = "sensor.coordinates.lat+';'+sensor.coordinates.lon"
            :position="google && new google.maps.LatLng(sensor.coordinates.lat, sensor.coordinates.lon)"
            :animation= google.maps.Animation.DROP
            :icon="{ url: require('../assets/markerSensore.png')}"
        />
           
        </GmapMap>
        </center>

        <!--  MAPPA CON I SENSORI ALL'INTERNO DEL CERCHIO CHE HA COME CENTRO L'INDIRIZZO SPECIFICATO  
              E COME RAGGIO IL RAGGIO SPECIFICATO  -->

        <center>
        <GmapMap v-if="showSensorsWithinRadius"
            class = "mappa"
            :center="{lat:41.9109, lng:12.6818}"
            :zoom="9"
            map-type-id="terrain"
            style="width: 620px; height: 320px"
        >

        <GmapMarker
            :key = index
            v-for="(sensor, index) in sensoriNelRaggio"
            :id = "sensor.coordinates.lat+';'+sensor.coordinates.lon"
            :position="google && new google.maps.LatLng(sensor.coordinates.lat, sensor.coordinates.lon)"
            :animation= google.maps.Animation.DROP
            :icon="{ url: require('../assets/markerSensore.png')}"
        />
           
        </GmapMap>
        </center>

  </div>    
</template>


<script>
import axios from 'axios'
import {gmapApi} from 'vue2-google-maps'

export default {
  name : "Traffic",

  computed: {
    google: gmapApi
  },

  data(){
    return {
      indirizzoZona : "",
      placeholderIndirizzoZona : "Inserisci la zona",
      raggio : undefined,
      indirizzoTrue : false,
      zonaTrue : true,
      velocitaAttuale : 0,
      velocitaFlussoLibero : 0,
      confidenza : 0,
      tempoViaggioCorrente : 0,
      inviato : false,
      sensorePiuVicino : [],
      sensoriNelRaggio : [],
      showNearestSensor : false,
      showSensorsWithinRadius : false
    }
  },

  watch : {
    indirizzoTrue : function(){
      if(this.indirizzoTrue && !this.zonaTrue) this.placeholderIndirizzoZona = "Inserisci l' indirizzo"
      else if(!this.indirizzoTrue && this.zonaTrue) this.placeholderIndirizzoZona = "Inserisci la zona"
    },

    zonaTrue : function(){
      if(this.indirizzoTrue && !this.zonaTrue) this.placeholderIndirizzoZona = "Inserisci l' indirizzo"
      else if(!this.indirizzoTrue && this.zonaTrue) this.placeholderIndirizzoZona = "Inserisci la zona"
    }
  },
  
  methods : {
    indirizzoZonaValidi(){
      if(this.indirizzoZona == "") return false 
      
      const indirizzoZona = this.indirizzoZona
      let i
      const dim = indirizzoZona.length
      for(i=0;i<dim;i++){
        if(!isNaN(parseInt(indirizzoZona[i])))
            return false
      }

      return true
    },

    raggioValido(){
      if(isNaN(this.raggio) || this.raggio <= 0) return false
      return true
    },

    invia(){
      if(!this.indirizzoZonaValidi()){
          if(this.indirizzoTrue && !this.zonaTrue) alert('Indirizzo inserito non valido')
          else if(!this.indirizzoTrue && this.zonaTrue) alert('Zona inserita non valida')
          return
      }

      this.inviato = true

      // L'OPERATORE AVRA' INFORMAZIONI SUL TRAFFICO IN TEMPO REALE DELL'INDIRIZZO O DELLA ZONA INSERITA

      axios({
        method: 'get',
        url: 'http://localhost:8081/traffic/'+this.indirizzoZona,
        headers: {
          "x-diana-auth-token": localStorage.token
        }
      })
      .then((response) => {
        this.velocitaAttuale = response.data[0].currentSpeed
        this.velocitaFlussoLibero = response.data[0].freeFlowSpeed
        this.confidenza = response.data[0].confidence.toFixed(2)
        this.tempoViaggioCorrente = response.data[0].currentTravelTime
      })
      .catch((error) => {
        console.log(error)
      })

      // SE L'OPERATORE INSERISCE UNA ZONA GLI VERRA' MOSTRATO IL SENSORE PIU' VICINO A QUELLA ZONA
      if(this.zonaTrue && !this.indirizzoTrue){
        this.sensoriNelRaggio = []
        this.sensorePiuVicino = []
        this.showNearestSensor = true
        this.showSensorsWithinRadius = false

        this.sensorePiuVicino = []

        axios({
          method: 'get',
          url: 'http://localhost:8081/traffic/'+this.indirizzoZona+'/sensor',
          headers: {
            "x-diana-auth-token": localStorage.token
          }
        })
        .then((response) => {
          this.sensorePiuVicino.push(response.data[0])
        })
        .catch((error) => {
          console.log(error)
        })
      }

      // SE L'OPERATORE INSERISCE UN INDIRIZZO E UN CERTO RAGGIO GLI VERRANNO MOSTRATI I SENSORI
      // ALL'INTERNO DI TALE RAGGIO A PARTIRE DA QUELL'INDIRIZZO
      else if(!this.zonaTrue && this.indirizzoTrue){
        if(!this.raggioValido()){
            alert('Raggio non valido')
            return
        }
        
        this.sensoriNelRaggio = []
        this.sensorePiuVicino = []
        this.showNearestSensor = false
        this.showSensorsWithinRadius = true

        axios({
          method: 'get',
          url: 'http://localhost:8081/traffic/'+this.indirizzoZona+'/sensor/'+this.raggio,
          headers: {
            "x-diana-auth-token": localStorage.token
          }
        })
        .then((response) => {
          this.sensoriNelRaggio = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      }

    }

  }

}
</script>

<style scoped>

.back{
    cursor: pointer;
}

.search{
    cursor: pointer;
}

.inserimento{
    border-radius: 5px;
    border-color: green;
    border-width: 1px;
}

#head{
    font-size: 15px;
}

#body{
    font-size: 15px;
}

</style>