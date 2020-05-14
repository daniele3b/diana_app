<template>

<div>

    <div>
  <canvas
      ref="canvas"
      id="canvas"
      class="bg"
      width="400"
      height="400">
      </canvas>
    </div>
    <div >
       {{dati_stazione}}
      </div>
      </div>
    
</template>

<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    name: "GraficoStazioneAgente",
    
    data(){
      return {
        dati_stazione : [],
        stat:'',
        agent:'',
         chartdata: {
      labels: ['AQI' ],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
      }
    },

computed: {
    checkStazione () {
    return this.$store.getters.getStazione
  },
  checkAgente(){
    return this.$store.getters.getAgente
  }
},

watch:{
    checkStazione(value) {
       this.stat=value
       this.updateData()
    },
    checkAgente(value)
    {
      this.agent=value
      this.updateData()
    }
},


beforeCreate(){

        this.stat=this.$store.getters.getStazione
        this.agent=this.$store.getters.getAgente
        
        let data=new Date()

        let month=data.getMonth()+1
        let day=data.getDate()
        let year=data.getFullYear()

        let day_start=day-7
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day
        if(day_start<10)
          day='0'+day

      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/filter/date/'+year+'-'+month+'-'+day_start+'/'+year+'-'+month+'-'+day+'/type/'+this.$store.getters.getAgente+'/'+this.$store.getters.getStazione,
        headers: {
          "x-diana-auth-token": localStorage.token
        }})
        .then((response) => {


        let app=response.data
        let i=0
        for(i=0;i<app.length;i++)
        {
          let j=0
          let t=true
          let data=app[i].reg_date
          let res=data.split('T')
          app[i].reg_date=res[0]
          for(j=0;j<this.dati_stazione.length;j++)
           {

              if(this.dati_stazione[j].reg_date==app[i].reg_date){
                t=false
                break
            }
           }

        if(t==true)
        this.dati_stazione.push(app[i])
                            

        }
         
        
        })

        .catch(() => {
         this.dati_stazione=[]
        })
     
    },

    mounted()
    {
       this.renderChart(this.chartdata, this.options)
    },
    methods:
    {
      updateData:function()
      {

        this.dati_stazione=[]
        this.stat=this.$store.getters.getStazione
        this.agent=this.$store.getters.getAgente
        
        let data=new Date()

        let month=data.getMonth()+1
        let day=data.getDate()
        let year=data.getFullYear()

        let day_start=day-7
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day
        if(day_start<10)
          day='0'+day

      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/filter/date/'+year+'-'+month+'-'+day_start+'/'+year+'-'+month+'-'+day+'/type/'+this.agent+'/'+this.stat,
        headers: {
          "x-diana-auth-token": localStorage.token
        }})
        .then((response) => {
         
        let app=response.data
        let i=0
        for(i=0;i<app.length;i++)
        {
          let j=0
          let t=true
          let data=app[i].reg_date
          let res=data.split('T')
          app[i].reg_date=res[0]
          for(j=0;j<this.dati_stazione.length;j++)
           {

              if(this.dati_stazione[j].reg_date==app[i].reg_date){
                t=false
                break
            }
           }

        if(t==true)
        this.dati_stazione.push(app[i])
                            

        }
        })

        .catch(() => {
          this.dati_stazione=[]
        })
      }

    }
    


}

</script>

<style scoped>



</style>