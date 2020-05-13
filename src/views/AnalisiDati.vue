<template>
 
 <div class="container">
     <div class="row">
       <div class="col">
          <MenuGrafici> </MenuGrafici>
         </div>
         <div v-if="getAgente!=''&&getStazione==''" class="col">
            <GraficoAgente></GraficoAgente>
           </div>


          <div v-if="getAgente==''&&getStazione!=''" class="col">
            <GraficoStazione></GraficoStazione>
          </div>


          <div v-if="getAgente!=''&&getStazione!=''" class="col">
            <GraficoStazioneAgente></GraficoStazioneAgente>
          </div>
       </div>
     </div>
</template>

<script>
// @ is an alias to /src

import MenuGrafici from '../components/MenuGrafici.vue'
import GraficoAgente from '../components/GraficoAgente.vue'
import GraficoStazione from '../components/GraficoStazione.vue'
import GraficoStazioneAgente from '../components/GraficoStazioneAgente.vue'

import {mapMutations, mapGetters} from 'vuex' 

export default {
  name: 'AnalisiDati',
  components:{
    MenuGrafici,
    GraficoAgente,
    GraficoStazione,
    GraficoStazioneAgente
  },


  computed : {
      ...mapGetters([
        'getStazione',
        'getAgente'
      ])
    },

    methods : {
      
      ...mapMutations([
        'setStazione',
        'setAgente'
      ]),
    }
}
</script>

