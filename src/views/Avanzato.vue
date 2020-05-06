<template>
  <div class="container mt-3">
    <div class="row mt-3">
        <div class="col">
             <router-link to="/report_storico">
         <button   id="im1"></button> 
          </router-link>
        </div>
        <div class="col">
            <router-link to="/report_storico">
         <button   id="im2"></button> 
          </router-link>

        </div>
        <div class="col">
            <router-link to="/report_storico">
         <button   id="im3"></button> 
          </router-link>
        </div>
    </div>
     <div class="row mt-3">
        <div class="col-4 d-none d-sm-block">
          <router-link to="/report_storico">
         <button   id="im4"></button> 
          </router-link>
        </div>
        <div class="col d-block d-sm-none">
          <router-link to="/report_storico">
         <button   id="im4"></button> 
          </router-link>
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
</style>
