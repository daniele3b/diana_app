<template>
    <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="card card-signin my-5 border-success mb-3">
          <div class="card-body">
              <div class="row">

                <div class="col">
                    STAZIONE:
                </div>
                  <div class="col">
                      
                      <select v-model=stazione style="text-align:left;" > 
                                    <option value="" >----------</option>
                                    <option :value=stat.uid v-for="stat in stations" :key=stat.uid>{{stat.name}} </option>

                        </select>
                    </div>
                </div>
                   <div class="row">
                         <div class="col">
                    AGENTE:
                </div>
                  <div class="col">
                    
                      <select v-model=agente style="text-align:left;" > 
                                    <option value="" >----------</option>
                                    <option :value=a v-for="a in agents" :key=a>{{a}} </option>

                        </select>
                    </div>
                </div>

                <div class="row">
                    
            
                  <div class="col">
                    
                     <button type="button" @click="settaStore()" class="bg-success text-white"> GRAFICA </button>
                    </div>
                </div>
                {{stazione}}
                {{agente}}
        
        
            
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
    name: 'Login',
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

        
      }
    }

}
</script>
<style scoped>

.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
  
}

.form-check-inline {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 0;
  margin-right: 0.75rem;
}

.form-control-mario {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario:focus {
  color: #495057;
  background-color: #fff;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control-mario-ver {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario-ver:focus {
  color: #495057;
  background-color: #cef5d8;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


.form-control-mario-errore{
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #721c24;
  background-color: #f8d7da;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario-errore:focus {
  color: #495057;
  background-color: #f8d7da;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-control-mario{
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
}

.select-control-mario-ver{
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
}

.select-control-mario-errore{
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  background-clip: padding-box;
  border: 1px solid ;
  border-radius: 0.25rem;
}

.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
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

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(151, 148, 148);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 23px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(204, 248, 7);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: rgb(32, 196, 32);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 20px;
}

.switch {
  position: relative;
  display:inline-block;
  width: 60px;
  margin-top: 10px;
  margin-left: 10px;
  height: 30px;
}


</style>