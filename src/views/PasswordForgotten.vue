<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5 border-success mb-3">
          <div class="card-body">
            <h6 class="card-title text-center"><b>RECUPERA LA TUA PASSWORD</b></h6>
          
            
            <p class="text-left" style="size:6;" > Inserendo l'indirizzo email con il quale si è registrato  ed il suo codice fiscale, riceverà via email la password temporanea per effettuare l'accesso</p>
        <hr class="my-4">
            <form class="form-signin pt-3 pb-3"   >
              <div class="form-label-group">
                <input type="text" id="inputEmail" class="form-control" placeholder="Email"   name="email" v-model="Email" required autofocus>
              </div>
              <div class="form-label-group">
                    <input type="text" id="inputCF" class="form-control" placeholder="Codice fiscale" name="CF" v-model="CF" required>
              </div>
              <button v-if="ready ==true"  @click="postPost" class="btn btn-lg btn-success btn-block text-uppercase mt-1" type="button"  id="sub" >RECUPERA</button>
              <hr class="my-4">


              <div v-if="errorePost!=null" :class="coloreAlert " role="alert">
                  {{text}}
            </div>
              <router-link to="/">Torna alla schermata di Login</router-link>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//import $ from 'jquery'
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'PasswordForgotten',
    data (){
      return {
            CF:null,
            Email:null,
            readyCF:false,
            readyEmail:false,
            ready:false,
            postBody:null,
            errors: [],
            errorePost:null,
            coloreAlert:'',
            text:''
      };
  },
  watch:{

    CF: function () {
      if(this.CF.length!=16)
        this.readyCF=false
      else{
        this.readyCF=true
      }
    },
    Email: function(){
      if(!this.Email)
        this.readyEmail=false
      else
        this.readyEmail=true
    },
    readyCF:function() {
        if(this.readyCF==true && this.readyEmail==true)
        this.ready=true
      else
        this.ready=false
    },
    readyEmail:function() {
        if(this.readyCF==true && this.readyEmail==true)
        this.ready=true
      else
        this.ready=false
    }
    

  },
   methods: {
 
   postPost() {
this.postBody={
  email:this.Email,
  CF:this.CF.toUpperCase()
}
 axios({
  method: 'post',
  url: 'http://localhost:8081/registration/citizen/pw_forgotten',
  data: this.postBody
}).then((response) => {
  console.log(response);
  this.errorePost=false
 this. coloreAlert="alert alert-success"
 this.text="Email inviata correttamente!"
}, (error) => {
  console.log(error);
  this.errorePost=true
   this.coloreAlert="alert alert-danger"
    this.text="Errore! Controllare i campi inseriti"
});  
 
}

 
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
}

.my-4 {
  border : 1;
  border-color : grey;
}


</style>