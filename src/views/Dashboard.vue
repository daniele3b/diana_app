<template>
<div >
  <div class="container-fluid mt-3 d-none d-sm-block">
    <div class="row  ">
      <div class="col-6 ml-5">
        <MeteoReport></MeteoReport>
        </div>
        <div class="col mr-5">
          <Map></Map>
        </div>
      </div>
      </div>
      <!-- layout cell -->
      <div class="container-fluid mt-3 d-block d-sm-none">
      <div class="row ">

    <div class="col">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="100000">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <Map> </Map>
    </div>
    <div class="carousel-item">
    <Report> </Report>
    </div>
    <div class="carousel-item">
    <Meteo> </Meteo>
    </div>

      <div class="carousel-item">
    <UV></UV>
    </div>
    
    
  </div>

    </div>

      </div>
      </div>
            <a class="carousel-control-prev bg-success" href="#carouselExampleControls"  style="height:50px;position:absolute;top:50%;" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next bg-success" href="#carouselExampleControls"  style="height:50px;position:absolute;top:50%;" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MeteoReport from '../components/MeteoReport.vue'
import Map from '../components/Map.vue'
import Report from '../components/Report.vue'
import Meteo from '../components/Meteo.vue'
import UV from '../components/UV.vue'

export default {
  name: 'Dashboard',
  components: {
    MeteoReport,
    Map,
    Report,
    Meteo,
    UV
  }
}
</script>
