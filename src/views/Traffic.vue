<template>
  <div class="container">
      
      <!-- PRIMA RIGA  --->

      <div class="row">

        <!-- PRIMA COLONNA PRIMA RIGA  --->

        <div class="col">
            <div class="row mt-3">
                <router-link to="/avanzato"><img src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;"></router-link>
            </div>
            
            <div v-if="!loading && inviato" class="row" style="margin-left:20px;">
                <b style="margin-top:10px; margin-left:4px">Indirizzo</b>
                <label class="switch">
                    <input type="checkbox">
                    <span @click="indirizzoTrue=!indirizzoTrue; zonaTrue=!zonaTrue" class="slider round"></span>
                </label>
                <b style="margin-top:10px; margin-left:8px">Area</b>
            </div>

        </div>

        <!-- SECONDA COLONNA PRIMA RIGA  --->

        <div class="col">
            
            <div v-if="!loading && inviato" class = "row mt-5">
                <input @keyup.enter="invia()" type="text" class="inserimento" v-model="indirizzoZona" :placeholder="placeholderIndirizzoZona" style="width:250px">
            </div>
            
            <div v-if="(!indirizzoTrue && zonaTrue) && (!loading && inviato)" class="row mt-2">
                <input @keyup.enter="invia()" type="number" class="inserimento" v-model="raggio" min="1" placeholder="Inserisci il raggio" style="width:250px">
            </div>

            <div v-if="!loading && inviato && error == 'indirizzoZona'" class="alert alert-danger" role="alert">
                {{messaggioErrore}}
            </div>

            <div v-if="!loading && inviato && error == 'raggio'" class="alert alert-danger" role="alert">
                {{messaggioErrore}}
            </div>
            
            <div v-if="!loading && inviato" class="row">
                <img @click="invia()" src="../assets/cerca.png" :class="classeLente" style="width:30px; heigth:30px; margin-left:110px">
            </div>
            
        </div>

      </div>

          
        <!--  CONTROLLI DI VARIO TIPO PER LA VISUALIZZAZIONE DEI CAMPI DI INSERIMENTO, DELLA LENTE E DELLO SWITCH  -->
        
        <div v-if="(!loading && !inviato) || loading" style="margin-top:180px margin-left:20px">
            <input @keyup.enter="invia()" type="text" class="inserimento"  v-model="indirizzoZona" :placeholder="placeholderIndirizzoZona" style="width:350px; height:35px">
        </div>

        <div v-if="(!indirizzoTrue && zonaTrue) && ((!loading && !inviato) || loading)" class="mt-2">
            <input @keyup.enter="invia()" type="number" class="inserimento" v-model="raggio" min="1" placeholder="Inserisci il raggio" style="width:350px; height:35px">
        </div>

        <div v-if="((!loading && !inviato) || loading) && error == 'indirizzoZona'" class="alert alert-danger" role="alert">
                {{messaggioErrore}}
        </div>

        <div v-if="((!loading && !inviato) || loading) && error == 'raggio'" class="alert alert-danger" role="alert">
                {{messaggioErrore}}
        </div>

        <div v-if="(!loading && !inviato)">
            <img @click="invia()" src="../assets/cerca.png" :class="classeLente" style="width:30px; heigth:30px;">
        </div>

        <div v-if="(!loading && !inviato)">
          <b>Indirizzo</b>
            <label class="switch">
                <input type="checkbox">
                    <span @click="indirizzoTrue=!indirizzoTrue; zonaTrue=!zonaTrue" class="slider round"></span>
            </label>
            <b style="margin-left:5px">Zona</b>
        </div>

        <!-- SECONDA RIGA  --->

        <div class="row mt-3">
          
          <center>

              <!-- SCRITTA DI CARICAMENTO  -->
              
              <div v-if="loading && showNearestSensor" class="col mt-4"><b>Caricamento in corso...</b></div>
              
              <!--  [N°1]SECONDA RIGA PRIMA COLONNA  -->

              <div class="col">

                  <!--  MAPPA CON IL MARKER INDICANTE L'INDIRIZZO SPECIFICATO  -->

                  <GmapMap v-if="!loading && showNearestSensor"
                      class = "mappa"
                      :center="{lat:41.9109, lng:12.6818}"
                      :zoom="9"
                      map-type-id="terrain"
                      style="width: 430px; height: 320px"
                  >

                  <GmapMarker
                      :key = index
                      v-for="(address, index) in coordinateIndirizzoZona"
                      :id = "address.lat+';'+address.lng"
                      :position="google && new google.maps.LatLng(address.lat, address.lng)"
                      :animation= google.maps.Animation.DROP
                      :icon="{ url: require('../assets/markerSensore.png')}"
                  />
           
                  </GmapMap>
              </div>
          </center>
          
          <center>
            
              <!-- SCRITTA DI CARICAMENTO  -->
          
              <div v-if="loading && showSensorsWithinRadius" class="col mt-4"><b>Caricamento in corso...</b></div>
          
              <!--  [N°2]SECONDA RIGA PRIMA COLONNA  -->

              <div class="col">

                  <!--  MAPPA CON I SENSORI ALL'INTERNO DEL CERCHIO CHE HA COME CENTRO LA ZONA SPECIFICATA  
                        E COME RAGGIO IL RAGGIO SPECIFICATO  -->
        
                  <GmapMap v-if="!loading && showSensorsWithinRadius"
                      class = "mappa"
                      :center="{lat:41.9109, lng:12.6818}"
                      :zoom="9"
                      map-type-id="terrain"
                      style="width: 430px; height: 320px"
                  >

                  <GmapMarker
                      :key = index
                      v-for="(sensor, index) in sensoriNelRaggio"
                      :id = "sensor.coordinates.lat+';'+sensor.coordinates.lon"
                      :position="google && new google.maps.LatLng(sensor.coordinates.lat, sensor.coordinates.lon)"
                      :clickable="true"
                      :animation= google.maps.Animation.DROP
                      :icon="{ url: require('../assets/markerSensore.png')}"
                      @click="showInfoDetails"
                  />
           
                  </GmapMap>
        

              </div>

          </center>

              <!--  SECONDA RIGA SECONDA COLONNA  -->

              <div class="col">
        
                  <center>

                      <!-- SCRITTA DI CARICAMENTO  -->
                      
                      <div v-if="loading" class="mt-4"><b>Caricamento in corso...</b></div>

                      <!--  CARD  -->
                      
                      <div v-if="inviato && !loading" class="card mt-1 border-success" style="width: 27rem;">
                          <div class="card-body">
                              <h5 class="card-title"><b>INFO TRAFFICO E SENSORI</b></h5>
                    
                                  <!--  NAV  -->
                                  
                                  <nav>
                                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">INFO TRAFFICO</a>
                                          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">INFO SENSORE</a>                            
                                      </div>
                                  </nav>
                    
                                  <!-- CONTENUTO  DEL NAV  -->

                                  <div class="tab-content" id="nav-tabContent">
                        
                                      <!--  INFO TRAFFICO  -->
                        
                                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                          <table class="table">
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
                                      
                                      <!--  INFO NEL RAGGIO A PARTIRE DALLA ZONA SPECIFICATA  -->
                        
                                      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                          
                                          <!-- INFO SENSORE CLICCATO SE L'OPERATORE CLICCA SUL MARKER  -->
                                          
                                          <div v-if="markerClicked && showSensorsWithinRadius" class="table-responsive" id="mytable">
                            
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
                                                          <td class="data"> {{clickedSensor.coordinates.lat}} </td>
                                                          <td class="data"> {{clickedSensor.coordinates.lon}} </td>
                                                      </tr>
              
                                                  </tbody>
            
                                              </table>
                                          </div>

                                          <!--  DATI SENSORE CLICCATO SE L'OPERATORE CLICCA SUL MARKER -->
                                          
                                          <div v-if="markerClicked && showSensorsWithinRadius" class="table-responsive" id="mytable">

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

                                          <!--  INFO NEL CASO IN CUI L'OPERATORE INSERISCE UN INDIRIZZO  -->
                                          
                                          <div v-if="showNearestSensor" class="table-responsive" id="mytable">
                                              
                                              <!-- INFO SENSORE PIU' VICINO  -->
                            
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
                                                          <td class="data"> {{sensorePiuVicino[0].sensor}} </td>
                                                          <td class="data"> {{sensorePiuVicino[0].uid}} </td>
                                                          <td class="data"> {{sensorePiuVicino[0].coordinates.lat}} </td>
                                                          <td class="data"> {{sensorePiuVicino[0].coordinates.lon}} </td>
                                                      </tr>              
                                                  </tbody>
            
                                              </table>
                                          </div>   

                                          <div v-if="showNearestSensor" class="table-responsive" id="mytable">

                                              <!--  DATI SENSORE PIU' VICINO  -->

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
                                                      <tr class = "bodyChemicalAgentInfo" v-for="chemical_agent in currentSensorsInfo" :key="chemical_agent.types">
                                                          <td class="data">{{chemical_agent.types}}</td>
                                                          <td class="data">{{chemical_agent.value}}</td>
                                                          <td class="data">{{chemical_agent.avg}}</td>
                                                          <td class="data" v-if="chemical_agent.sogliaSuperata"><img src="../assets/rosso.jpg" style="height=15px; width:15px"></td>
                                                          <td class="data" v-else><img src="../assets/verde.jpg" style="height=15px; width:15px"></td>
                                                      </tr>
                                                  </tbody>
                                              </table>

                                          </div>  

                                      </div>
                      
                                  </div>

                              </div>
            
                          </div>
            
                      </center>
                  
                  </div>
        
              </div>

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
      coordinateIndirizzoZona : [],
      placeholderIndirizzoZona : "Inserisci l' indirizzo",
      raggio : undefined,
      indirizzoTrue : true,
      zonaTrue : false,
      velocitaAttuale : 0,
      velocitaFlussoLibero : 0,
      confidenza : 0,
      tempoViaggioCorrente : 0,
      inviato : false,
      sensorePiuVicino : [],
      sensoriNelRaggio : [],
      showNearestSensor : false,
      showSensorsWithinRadius : false,
      loading : false,
      markerClicked : false,
      text : "",
      clickedSensor : "",
      latSensoreCliccato : "",
      lngSensoreCliccato : "",
      currentSensorsInfo : [],
      error : '',
      messaggioErrore : "",
      coloreSfondoLente : "",
      classeLente : "search mt-1"
    }
  },

  watch : {
    indirizzoTrue : function(){
      if(this.indirizzoTrue && !this.zonaTrue){
        this.inserimento = "Clicca per inserire una zona e un raggio"
        this.placeholderIndirizzoZona = "Inserisci l' indirizzo"
      } 
      else if(!this.indirizzoTrue && this.zonaTrue){
        this.inserimento = "Clicca per inserire un indirizzo"
        this.placeholderIndirizzoZona = "Inserisci la zona"
      } 
    },

    zonaTrue : function(){
      if(this.indirizzoTrue && !this.zonaTrue){
        this.inserimento = "Clicca per inserire una zona e un raggio"
        this.placeholderIndirizzoZona = "Inserisci l' indirizzo"
      } 
      else if(!this.indirizzoTrue && this.zonaTrue){
        this.inserimento = "Clicca per inserire un indirizzo"
        this.placeholderIndirizzoZona = "Inserisci la zona"
      } 
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

    controllaSwitch(){
      if(this.indirizzoTrue && !this.zonaTrue){
        this.indirizzoTrue = false
        this.zonaTrue = true
      }

      else if(!this.indirizzoTrue && this.zonaTrue){
        this.indirizzoTrue = true
        this.zonaTrue = false
      }
    },

    invia(){
      
      // Per dare l'effetto della pressione della lente
      this.classeLente = "searchWithbackGround mt-1"

      if(!this.indirizzoZonaValidi()){
          if(this.indirizzoTrue){
            this.error = 'indirizzoZona'
            this.messaggioErrore = "Indirizzo inserito non valido"
          }
          else if(!this.indirizzoTrue && this.zonaTrue){
            this.error = 'indirizzoZona'
            this.messaggioErrore = "Zona inserita non valida"
          }

          // Per dare l'effetto del rilascio della lente
          setTimeout(() => {this.classeLente = "search mt-1"}, 200)

          return
      }

      else if(this.zonaTrue && !this.indirizzoTrue){
        if(!this.raggioValido()){
            this.error = 'raggio'
            this.messaggioErrore = "Raggio inserito non valido"

            // Per dare l'effetto del rilascio della lente
            setTimeout(() => {this.classeLente = "search mt-1"}, 200)
            return
        }
      }

      this.coordinateIndirizzoZona = []

      this.error = ""
      this.inviato = true
      this.loading = true

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
        this.coordinateIndirizzoZona.push({
          lat : response.data[0].lat,
          lng : response.data[0].lon
        })
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        alert("L'indirizzo inserito non esiste!")
      })

      // SE L'OPERATORE INSERISCE UN INDIRIZZO GLI VERRANNO MOSTRATE LE INFO E I DATI 
      // DEL SENSORE PIU' VICINO A QUELL'INDIRIZZO
      
      if(!this.zonaTrue && this.indirizzoTrue){
        this.sensoriNelRaggio = []
        this.sensorePiuVicino = []
        this.showNearestSensor = true
        this.showSensorsWithinRadius = false

        axios({
          method: 'get',
          url: 'http://localhost:8081/traffic/'+this.indirizzoZona+'/sensor',
          headers: {
            "x-diana-auth-token": localStorage.token
          }
        })
        .then(async (response) => {
          this.sensorePiuVicino.push(response.data[0])

          const sensor = this.sensorePiuVicino[0]

          const sensorInfo = await this.receiveData(sensor)
          console.log(sensorInfo)
        
          if(sensorInfo.length == 0){
            console.log("Errore nella ricezione dal server")
            return
          }

          let i
          const size = sensorInfo.length
          for(i=0;i<size;i++){
            if(sensorInfo[i].value > sensorInfo[i].avg){
              sensorInfo[i].sogliaSuperata = true
            } 
            else{
              sensorInfo[i].sogliaSuperata = false
            }
          }

          this.currentSensorsInfo = sensorInfo 
        })
        .catch((error) => {
          console.log(error)
          alert("Errore sensore più vicino")
        })
      }

      // SE L'OPERATORE INSERISCE UNA ZONA E UN CERTO RAGGIO GLI VERRANNO MOSTRATI I SENSORI
      // ALL'INTERNO DI TALE RAGGIO A PARTIRE DA QUELLA ZONA
      else if(this.zonaTrue && !this.indirizzoTrue){
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
          alert("Nessun sensore trovato all'interno del raggio specificato")
        })
      }

      // Risetto le variabili dello switch al valore di default
      this.indirizzoTrue = true
      this.zonaTrue = false

      // Per dare l'effetto del rilascio della lente
      setTimeout(() => {this.classeLente = "search mt-1"}, 200)

    },

    showInfoDetails : async function(event){

        // SE L'OPERATORE HA INSERITO UNA ZONA E UN RAGGIO, VORRA' SAPER LE INFORMAZIONI E I DATI DI CIASCUN SENSORE QUANDO CLICCA SUL MARKER
        if(this.showSensorsWithinRadius){
          this.markerClicked = true

          this.text = JSON.stringify(event.latLng)
          const lat = JSON.parse(this.text).lat
          const lng = JSON.parse(this.text).lng
        
          const sensors = this.sensoriNelRaggio
          const dim = sensors.length
          let i
          let sensoreCliccato 

          for(i=0;i<dim;i++){
            if(sensors[i].coordinates.lat == lat && sensors[i].coordinates.lon == lng){

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
        }

        // SE L'OPERATORE HA INSERITO UN INDIRIZZO, VORRA' SAPER LE INFORMAZIONI E I DATI DEL SENSORE PIU' VICINO A QUELL'INDIRIZZO
        
        
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

.searchWithbackGround{
    cursor: pointer;
    background-color: green;
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

.switch {
  position: relative;
  display:inline-block;
  width: 60px;
  margin-top: 10px;
  margin-left: 10px;
  height: 30px;
}

/* The slider */
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
  height: 23px;
  width: 26px;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 20px;
}

</style>