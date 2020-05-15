<template>
    <div class="container">

      
        <div class="card card-signin my-5 border-success mb-3">
    
          <div class="card-body "  >
           <router-link to='/avanzato'><img src="../assets/back.png" style="height:20px;float:left;" @click="back"></router-link> <h5 class="card-title">Scegli i dati da graficare</h5>
            
             
              <div class="row ">
 
                     <div class="col align-self-start">
                      <select v-model=stazione style="text-align:left;" > 
                                    <option value="" >STAZIONE</option>
                                    <option :value=stat.uid v-for="stat in stations" :key=stat.uid>{{stat.name}} </option>

                        </select>
                        </div>
                </div>
                   <div class="row mt-2">
                    <div class="col align-self-start">
                      <select v-model=agente style="text-align:left;"> 
                                    <option value="" >AGENTE CHIMICO</option>
                                    <option :value=a v-for="a in agents" :key=a>{{a}} </option>
                        </select>
                        </div>
                   
                    </div>
                    <div class="row mt-2">
                        <div class="col align-self-start">
                           <button type="button" @click="settaStore()" class="bg-success text-white"> GRAFICA </button>
                        </div>
                    </div>
                    
                </div>
                
             
                    
                     
                
                </div>
           
            
        
       
      </div>
    

</template>


<script>


import {mapMutations, mapGetters} from 'vuex'
import axios from 'axios'

export default {
    name: 'MenuGrafici',
    data (){
      return {
          stations:[],
          agents:[],
          stazione:'',
          agente:''
 
      }
    },

    mounted()
    {
        axios({
                          url: 'http://localhost:8081/chemical_agents/',
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                      }).then((response) => { 

                          let app=response.data
                          let i=0
                          for(i=0;i<app.length;i++)
                          {
                              let j=0
                              let t=true
                            for(j=0;j<this.stations.length;j++)
                            {
                                if(this.stations[j].uid==app[i].uid&&this.stations[j].name==app[i].sensor){
                                    t=false
                                    break
                                }

                            }

                            if(t==true)
                            {
                                this.stations.push({uid:app[i].uid,name:app[i].sensor})

                            }

                            if(!this.agents.includes(app[i].types))
                            {

                                this.agents.push(app[i].types)
                            }

                          }
                        console.log(this.stations)
                        console.log(this.agents)

                      }).catch((error)=>{
                        console.log(error)

                      })
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
      settaStore: function()
      {
          
          this.$store.commit('setStazione',this.stazione)
          this.$store.commit('setAgente',this.agente)
          let i=0
          for(i=0;i<this.stations.length;i++)
          {
            if(this.stations[i].uid==this.stazione)
              this.$store.commit('setNomeStazione',this.stations[i].name)


          }

        
      },
      back: function()
      {
         this.$store.commit('setStazione','')
          this.$store.commit('setAgente','')
      }
    }

}
</script>
<style scoped>





.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}




.form-label-group input {
  height: auto;
  border-radius: 2rem;
}




</style>