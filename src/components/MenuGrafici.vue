<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5 border-success mb-3">
          <div class="card-body">
        
        
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


import {mapMutations, mapGetters} from 'vuex'

export default {
    name: 'Login',
    data (){
      return {
 
      }
    },
      computed : {
      ...mapGetters([
        'getStazione',
        'getAgente'
      ])
    },

    methods : {
      
      ...mapMutations([
        'setStazione',
        'setAgente'
      ]),
    }

}
</script>


<style scoped>

.card-signin {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
  border: 1;
}

.my-4 {
  border : 1;
  border-color : grey;
}


</style>