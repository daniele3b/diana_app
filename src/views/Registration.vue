
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
                        <input type="text" v-model=name  id="inputName" class="form-control" placeholder="Nome" autofocus>
                    </div>
                    <div class="col ">
                        <input type="text" v-model=surname id="inputSurname" class="form-control" placeholder="Cognome">
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="email" v-model=email id="inputEmail" class="form-control" placeholder="E-mail" >
                    </div>
                    <div class="col">
                        <input type="text" v-model=phone id="inputPhone" class="form-control" placeholder="Telefono"  >
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                  <input type="password" v-model=password class="form-control" placeholder="Password">
              </div>

              <div class="form-label-group"><br>
                <h6 class="card-subtitle mb-2 text-muted text-left">Data e luogo di nascita:</h6>
                <div class="form-inline">
                <select name="giorno" id="inputGiorno" v-model=day> 
                    <option disabled value="" >GG</option>
                    <option v-for="i in 31" :key="i">{{i}}</option>
                </select>
                <pre> </pre>
                <select name="mese" id="inputMese" v-model=month>
                    <option disabled value="">MM</option>  
                    <option v-for="i in 12" :key="i">{{i}}</option>                  
                </select>
                <pre> </pre>
                <select name="anno" id="inputAnno" v-model="year">
                    <option disabled value="">AAAA</option>
                    <option v-for="i in 115" :key="i">{{i+1905}}</option>
                </select>
                
                </div>
            </div>
                <div class="form-label-group">
                <input size="12" type="text" v-model="birthplace" id="inputLuogo" class="form-control" placeholder="Luogo" >
            </div>

              

              <div class="form-label-group">
                  <h6 class="card-subtitle mb-2 text-muted text-left">Genere:</h6>
                  <div class="form-inline">
                    <input type="radio" value='M' v-model=sex name='sex' id="genereM" class="form-control"> <pre> </pre> M <pre> </pre>
                    <input type="radio" value='F' v-model=sex name='sex' id="genereF" class="form-control"> <pre> </pre> F
                  </div>
                
              </div>

              
              <button @click="regPost" class="btn btn-lg btn-success btn-block text-uppercase"  type="submit">Entra in Diana!</button>
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
            name: '',
            surname:'',
            sex:'',
            day:'',
            month:'',
            year:'',
            birthplace:'',
            email:'',
            password:'',
            phone: ''
        }
    },
    methods : {
        regPost() { 
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

