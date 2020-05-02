
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5  border-success">
          <div class="card-body">
           <h5 class="card-title text-center"><b>Registrazione </b></h5>
           
            <hr class="my-4">
            <form class="form-signin" onsubmit="return checkForm();">

            <h6 class="card-subtitle mb-2 text-muted text-left">Credenziali:</h6>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="text" v-model=name  id="inputName" :class="nameClass" placeholder="Nome" autofocus required>
                        <label v-if="nameVer==false" for="inputName" class="badge badge-danger">No numero</label>
                    </div>
                    <div class="col ">
                        <input type="text" v-model=surname id="inputSurname" :class="surnameClass" placeholder="Cognome" required>
                        <label v-if="surnameVer==false" for="inputSurname" class="badge badge-danger">No numero</label>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="email" v-model=email id="inputEmail" :class="emailClass" placeholder="E-mail" required>
                        <label v-if="emailVer==false" for="inputEmail" class="badge badge-danger">Email non valida</label>
                    </div>
                    <div class="col">
                        <input type="text" v-model=phone id="inputPhone" :class="phoneClass" placeholder="Telefono*">
                        <label v-if="phoneVer==false" for="inputSurname" class="badge badge-danger">Numero non valido</label>
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password :class="passwordClass" placeholder="Password" required>
                  <label v-if="passwordVer==false" class="badge badge-danger">Deve contenere almeno 8 caratteri,una <br>lettera maiuscola, una minuscola ed un numero</label>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password2 :class="password2Class" placeholder="Ripeti Password" required>
                  <label v-if="password2Ver==false" class="badge badge-danger">Le due password non coincidono</label>
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
                <input  size="12" type="text" v-model="birthplace" id="inputLuogo" :class="birthplaceClass" placeholder="Comune di nascita" required>
                 <label v-if="birthplaceVer==false" for="inputBirthplace" class="badge badge-danger">Non trovato</label>
            </div>

              

              <div class="form-label-group">
                  <div class="form-inline">
                    <h6 class="card-subtitle mb-2 text-muted text-left">Genere:</h6> <pre>  </pre>
                    <select :class="sexClass" name="giorno" id="inputGiorno" v-model=sex required > 
                    <option disabled value="" >---</option>
                    <option value="M">Uomo</option>
                    <option value="F">Donna</option>
                </select>
              </div>
                
              </div>

              <div v-if="allerta" class="alert alert-danger" role="alert">
                Non hai inserito tutto!
              </div>
              <h6 class="card-subtitle mb-2 text-muted text-left">*campo facoltativo </h6>
              <hr class="my-4">

              <button  @click="regPost" class="btn btn-lg btn-success btn-block text-uppercase"  type="submit">Entra in Diana!</button>
              <br><h6 class="card-subtitle mb-2 text-muted">oppure</h6>
              <a href="http://localhost:8081/sign-in/google" target="_blank"><img src="../../google.png" alt=""></a>
              <br>
              
              <hr class="my-4">
              <router-link to="/" >Torna alla pagina di login</router-link>
              

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
            //i campiOk riguardano l'inserimento
            //i campiVer riguardano la correttezza dell'inserimento
            flaginseriti: false,

            name: '',
            nameOk: false,
            nameClass: 'form-control-mario',
            nameVer: true,

            surname:'',
            surnameOk:false,
            surnameClass: 'form-control-mario',
            surnameVer: true,

            sex:'',
            sexOk:false,
            sexClass: 'select-control-mario',

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
            birthplaceClass: 'form-control-mario',
            birthplaceVer: true,

            email:'',
            emailOk:false,
            emailClass: 'form-control-mario',
            emailVer: true,

            password:'',
            passwordOk:false,
            passwordClass: 'form-control-mario',
            passwordVer: true,

            password2:'',
            password2Ok:false,
            password2Class: 'form-control-mario',
            password2Ver: true,

            phone: '',
            phoneOk:false,
            phoneClass: 'form-control-mario',
            phoneVer: true,

            allerta: false
        }
    },
    watch: {
        name: function(){
          if(this.name=='') this.nameOk = false
          else this.nameOk = true 
          if(isNaN(this.name) || this.name=='')  { this.nameVer = true; this.nameClass = "form-control-mario-ver";}
          else { this.nameVer = false; this.nameClass = "form-control-mario-errore";}
        },
        surname: function(){
          if(this.surname=='') this.surnameOk = false
          else this.surnameOk = true
          if(isNaN(this.surname) || this.surname=='')  { this.surnameVer = true; this.surnameClass = "form-control-mario-ver";}
          else{ this.surnameVer = false; this.surnameClass = "form-control-mario-errore";}
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
          var trovato = false
          var json = require('../../comuni.json');
          var i=0
          for(i=0; i<json.length; i++){
            if(json[i].nome==this.birthplace)
              trovato=true
          }
          if(trovato==true && this.birthplaceOk==true) { this.birthplaceVer = true; this.birthplaceClass = "form-control-mario-ver";}
          else { this.birthplaceVer = false; this.birthplaceClass = "form-control-mario-errore";}
        },
        email: function(){
          if(this.email=='') this.emailOk = false
          else this.emailOk = true
          var corretta = false
          
          var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(this.email)) corretta = true
          

          if(corretta==true)  { this.emailVer = true; this.emailClass = "form-control-mario-ver";}
          else{ this.emailVer = false; this.emailClass = "form-control-mario-errore";}
        },
        password: function(){
          if(this.password=='') this.passwordOk = false
          else this.passwordOk = true
          var numero = false;
          var lMaiusc = false;
          var lMinusc = false;
          var i = 0
          for(i=0;i<this.password.length;i++){
            var character = this.password.charAt(i);
            if (!isNaN(character * 1)){
                numero=true
            }else{
              if (character == character.toUpperCase()) {
                lMaiusc = true
              }
              if (character == character.toLowerCase()){
                lMinusc = true
              }
            }
          }
          if(this.password.length>=8 && numero==true && lMaiusc==true && lMinusc==true)  
                { this.passwordVer = true; this.passwordClass = "form-control-mario-ver";}
          else{ this.passwordVer = false; this.passwordClass = "form-control-mario-errore";}
        },
        password2: function(){
          if(this.password2=='') this.password2Ok = false
          else this.password2Ok = true
          if(this.password2 == this.password) { this.password2Ver = true; this.password2Class = "form-control-mario-ver";}
          else{ this.password2Ver = false; this.password2Class = "form-control-mario-errore";}
        },
        phone: function(){
          if(!isNaN(this.phone) && this.phone.length==10 && this.phone!='')  { this.phoneVer = true; this.phoneClass = "form-control-mario-ver";}
          else if(this.phone==''){this.phoneVer=true;this.phoneClass = "form-control-mario";}
          else{ this.phoneVer = false; this.phoneClass = "form-control-mario-errore";}
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
        dayOk: function(){
          if(this.dayOk==true) this.dayClass = 'select-control-mario-ver'
          else this.dayClass = "select-control-mario-errore"
        },
        monthOk: function(){
          if(this.monthOk==true) this.monthClass = 'select-control-mario-ver'
          else this.monthClass = "select-control-mario-errore"
        },
        yearOk: function(){
          if(this.yearOk==true) this.yearClass = 'select-control-mario-ver'
          else this.yearClass = "select-control-mario-errore"
        },
        sexOk: function(){
          if(this.sexOk==true) this.sexClass = 'select-control-mario-ver'
          else this.sexClass = "select-control-mario-errore"
        }


    }
    ,
    methods : {
        checkForm(){
          if(this.nameVer==true && this.surnameVer==true && (this.phoneVer==true || this.phone=='') && this.emailVer==true && 
          this.birthplaceVer==true && this.passwordVer==true && this.dayOk==true && this.monthOk==true && 
          this.yearOk==true && this.sexOk==true && this.password2Ver==true) return true;
          else return false
        }
        ,
        regPost() { 
          var tuttoInserito = true;
          if(!this.nameOk || this.nameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.nameClass = 'form-control-mario-errore'
          }
          if(!this.surnameOk || this.surnameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.surnameClass = 'form-control-mario-errore'
          }
          if(!this.birthplaceOk || this.birthplaceVer==false){
              tuttoInserito = false
              this.allerta = true
              this.birthplaceClass = 'form-control-mario-errore'
          }
          if(!this.emailOk || this.emailVer==false){
              tuttoInserito = false
              this.allerta = true
              this.emailClass = 'form-control-mario-errore'
          }
          if(this.phone!='' && this.phoneVer==false){
              tuttoInserito = false
              this.allerta = true
              this.phoneClass = 'form-control-mario-errore'
          }
          if(!this.passwordOk || this.passwordVer==false){
              tuttoInserito = false
              this.allerta = true
              this.passwordClass = 'form-control-mario-errore'
          }
          if(!this.password2Ok || this.password2Ver==false){
              tuttoInserito = false
              this.allerta = true
              this.password2Class = 'form-control-mario-errore'
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
          if(!this.sexOk){
              tuttoInserito = false
              this.allerta = true
              this.sexClass = 'select-control-mario-errore'
          }
          //CON TELEFONO
          if(tuttoInserito == true && this.phone!=''){ alert("Controlli superati con telefono")
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
            }).then(() => {
                alert("\nRegistrazione avvenuta con successo!");
                window.location.replace('Login.vue');
                
            }, (error) => {
                alert("Errore richiesta:\n"+error)
            });  
          }
          
          //SENZA TELEFONO
          else if(tuttoInserito == true){alert("Controlli superati senza telefono")
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
                password: this.password
            }
            }).then(() => {
                alert("\nRegistrazione avvenuta con successo!");
                window.location.replace('Login.vue');
                
            }, (error) => {
                alert("Errore richiesta:\n"+error)
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

.form-control-mario:focus {
  color: #495057;
  background-color: #fff;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control-mario-ver {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario-ver:focus {
  color: #495057;
  background-color: #cef5d8;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


.form-control-mario-errore{
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #721c24;
  background-color: #f8d7da;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control-mario-errore:focus {
  color: #495057;
  background-color: #f8d7da;
  border-color: green;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-control-mario{
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid green;
  border-radius: 0.25rem;
}

.select-control-mario-ver{
  color: #495057;
  background-color: #cef5d8;
  background-clip: padding-box;
  border: 1px solid green;
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

