<template>
 <div class="container-fluid">
<div class="row mt-2" id="rigaesterna">
  <div class="col-12">
  <div class="row mt-1 mb-1 " id="rigainterna">
    <div class="col-12">
      <center>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block " src="../assets/slide1.jpg" alt="First slide">
                </div>
                <div class="carousel-item">
                  <img class="d-block " src="../assets/slide1.jpg" alt="Second slide">
                </div>
                <div class="carousel-item">
                  <img class="d-block " src="../assets/slide1.jpg" alt="Third slide">
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            </center>
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

#rigainterna{
  background-color: yellow;
}
</style>