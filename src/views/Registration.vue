
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
           <h5 class="card-title text-center"><b>Registrazione </b></h5>
            <hr class="my-4">
            <form class="form-signin">

            <h6 class="card-subtitle mb-2 text-muted text-left">Credenziali:</h6>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="text" v-model=name  id="inputName" :class="nameClass" placeholder="Nome" autofocus required>
                    </div>
                    <div class="col ">
                        <input type="text" v-model=surname id="inputSurname" :class="surnameClass" placeholder="Cognome" required>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="email" v-model=email id="inputEmail" :class="emailClass" placeholder="E-mail" required>
                    </div>
                    <div class="col">
                        <input type="text" v-model=phone id="inputPhone" :class="phoneClass" placeholder="Telefono" required>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password :class="passwordClass" placeholder="Password" required>
              </div>

              <div class="form-label-group"><br>
                <h6 class="card-subtitle mb-2 text-muted text-left">Data e luogo di nascita:</h6>
                <div class="form-inline">
                <select :class="dayClass" name="giorno" id="inputGiorno" v-model=day required > 
                    <option disabled value="" >GG</option>
                    <option v-for="i in 31" :key="i">{{i}}</option>
                </select>
                <pre> </pre>
                <select :class="monthClass" name="mese" id="inputMese" v-model=month required>
                    <option disabled value="">MM</option>  
                    <option v-for="i in 12" :key="i">{{i}}</option>                  
                </select>
                <pre> </pre>
                <select :class="yearClass" name="anno" id="inputAnno" v-model="year" required>
                    <option disabled value="">AAAA</option>
                    <option v-for="i in 115" :key="i">{{i+1905}}</option>
                </select>
                </div>
            </div>
                <div class="form-label-group">
                <input size="12" type="text" v-model="birthplace" id="inputLuogo" :class="birthplaceClass" placeholder="Comune di nascita" required>
            </div>

              

              <div class="form-label-group">
                  <h6 class="card-subtitle mb-2 text-muted text-left">Genere:</h6>
                  <div class="form-inline">
                    <input type="radio" value='M' v-model=sex name='sex' id="genereM" class="form-control"> <pre> </pre> M <pre> </pre>
                    <input type="radio" value='F' v-model=sex name='sex' id="genereF" class="form-control"> <pre> </pre> F
                  </div>
                
              </div>

              <div v-if="allerta" class="alert alert-danger" role="alert">
                Non hai inserito tutto!
              </div>
              
              <button  @click="regPost" class="btn btn-lg btn-success btn-block text-uppercase"  type="submit">Entra in Diana!</button>
              <hr class="my-4">
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Registration',
    data() {
        return {
            flaginseriti: false,
            name: '',
            nameOk: false,
            nameClass: 'form-control',
            surname:'',
            surnameOk:false,
            surnameClass: 'form-control',
            sex:'',
            sexOk:false,
            day:'',
            dayOk:false,
            dayClass: 'select-control-mario',
            month:'',
            monthOk:false,
            monthClass: 'select-control-mario',
            year:'',
            yearOk:false,
            yearClass: 'select-control-mario',
            birthplace:'',
            birthplaceOk:false,
            birthplaceClass: 'form-control',
            email:'',
            emailOk:false,
            emailClass: 'form-control',
            password:'',
            passwordOk:false,
            passwordClass: 'form-control',
            phone: '',
            phoneOk:false,
            phoneClass: 'form-control',
            allerta: false
        }
    },
    watch: {
        name: function(){
          if(this.name=='') this.nameOk = false
          else this.nameOk = true
        },
        surname: function(){
          if(this.surname=='') this.surnameOk = false
          else this.surnameOk = true
        },
        sex: function(){
          if(this.sex=='') this.sexOk = false
          else this.sexOk = true
        },
        day: function(){
          if(this.day=='') this.dayOk = false
          else this.dayOk = true
        },
        month: function(){
          if(this.month=='') this.monthOk = false
          else this.monthOk = true
        },
        year: function(){
          if(this.year=='') this.yearOk = false
          else this.yearOk = true
        },
        birthplace: function(){
          if(this.birthplace=='') this.birthplaceOk = false
          else this.birthplaceOk = true
        },
        email: function(){
          if(this.email=='') this.emailOk = false
          else this.emailOk = true
        },
        password: function(){
          if(this.password=='') this.passwordOk = false
          else this.passwordOk = true
        },
        phone: function(){
          if(this.phone=='') this.phoneOk = false
          else this.phoneOk = true
        },
        nameOk: function(){
          if(this.nameOk==true) this.nameClass = 'form-control-mario'
          else this.nameClass = "form-control-mario-errore"
        },
        surnameOk: function(){
          if(this.surnameOk==true) this.surnameClass = 'form-control-mario'
          else this.surnameClass = "form-control-mario-errore"
        },
        birthplaceOk: function(){
          if(this.birthplaceOk==true) this.birthplaceClass = 'form-control-mario'
          else this.birthplaceClass = "form-control-mario-errore"
        },
        emailOk: function(){
          if(this.emailOk==true) this.emailClass = 'form-control-mario'
          else this.emailClass = "form-control-mario-errore"
        },
        passwordOk: function(){
          if(this.passwordOk==true) this.passwordClass = 'form-control-mario'
          else this.passwordClass = "form-control-mario-errore"
        },
        phoneOk: function(){
          if(this.phoneOk==true) this.phoneClass = 'form-control-mario'
          else this.phoneClass = "form-control-mario-errore"
        },
        dayOk: function(){
          if(this.dayOk==true) this.dayClass = 'select-control-mario'
          else this.dayClass = "select-control-mario-errore"
        },
        monthOk: function(){
          if(this.monthOk==true) this.monthClass = 'select-control-mario'
          else this.monthClass = "select-control-mario-errore"
        },
        yearOk: function(){
          if(this.yearOk==true) this.yearClass = 'select-control-mario'
          else this.yearClass = "select-control-mario-errore"
        }


    }
    ,
    methods : {
        regPost() { 
          var tuttoInserito = true;
          if(!this.nameOk){
              tuttoInserito = false
              this.allerta = true
              this.nameClass = 'form-control-mario-errore'
          }
          if(!this.surnameOk){
              tuttoInserito = false
              this.allerta = true
              this.surnameClass = 'form-control-mario-errore'
          }
          if(!this.birthplaceOk){
              tuttoInserito = false
              this.allerta = true
              this.birthplaceClass = 'form-control-mario-errore'
          }
          if(!this.emailOk){
              tuttoInserito = false
              this.allerta = true
              this.emailClass = 'form-control-mario-errore'
          }
          if(!this.phoneOk){
              tuttoInserito = false
              this.allerta = true
              this.phoneClass = 'form-control-mario-errore'
          }
          if(!this.passwordOk){
              tuttoInserito = false
              this.allerta = true
              this.passwordClass = 'form-control-mario-errore'
          }
          if(!this.dayOk){
              tuttoInserito = false
              this.allerta = true
              this.dayClass = 'select-control-mario-errore'
          }
          if(!this.monthOk){
              tuttoInserito = false
              this.allerta = true
              this.monthClass = 'select-control-mario-errore'
          }
          if(!this.yearOk){
              tuttoInserito = false
              this.allerta = true
              this.yearClass = 'select-control-mario-errore'
          }
          
          if(tuttoInserito == true){
            this.allerta = false
            axios({
            method: 'post',
            url: 'http://localhost:8081/registration/citizen',
            data: {
                name: this.name,
                surname: this.surname,
                sex: this.sex,
                birthdate: this.year+'-'+this.month+'-'+this.day,
                birthplace: this.birthplace,
                email: this.email,
                password: this.password,
                phone: this.phone
            }
            }).then((response) => {
                alert(response+"\nRegistrazione avvenuta con successo!");
                
            }, (error) => {
                alert(error+"\ndevo ancora implementare i controlli")
            });  
          }
        }
    }
}
</script>

<style scoped>

.form-control-mario {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario-errore{
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.select-control-mario{
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.select-control-mario-errore{
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  background-clip: padding-box;
  border: 1px solid ;
  border-radius: 0.25rem;
}

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

