<template>
 <div class="container">
  <div class="row" >
    <div class="col-12 col-sm-8 col-md-6 col-lg-4" >
      <div class="card" onload="getReport();" >
        <!-- TABBED PANE BAR-->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item"><a class="nav-link" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="false" >Tempo Reale</a></li>
          <li class="nav-item"><a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="true">7 giorni</a></li>
         
        </ul>
        <!-- TABBED PANE CONTENT-->
        <div class="tab-content" id="myTabContent" >
          <div  id="tab1" class="tab-pane fade active" role="tabpanel active" aria-labelledby="tab1-tab">
            
            <div class="container" >

              <div class="row row-eq-height" >
                <div class="col-sm-6 col-6" style="padding-left:20px">
                  <div id="uno">
                    <!-- GIORNO -->
                    <img v-if="stato=='Clear' && notte==false" style="height:100%; width:100%;" src="../../images/sun.png" alt="">
                    <img v-if="stato=='Clouds' && notte==false" style="height:100%; width:100%;" src="../../images/cloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==false" style="height:100%; width:100%;" src="../../images/rain.png" alt="">
                    <!-- NOTTE -->
                    <img v-if="stato=='Clear' && notte==true" style="height:100%; width:100%;" src="../../images/moon.png" alt="">
                    <img v-if="stato=='Clouds' && notte==true" style="height:100%; width:100%;" src="../../images/mooncloud.png" alt="">
                    <img v-if="stato=='Rain' && notte==true" style="height:100%; width:100%;" src="../../images/moonrain.png" alt="">
                  </div>
                </div>
                <div class="col-sm-6 col-6" style="padding-left:0;">
                  <div id="due">
                    {{t_att}}°C
                  </div>
                  <div id="tre">
                    {{descrizione}}
                  </div>
                  <div id="tre">
                    Vento: {{wind}} km/h
                  </div>
                  <div id="tre">
                    Umidità: {{humidity}}%
                  </div>
                 </div>
            </div>
          </div>
            
          </div>
          <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
              Contenuto 2
          </div>
          
        </div>


      </div>
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Meteo',
    data() {
        return {
          notte: '',
          stato: '',
          descrizione: '',
          data: '',
          t_att: '',
          humidity: '',
          wind: ''
        }
    },

    mounted: 
      function getReport(){ 
          axios({
            method: 'get',
            url: 'http://localhost:8081/weather/report/last',
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 
            this.descrizione = response.data.descrizione
            this.data = response.data.data
            this.t_att = response.data.t_att
            this.humidity = response.data.humidity
            this.wind = response.data.wind

            var idx = response.data.descrizione.indexOf(',')
            this.stato = this.descrizione.substr(0,idx)
          

            var now = new Date()
            var hour = now.getHours()
            if(hour>=20 || hour <=6) this.notte=true
            else this.notte = false
            
            var desc = response.data.descrizione.substr(idx+2) 
            this.descrizione = desc.charAt(0).toUpperCase() + desc.slice(1)

          })
            .catch((error) => {
            alert("ewwew"+error)
          })
      }

}
</script>



<style scoped>

#uno{
  /*background-color: green;*/
  height: 140px;
  width: 140px;
}

#due{
  /*background-color: greenyellow;*/
  font-family: "Times New Roman", Times, serif;
  font-size: 34px;
}

#tre{
  /*background-color: red;*/
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

#tab1{
  padding-top:8px;
  
}

.container {
  width: 100%;
}

.card {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  width: 360px;
  height: 200px;
  background-image: url('../../images/immmeteo.jpg');
  
  
}

.iconaMeteo {
  width: 200px;
  height: 100px;
  padding-top: 0;
  /*background-color: red;*/
}

.temperatura{
  text-align: right;
}

.card-signin .card-title {
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem; 
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.my-4 {
  border : 1;
  border-color : grey;
}


</style>