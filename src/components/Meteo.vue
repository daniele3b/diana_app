<template>
 <div class="container">
  <div class="row">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      <div class="card" onload="getReport();">
        <!-- TABBED PANE BAR-->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item"><a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Tempo Reale</a></li>
          <li class="nav-item"><a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">7 giorni</a></li>
         
        </ul>
        <!-- TABBED PANE CONTENT-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane p-4 fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab" >
            
            <div class="container">

              <div class="row row-eq-height">
                <div class="col-sm-6 col-8">
                  <div id="uno">
                    <img v-if="stato=='Clouds'" style="height:100%; width:100%;" src="../../images/cloud.png" alt="">
                    <img v-if="stato=='Clear'" style="height:100%; width:100%;" src="../../images/moon.png" alt="">
                  </div>
                </div>
                <div class="col-sm-6 col-6">
                  <div id="due">
                    <h2>{{t_att}}°C</h2>
                  </div>
                  <div id="tre">
                    Descrizione:{{descrizione}}
                  </div>
                  <div id="tre">
                    Ora:{{data}}
                  </div>
                  <div id="tre">
                    Umidità:{{humidity}}
                  </div>
                  <div id="tre">
                    Wind:{{wind}}
                  </div>
                 </div>
            </div>
          </div>
            
          </div>
          <div class="tab-pane p-4 fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
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
  height: 150px;
  width: 150px;
}

#due{
  background-color: greenyellow;
}

#tre{
  background-color: red;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.card {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 230px;
  background-image: url('../../images/immmeteo.jpg');
}

.iconaMeteo {
  width: 200px;
  height: 100px;
  padding-top: 0;
  background-color: red;
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