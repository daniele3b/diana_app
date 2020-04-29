<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
          <hr>
            <h6 class="card-title text-center"><b>RECUPERA LA TUA PASSWORD</b></h6>
            <p class="text-justify" style="size:6;" > Inserendo l'indirizzo email con il quale si è registrato  ed il suo codice fiscale, riceverà via email la password temporanea per effettuare l'accesso</p>
        <hr>
            <form class="form-signin">
              <div class="form-label-group">
                  <label for="inputEmail" >EMAIL</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email"  v-model="Email" required autofocus>
               
              </div>

              <div class="form-label-group">
                    <label for="inputCF">CODICE FISCALE</label> 
                    <input type="text" id="inputCF" class="form-control" placeholder="Codice fiscale" v-model="CF" required>
              </div>
              <button v-if="ready ==true" class="btn btn-lg btn-success btn-block text-uppercase"   id="sub" type="submit">RECUPERA</button>
              <hr>
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'PasswordForgotten',
    data (){
      return {
            CF:'',
            Email:'',
            ready:false
      };
  },
  watch:{

    CF: function () {
      if(this.CF.length==16)
        this.ready=true
      else
        this.ready=false
    },

  },
  components: {
    
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