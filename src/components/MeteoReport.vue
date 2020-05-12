<template>
 <div>
    <div class="row">
     <div class="col p-0">
            <Meteo></Meteo>
      </div>
      <div class="col ml-4 ">
        <UV>  </UV>
        </div>
        
    </div>
    <div class="row mb-1">
      <div class="col p-0">
            <Report></Report>
      </div>
    
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
