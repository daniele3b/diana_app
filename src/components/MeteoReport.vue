<template>
 <div>
    <div class="row">
     
            <Meteo></Meteo>
        
    </div>
    <div class="row">
            <Report></Report>
    
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Meteo from './Meteo.vue'

import Report from './Report.vue'

export default {
  name: 'MeteoReport',
  components: {
    Meteo,
    Report,

  }
}
</script>
