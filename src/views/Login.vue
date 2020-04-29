<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
          <hr class="my-4">
            <h5 class="card-title text-center"><b>Accedi</b></h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="text" id="inputEmailOrPhone" class="form-control" placeholder="Indirizzo email o telefono" required autofocus>
                <label for="inputEmail">Indirizzo email o telefono</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                <label for="inputPassword">Password</label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Mantieni l'accesso</label>
              </div>
              <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Accedi</button>
              <hr class="my-4">
              
              <router-link to="/pw_forgotten">Registrati</router-link>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {mapMutations} from 'vuex'

export default {
    name: 'Login',
    data (){
      return {

      }
    },
    methods : {
      ...mapMutations([
        'setLogged'
      ]),
      
      /* email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()*/

      chechEmail(){
          if(!isNaN(parseInt(document.getElementById('inputEmailOrPhone ').value))) return false
          return true 
      }
    },
}
</script>