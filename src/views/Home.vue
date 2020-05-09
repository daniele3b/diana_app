<template>
 <div class="container-fluid" id="back" >
<div class="row mt-2 h-50" id="rigaesterna" height="200px">
  <div class="col-12">
 <div class="row">
 <div class="col-8">
    <div class="jumbotron text-black" id="hero">
            <h1 class="display-4"><b>Benvenuto su Diana!</b></h1>
            <p class="lead"><b>L'obiettivo è fornire ai cittadini ed alle province uno strumento utile alla lotta contro l'inquinamento.</b></p>
            <p><b>Uniti possiamo fare la differenza, unisciti anche te alla lotta!</b></p>
            
            <h6 >  <router-link to="/registration"> Registrati</router-link></h6>
           
        </div>
 </div>
 <div class="col mt-1">
      <img src="../assets/isola.png" height="300px" id="isola" >
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
#back{

  height: 700px;
  width:100%;
}
#rigaesterna{

    background-image:url('../assets/sfondo.png');
     background-size: cover;
     border:0;
     background-color: transparent;
}
#hero{

  background-color: transparent;
}


@keyframes lievitazione {
  5% {top:-0.3%;}
  10%   {top:-0.5%;}
  20%  {top:-0.6%;}
  30%  {top:-0.7%;}
  40% { top:-0.8%;}
  50% { top:-0.9%;}
  60% { top:-0.8%;}
  70% {top:-0.7%;}
  80% { top:-0.6%;}
  90% {top:-0.5%;}
  95% {top:-0.3%;}
  100% {top:-0.1%;}
}

#isola{
  position:relative;
 animation-name: lievitazione;
  animation-duration: 2.5s;
    animation-iteration-count: infinite;
}


</style>