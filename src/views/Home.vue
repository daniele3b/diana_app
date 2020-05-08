<template>
 <div class="container-fluid" id="back">
<div class="row mt-2" id="rigaesterna">
  <div class="col-12">
  <div class="row mt-1 mb-1 " id="rigainterna">
    <div class="col-12">
      
       <div class="jumbotron text-black" id="hero">
            <h1 class="display-4"><b>Benvenuto su Diana!</b></h1>
            <p class="lead"><b>L'obiettivo del progetto è quello di fornire ai cittadini ed alle province uno strumento utile alla lotta contro l'inquinamento.</b></p>
            <hr class="my-4">
            <p><b>Uniti possiamo fare la differenza, unisciti anche te alla lotta!</b></p>
            
            <h6 style="text-color:black;">  <router-link to="/registration"> Registrati</router-link></h6>
           
        </div>
            
          </div>
  </div>

</div>
  </div>
    


  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home'
}
</script>


<style scoped>

#hero{

    background-image:url('../assets/slide1.jpg');
     background-size: cover;
     border:0;
     background-color: transparent;
}
</style>