<template>
  <div class="container mt-3">
    <div class="row mt-3">
        <div class="col">
             <router-link to="/report_storico">
         <button   id="im1"></button> 
           
                
        
          </router-link>
        </div>
        <div class="col">
            <router-link to="/">     <img src="../assets/menu_trasporti2.png" height="250px" width="300px">
    </router-link>
        </div>
        <div class="col">
            <router-link to="/"> <img src="../assets/storico.png"> </router-link>
        </div>
    </div>
     <div class="row mt-3">
        <div class="col">
            <router-link to="/"> <img src="../assets/storico.png"> </router-link>
        </div>
        <div class="col">
            <router-link to="/"> <img src="../assets/storico.png"> </router-link>
        </div>
        <div class="col">
            <router-link to="/"> <img src="../assets/storico.png"> </router-link>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Avanzato',

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
</style>
