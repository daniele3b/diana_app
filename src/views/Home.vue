<template>
 <div class="container-fluid">
<div class="row" id="rigaesterna">
  <div class="row " id="rigainterna">
    <div class="col-12">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="../assets/slide1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../assets/slide1.jpg"  alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="../assets/slide1.jpg"  alt="Third slide">
              </div>
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

#rigaesterna{
  background-color: black;
}
</style>