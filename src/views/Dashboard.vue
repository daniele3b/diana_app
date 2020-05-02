<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col ml-5">
        <MeteoReport></MeteoReport>
        </div>
        <div class="col mr-5">
          <Map></Map>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MeteoReport from '../components/MeteoReport.vue'
import Map from '../components/Map.vue'


export default {
  name: 'Dashboard',
  components: {
    MeteoReport,
    Map,
  }
}
</script>
