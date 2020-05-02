<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col">
            <Meteo> </Meteo>
        </div>
        <div class="col">
            <Map></Map>>
        </div>
    </div>
    <div class="row">
        <Report></Report>
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
