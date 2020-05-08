<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5  border-success">
                    <div class="card-body">
                        <router-link to="/avanzato"><img src="../assets/back.png" style="float:left;" height="20px;"></router-link>
                        <h5 class="card-title text-center"><b>Esporta dati </b></h5>
                        <hr class="my-4">
                        <form class="form-signin" onsubmit="return checkForm();">
                        In questa sezione puoi effettuare i download degli storici degli agenti chimici in formato JSON e XML.
                        <hr class="my-4">
                        
                        Applica filtri:
                        <label class="switch">
                            <input type="checkbox">
                                <span @click="filtriTrue=!filtriTrue" class="slider round"></span>
                        </label>

                        <div v-if="filtriTrue">
                            <h6 class="card-subtitle mb-2 text-muted text-left">Filtra per data (dd/mm/yyy):</h6>
                            <div class="form-label-group">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" v-model=dataInizio :class="dataInizioClass" placeholder="Data Inizio" >
                                    </div>
                                    <div class="col">
                                        <input type="text" v-model=dataFine :class="dataFineClass" placeholder="Data Fine">
                                    </div>
                                </div>
                            </div>
                            
                            <br><h6 class="card-subtitle mb-2 text-muted text-left">Filtra per stazione:</h6>
                            <div class="form-inline">
                                <select v-model=stazione style="text-align:left;" :class=stazioneClass id="inputTipo"> 
                                    <option value="" >----------</option>
                                    <option value="9345">Villa Ada</option>
                                    <option value="9343">Cinecittà</option>
                                    <option value="9347">Cavaliere</option>
                                    <option value="9342">Francia</option>
                                    <option value="9346">Guido</option>
                                    <option value="9344">Guidonia</option>
                                    <option value="10911">Fiumicino</option>
                                    <option value="9349">Malagrotta</option>
                                    <option value="9352">Arenula</option>
                                    <option value="9348">Cipro</option>
                                    <option value="10910">Colleferro</option>
                                </select>
                            </div>
                            
                            <br><br><h6 class="card-subtitle mb-2 text-muted text-left">Filtra per tipo:</h6>
                            <div class="form-inline">
                                <select v-model="tipo" style="text-align:left;" :class=tipoClass id="inputTipo"> 
                                    <option value="" >----------</option>
                                    <option value="O3">O3</option>
                                    <option value="NO">NO</option>
                                    <option value="NO2">NO2</option>
                                    <option value="NOX">NOX</option>
                                    <option value="PM10">PM10</option>
                                    <option value="PM25">PM25</option>
                                    <option value="BENZENE">BENZENE</option>
                                    <option value="CO">CO</option>
                                    <option value="SO2">SO2</option>
                                </select>
                            </div>

                        </div>
                        
                        <hr class="my-4">
                        <button  @click="alert('l')" class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Download</button>
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
    name : "EsportaDati",
    data() {
        return {
            filtriTrue: false,
            dataInizio: "",
            dataInizioClass: 'form-control-mario',
            dataInizioOk: false,
            dataInizioVer: false,
            dataFine: "",
            dataFineClass: 'form-control-mario',
            dataFineOk: false,
            dataFineVer: false,
            stazione: "",
            stazioneOk: false,
            stazioneClass: 'select-control-mario',
            tipo: "",
            tipoOk: false,
            tipoClass: 'select-control-mario'
        }
    },
    methods:{
        attivaFiltri: function(){ 
            if(this.filtriTrue==true) this.filtriTrue=false
            else if(this.filtriTrue==false) this.filtriTrue=true
        }
    },
    watch:{
        dataInizio: function(){
            if(this.dataInizio.length==0){ 
                this.dataInizioOk = false
                this.dataInizioClass = 'form-control-mario'
            }
            else{
                this.dataInizioOk = true
                
                if(this.dataInizio.length==12){
                    this.dataInizioVer = true
                    this.dataInizioClass = 'form-control-mario-ver'
                }
                else{
                    this.dataInizioVer = false
                    this.dataInizioClass = 'form-control-mario-errore'
                }
            }
        },
        dataFine: function(){
            if(this.dataFine.length==0){ 
                this.dataFineOk = false
                this.dataFineClass = 'form-control-mario'
            }
            else{
                this.dataFineoOk = true
                
                if(this.dataFine.length==12){
                    this.dataFineVer = true
                    this.dataFineClass = 'form-control-mario-ver'
                }
                else{
                    this.dataFineVer = false
                    this.dataFineClass = 'form-control-mario-errore'
                }
            }
        },
        stazione: function(){
            if(this.stazione==""){ 
                this.stazioneOk = false
                this.stazioneClass = 'select-control-mario'
            }
            else{
                this.stazioneoOk = true
                this.stazioneClass = 'select-control-mario-ver'
            }
        },
        tipo: function(){
            if(this.tipo==""){ 
                this.tipoOk = false
                this.tipoClass = 'select-control-mario'
            }
            else{
                this.tipoOk = true
                this.tipoClass = 'select-control-mario-ver'
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

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(151, 148, 148);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 23px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(204, 248, 7);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: rgb(32, 196, 32);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 20px;
}

.switch {
  position: relative;
  display:inline-block;
  width: 60px;
  margin-top: 10px;
  margin-left: 10px;
  height: 30px;
}


</style>