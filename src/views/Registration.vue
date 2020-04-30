
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
                        <input type="text" class="form-control" placeholder="Nome">
                    </div>
                    <div class="col ">
                        <input type="text" class="form-control" placeholder="Cognome">
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                <div class="row">
                    <div class="col">
                        <input type="email" id="inputEmail" class="form-control" placeholder="E-mail" required >
                    </div>
                    <div class="col">
                        <input type="text" id="inputEmail" class="form-control" placeholder="Telefono" required >
                    </div>
                </div>
              </div>

              <div class="form-label-group">
                  <input type="password" class="form-control" placeholder="Password">
              </div>

              <div class="form-label-group"><br>
                <h6 class="card-subtitle mb-2 text-muted text-left">Data e luogo di nascita:</h6>
                <div class="form-inline">
                <select name="giorno" id="giorno"> 
                    <option value="">GG</option>
                    <option v-for="i in 31" :key="i">{{i}}</option>
                </select>
                <pre> </pre>
                <select name="mese">
                    <option value="">MM</option>  
                    <option v-for="i in 12" :key="i">{{i}}</option>                  
                </select>
                <pre> </pre>
                <select name="">
                    <option value="">AAAA</option>
                    <option v-for="i in 115" :key="i">{{i+1905}}</option>
                </select>
                
                </div>
            </div>
                <div class="form-label-group">
                <input size="12" type="text" id="inputName" class="form-control" placeholder="Luogo" required>
            </div>

              

              <div class="form-label-group">
                  <h6 class="card-subtitle mb-2 text-muted text-left">Genere:</h6>
                  <div class="form-inline">
                    <input type="radio" id="genereM" class="form-control"> <pre> </pre> M <pre> </pre>
                    <input type="radio" id="genereF" class="form-control"> <pre> </pre> F
                  </div>
                
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Entra in Diana!</button>
              <hr class="my-4">
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Registration',
    data() {
        return {
            giorni: 12
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

