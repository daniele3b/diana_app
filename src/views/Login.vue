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
                <input type="text" id="inputEmailOrPhone" class="form-control" v-model="emailOrPhone" placeholder="Indirizzo email o telefono" required autofocus>
                <label for="inputEmail">Indirizzo email o telefono</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Password" required>
                <label for="inputPassword">Password</label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Mantieni l'accesso</label>
              </div>
              readyEMail : {{readyEmail}} readyPhone : {{readyPhone}}
              {{emailOrPhone}} {{password}}
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

import axios from 'axios'
import {mapMutations} from 'vuex'

export default {
    name: 'Login',
    data (){
      return {
        email : "",
        phone : "",
        password : "",
        emailOrPhone : "",
        readyEmail : false,
        readyPhone : false,
        emailOk : false,
        passwordOk : false,
        phoneOk : false
      }
    },

    watch : {
      email : function(){
        let i
        const dim = this.email.length
        let counter = 0
        if(this.email[0] == '@' || this.email[dim - 1] == '@') this.emailOk = false
        for(i=0;i<dim;i++){
          if(this.email[i] == '@' && counter == 0){
            counter++
          }
        }
        if(counter > 1) this.emailOk = false
        this.emailOk = true
      },

      phone : function(){
        if(this.phone.length != 10){
          this.phoneOk = false
        }
        this.phoneOk = true
      },

      password : function(){
        const len = this.password.length 
        if(len < 5 || len > 1024) {
          this.passwordOk = false
        }
        this.passwordOk = true
      },

      emailOk : function(){
        if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
          this.emailOrPhone = this.email
        }
        this.readyEmail = false
      },

      phoneOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
          this.emailOrPhone = this.phone
        } 
        this.readyPhone = false
      }
    },

    methods : {
      ...mapMutations([
        'setLogged'
      ]),
    
      async accedi() {
        // Controllo per vedere se /email o /phone
        if(this.emailOk && !this.phoneOk){
          const result = await axios.post('localhost:8081/auth/email', {
            body : {
              email : this.email,
              password : this.password
            }
          })
          if(!result) console.log('Errore....')
          console.log(result)
        }

        else if(!this.emailOk && this.phoneOk){
          const result = await axios.post('localhost:8081/auth/phone', {
            body : {
              phone : this.phone,
              password : this.password
            }
          })
          if(!result) console.log('Errore....')
          console.log(result)
        }

        // Settare a true la variabile logged nello store

      }
    },
}
</script>


<style scoped>

.card-signin {
  border: 0;
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
}


</style>