
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5  border-success">
          <div class="card-body">
           <h5 class="card-title text-center"><b>Cambio Password</b></h5>
           
            <hr class="my-4">
            <form class="form-signin" >
    </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//import axios from 'axios'

export default {
    name:'Registration',
    data() {
        return {
            oldpw:'',
            newpw:'',
            cnfnewpw:''
        }
    },
watch:{
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
        }
        


    }
    ,
    methods : {
     
   
          
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

