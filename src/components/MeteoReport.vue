<template>
 <div>
    <div class="row">
     <div class="col">
            <Meteo></Meteo>
      </div>
      <div class="col d-none d-sm-block">
        <UV>  </UV>
        </div>
        
    </div>
    <div class="row mb-1">
            <Report></Report>
    
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Meteo from './Meteo.vue'

import Report from './Report.vue'
import UV from './UV.vue'

export default {
  name: 'MeteoReport',
  components: {
    Meteo,
    Report,
    UV

  }
}
</script>
