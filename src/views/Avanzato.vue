<template>
<div>
  <!-- pc e schermi xl-->
  <div class="container mt-3 d-none  d-xl-block">
    <div class="row mt-3">
        <div class="col">
             <router-link to="/traffic">
         <button   id="im1"></button> 
          </router-link>
        </div>
        <div class="col">
            <router-link to="/analisidati">
         <button   id="im2"></button> 
          </router-link>

        </div>
        <div class="col">
            <router-link to="/announcements">
         <button   id="im3"></button> 
          </router-link>
        </div>
    </div>
     <div class="row mt-3">

        <div class="col-4  d-none d-sm-block">
          <router-link to="/esportadati">
         <button   id="im5"></button> 
          </router-link>
          </div>
  
        <div v-if="tipoUtente!='operatore'" class="col-4 d-none d-sm-block">
          <router-link to="/newoperatore">
         <button   id="im4"></button> 
          </router-link>
        </div>
    

           <div class="col-4">
        
          </div>
       
    </div>
    </div>
<!-- cellulari -->
  
  <div class="container mt-3 d-block d-sm-none">
        <div class="row mt-3">
        <div class="col">
             <router-link to="/traffic">
         <button   id="im1"></button> 
          </router-link>
        </div>
        <div class="col">
            <router-link to="/analisidati">
         <button   id="im2"></button> 
          </router-link>

        </div>
        <div class="col">
            <router-link to="/announcements">
         <button   id="im3"></button> 
          </router-link>
        </div>
    </div>
     <div class="row mt-3">


        <div class="col ">
          <router-link to="/esportadati ">
         <button   id="im5"></button> 
          </router-link>
        </div>
    </div>
      <div class="row mt-3">

  <div v-if="tipoUtente!='operatore'"  class="col ">
          <router-link to="/newoperatore">
         <button   id="im4"></button>  
          </router-link>
        </div>
        </div>
    </div>

<!-- cellulari leggermente più grandi/ tablet 7-8 pollici-->
     <div class="container mt-3 d-none d-sm-block d-md-none">
        <div class="row mt-3">
        <div class="col">
             <router-link to="/traffic">
         <button   id="im1"></button> 
          </router-link>
        </div>
        <div class="col">
            <router-link to="/analisidati">
         <button   id="im2"></button> 
          </router-link>

        </div>
        <div class="col">
            <router-link to="/announcements">
         <button   id="im3"></button> 
          </router-link>
        </div>
    </div>
     <div class="row mt-3">


        <div class="col ">
          <router-link to="/esportadati ">
         <button   id="im5"></button> 
          </router-link>
        </div>
     </div>
  
  
  <div class="row mt-3">

        <div v-if="tipoUtente!='operatore'"  class="col ">
                <router-link to="/newoperatore">
              <button   id="im4"></button>  
                </router-link>
         </div>
    </div>
 </div>


  <!-- tablet grandi -->

  <div class="container mt-3 d-none d-md-block d-lg-none">
        <div class="row mt-3">
        <div class="col">
             <router-link to="/traffic">
         <button   id="im1"></button> 
          </router-link>
        </div>
        <div class="col">
            <router-link to="/analisidati">
         <button   id="im2"></button> 
          </router-link>

        </div>
        <div class="col">
            <router-link to="/announcements">
         <button   id="im3"></button> 
          </router-link>
        </div>
    </div>
     <div v-if="tipoUtente!='operatore'"  class="row mt-3">


        <div class="col ">
          <router-link to="/esportadati ">
         <button   id="im5"></button> 
          </router-link>
        </div>
          
        <div  class="col ">
          <router-link to="/newoperatore">
         <button   id="im4"></button>  
          </router-link>
        </div>

           <div class="col-4">
        
          </div>    
    </div>
    <div v-else class="row mt-3">
        <div class="col-4 ">
          <router-link to="/esportadati ">
         <button   id="im5"></button> 
          </router-link>
        </div>
    </div>
    
    </div>


    
 
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters} from 'vuex'


export default {
  name: 'Avanzato',
  data(){
    return {
      tipoUtente:null
    }
  },
  created()
  {
    this.tipoUtente=localStorage.type

      this.$store.commit('setStazione','')
      this.$store.commit('setAgente','')
  },
  computed:{
...mapGetters({
        'getTipo':'getType'
    })
}
}
</script>

<style scoped>

#im1{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_trasporti.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im1:hover{
  background-image:url('../assets/menu_trasporti2.png');
   
    
}

#im2{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_analisi.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im2:hover{
  background-image:url('../assets/menu_analisi2.png');
   
    
}

#im3{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_annunci.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im3:hover{
  background-image:url('../assets/menu_annunci2.png');
   
    
}

#im4{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_ins.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im4:hover{
  background-image:url('../assets/menu_ins2.png');
   
    
}

#im5{

    height:250px;  
    width:300px;
    background-image:url('../assets/menu_dati.png');
     background-size: cover;
     border:0;
     background-color: transparent;

}

#im5:hover{
  background-image:url('../assets/menu_dati2.png');
   
    
}
</style>
