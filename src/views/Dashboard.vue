<template>
  <div class="container-fluid mt-5">
    <div class="row">
        <div class="col-4">
            <Meteo> </Meteo>
        </div>
        <div class="col-1">
          </div>
        <div class="col-7">
            <Map></Map>>
        </div>
    </div>
    <div class="row" style="position:absolute; top:60%;">
      <div class="col">
        <Report></Report>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Meteo from '../components/Meteo.vue'
import Map from '../components/Map.vue'
import Report from '../components/Report.vue'

export default {
  name: 'Dashboard',
  components: {
    Meteo,
    Map,
    Report
  }
}
</script>
