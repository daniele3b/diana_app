<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Accedi</b></h5>
            <hr class="my-4">
            <form class="form-signin">
              <div class="form-label-group">
                <input type="text" id="inputEmailOrPhone" class="form-control" v-model="emailOrPhone" placeholder="Inserici l'indirizzo email o il telefono" required autofocus>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Inserisci la password" required>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Mantieni l'accesso</label>
              </div>

              <button v-if="readyEmail || readyPhone" @click="accedi()" type="button" class="btn btn-lg btn-success btn-block text-uppercase">Accedi</button>
              <hr class="my-4">
              
              <router-link to="/pw_forgotten">Hai dimenticato la password?</router-link>
              <br>
              <router-link to="/registration">Registrati</router-link>
              
              <div v-if="errorAuth != null" :class="colore" role="alert">
                  {{text}}
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'

export default {
    name: 'Login',
    data (){
      return {
        password : "",
        emailOrPhone : "",
        readyEmail : false,
        readyPhone : false,
        emailOk : false,
        passwordOk : false,
        phoneOk : false,
        errorAuth : null,
        text : "",
        colore : ""
      }
    },

    created(){
      if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
        localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
        localStorage.getItem('type') != undefined){
        
        this.$router.push('/about')
      }
    },

    watch : {
      password : function(){
        const len = this.password.length 
        if(len < 5 || len > 1024) {
          this.passwordOk = false
        }
        else
        this.passwordOk = true
      },

      emailOk : function(){
        if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
        }
      },

      phoneOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else{
          this.readyPhone = false
        }
      },

      passwordOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
          this.readyPhone = false
        }
      },

      emailOrPhone : function(){
        const tmp = this.emailOrPhone
        const len = tmp.length

        if(tmp[0] == '@' || tmp[len-1] == '@' || tmp[0] == '.' || tmp[len-1] == '.'){
          this.emailOk = false
          this.phoneOk = false  
        }

        else if(!this.validaEmail()){
          this.emailOk = false
          this.phoneOk = false
        }

        else if(this.cercaElem('@') > 1){
          this.emailOk = false
          this.phoneOk = false
        }
        else if(this.cercaElem('@') == 1 && this.cercaElem('.') == 0){
          this.emailOk = false
          this.phoneOk = false
        }

        else if(this.cercaElem('@') == 1 && this.cercaElem('.') > 0){
          this.emailOk = true
          this.phoneOk = false
        }

        else if(this.cercaElem('@') == 0){
          if(this.emailOrPhone.length == 10 && !isNaN(parseInt(this.emailOrPhone))){
            this.emailOk = false
            this.phoneOk = true
          }
          else{
            this.emailOk = false
            this.phoneOk = false
          }
        }
        
      }
    },

    computed : {
      ...mapGetters([
        'getToken',
        'getType',
        'getLogged'
      ])
    },

    methods : {
      
      ...mapMutations([
        'setLogged',
        'setToken',
        'setType'
      ]),

      cercaElem(elem){
        let i
        const emailOrPhone = this.emailOrPhone
        const dim = emailOrPhone.length
        let counter = 0
        for(i=0;i<dim;i++){
          if(emailOrPhone[i] == elem) counter++
        }
        return counter
      },

      validaEmail(){
        const emailOrPhone = this.emailOrPhone
        const dim = emailOrPhone.length
        let i
        for(i=0;i<dim;i++){
          if(i == 0 || i == dim - 1) continue
          else{
            if((emailOrPhone[i]=='@' && emailOrPhone[i+1]=='.') || (emailOrPhone[i]=='.' && emailOrPhone[i+1]=='@'))
              return false
          }
        }
        return true
      },
    
      async accedi() {
        
        // Controllo per vedere l'endpoint -> /auth/email o /auth/phone
        if(this.readyEmail){

          axios({
            method: 'post',
            url: 'http://localhost:8081/auth/email',
            data: {
              email: this.emailOrPhone,
              password: this.password
            }
          }).then((response) => {
            if(document.getElementById('customCheck1').checked){
              localStorage.email = this.emailOrPhone,
              localStorage.password = this.password,
              localStorage.token = response.data.token,
              localStorage.type = response.data.type
            }

            this.errorAuth = 'OK'
            this.text = "Accesso a Diana effettato con successo!"
            this.colore = "alert alert-success"
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setType', response.data.type)
            this.$store.commit('setLogged', true)
            this.$router.push('/about')
          })
            .catch((error) => {
              console.log(error)
              this.errorAuth = true
              this.colore = "alert alert-danger"
              this.text = "Email o password errati!"
            })
        }

        else if(this.readyPhone){
          axios({
            method: 'post',
            url: 'http://localhost:8081/auth/phone',
            data: {
              phone: this.emailOrPhone,
              password: this.password
            }
          }).then((response) => {
            if(document.getElementById('customCheck1').checked){
              localStorage.phone = this.emailOrPhone,
              localStorage.password = this.password,
              localStorage.token = response.data.token,
              localStorage.type = response.data.type
            }
            
            this.errorAuth = 'OK'
            this.text = "Accesso a Diana effettato con successo!"
            this.colore = "alert alert-success"
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setType', response.data.type)
            this.$store.commit('setLogged', true)

            this.$router.push('/about')
          })
            .catch((error) => {
              console.log(error)
              this.colore = "alert alert-danger"
              this.errorAuth = true
              this.text = "Telefono o password errati!"
            })
        }

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