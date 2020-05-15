<template>

 <div class="container">
      <div class="row">
       <div class="col-lg-12 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5  border-success">
            <div class="card-body">
 <h6><b>{{this.$store.getters.getNomeStazione}}</b></h6>
              <hr>
  <div>
  <canvas
      ref="canvas"
      id="canvas"
      class="bg"
      width="400"
      height="400">
      </canvas>
    </div>
    </div>
          </div>
       </div>
   
      </div>
      </div>
    
</template>

<script>
import axios from 'axios'
import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    name: "GraficoStazioneAgente",
    
    data(){
      return {
        dati_stazione : [],
        stat:'',
        agent:'',
      chartdata: {
      labels: [],
      datasets: [
        {
          label: 'AQI',
          data: [1,2,3,4,5,6,7],
          hidden: false,
          backgroundColor: "rgba(78, 240, 14, 0.2)",
          borderColor: "rgba(79, 207, 29, 1)",
          borderWidth: 1
        }
      ]
    },
    dati:[],
    options: {
      responsive: true,
      maintainAspectRatio: false,
       
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
        


        var setteGiorni = []
        var i = 0
        for(i=0; i<=6;i++){
          var date = new Date();
          var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
          var day =last.getDate();
          var month=last.getMonth()+1;
          if(day < 10 ) day = '0'+day
          if(month < 10 ) month = '0'+month
          setteGiorni[6-i] = day+'/'+month
        }
        setteGiorni[6] = 'Oggi'
        
  


        let data=new Date()




         month=data.getMonth()+1
         day=data.getDate()
        let year=data.getFullYear()

      let setteGiorniFa = new Date()
      setteGiorniFa.setDate(data.getDate() - 7) 
    
      let giorno_inizio =  setteGiorniFa.getDate()
      let mese_inizio = setteGiorniFa.getMonth() + 1
      let anno_inizio = setteGiorniFa.getFullYear()
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day

        if(giorno_inizio < 10)
          giorno_inizio = '0' + giorno_inizio
        if(mese_inizio < 10)
          mese_inizio = '0' + mese_inizio

      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/filter/date/'+anno_inizio+'-'+mese_inizio+'-'+giorno_inizio+'/'+year+'-'+month+'-'+day+'/type/'+this.$store.getters.getAgente+'/'+this.$store.getters.getStazione,
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

        if(t==true){
        this.dati_stazione.push(app[i])
        this.dati.push(app[i].value)
      
        }

        }
         
    
      this.chartdata.datasets[0].label=this.$store.getters.getAgente
       this.chartdata.datasets[0].data=this.dati
       this.chartdata.labels=setteGiorni
   
        console.log(this.chartdata.labels)
        console.log(this.chartdata.datasets[0].data)
         this.renderChart(this.chartdata, this.options)
      
        })

        .catch(() => {
         this.dati_stazione=[]
         alert('Nessun dato disponibile!')
        })


       
     
    },

   
    methods:
    {
      updateData:function()
      {


        
        var setteGiorni = []
        var i = 0
        for(i=0; i<=6;i++){
          var date = new Date();
          var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
          var day =last.getDate();
          var month=last.getMonth()+1;
          if(day < 10 ) day = '0'+day
          if(month < 10 ) month = '0'+month
          setteGiorni[6-i] = day+'/'+month
        }
        setteGiorni[6] = 'Oggi'

        this.dati=[]
        this.dati_stazione=[]
        this.stat=this.$store.getters.getStazione
        this.agent=this.$store.getters.getAgente
        
        let data=new Date()

         month=data.getMonth()+1
         day=data.getDate()
        let year=data.getFullYear()

        let setteGiorniFa = new Date()
      setteGiorniFa.setDate(data.getDate() - 7) 
    
      let giorno_inizio =  setteGiorniFa.getDate()
      let mese_inizio = setteGiorniFa.getMonth() + 1
      let anno_inizio = setteGiorniFa.getFullYear()
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day

        if(giorno_inizio < 10)
          giorno_inizio = '0' + giorno_inizio
        if(mese_inizio < 10)
          mese_inizio = '0' + mese_inizio


      axios({
        method: 'get',
        url: 'http://localhost:8081/chemical_agents/filter/date/'+anno_inizio+'-'+mese_inizio+'-'+giorno_inizio+'/'+year+'-'+month+'-'+day+'/type/'+this.agent+'/'+this.stat,
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

        if(t==true){
        this.dati_stazione.push(app[i])
        this.dati.push(app[i].value)
        }
                            

        }

         this.chartdata.datasets[0].label=this.$store.getters.getAgente
       this.chartdata.datasets[0].data=this.dati
       this.chartdata.labels=setteGiorni
   
        console.log(this.chartdata.labels)
        console.log(this.chartdata.datasets[0].data)
         this.renderChart(this.chartdata, this.options)
        })

        .catch(() => {
          this.dati_stazione=[]
           alert('Nessun dato disponibile!')
        })
      }

    }
    


}

</script>

<style scoped>



</style>