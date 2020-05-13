<template>
    <div>
        GRAFICO STAZIONE AGENTE
        {{dati_stazione}}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "GraficoStazioneAgente",
    
    data(){
      return {
        dati_stazione : [],
        stat:'',
        agent:''
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