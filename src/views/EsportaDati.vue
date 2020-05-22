<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5  border-success">
                    <div class="card-body">
                        <router-link to="/avanzato"><img src="../assets/back.png" style="float:left;" height="20px;"></router-link>
                        <h5 class="card-title text-center"><b>Esporta dati </b></h5>
                        <hr class="my-4">
                      <form class="form-signin" onsubmit="return false"> 
                        In questa sezione puoi effettuare i download degli storici degli agenti chimici in formato JSON e XML.
                        <hr class="my-4">

                        <div class="row" style="text-align:center; display:block;">
                          <div class="form-check form-check-inline">
                            <input v-model="radio" name="radio" type="radio" value="JSON" id="radio1" checked><pre> </pre> JSON
                          </div>
                          <div class="form-check form-check-inline">
                            <input v-model="radio" name="radio" type="radio" value="XML" id="radio2" ><pre> </pre> XML
                          </div>
                        </div>
                        
                        Applica filtri:
                        <label class="switch">
                            <input type="checkbox">
                                <span @click="filtriTrue=!filtriTrue" class="slider round"></span>
                        </label>

                        <div v-if="filtriTrue">
                            <br>
                            <h6 class="card-subtitle mb-2 text-muted text-left">Filtra per data (yyyy-mm-dd):</h6>
                            <div class="form-label-group">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" v-model=dataInizio :class="dataInizioClass" placeholder="Data Inizio" >
                                        <label v-if="dataInizioOk==true && dataInizioVer==false" class="badge badge-danger">Formato data non corretto!</label>
                                    </div>
                                    <div class="col">
                                        <input type="text" v-model=dataFine :class="dataFineClass" placeholder="Data Fine">
                                        <label v-if="dataFineOk==true && dataFineVer==false" class="badge badge-danger">Formato data non corretto!</label>
                                    </div>
                                </div>
                            </div>
                            
                            <br><h6 class="card-subtitle mb-2 text-muted text-left">Filtra per stazione:</h6>
                            <div class="form-inline">
                                <select v-model=stazione style="text-align:left;" :class=stazioneClass id="inputTipo"> 
                                    <option value="" >----------</option>
                                    <option value="9345">Villa Ada - 9345</option>
                                    <option value="9343">Cinecittà - 9343</option>
                                    <option value="9347">Cavaliere - 9347</option>
                                    <option value="9342">Francia - 9342</option>
                                    <option value="9346">Guido - 9346</option>
                                    <option value="9344">Guidonia - 9344</option>
                                    <option value="10911">Fiumicino - 10911</option>
                                    <option value="9349">Malagrotta - 9349</option>
                                    <option value="9352">Arenula - 9352</option>
                                    <option value="9348">Cipro - 9348</option>
                                    <option value="10910">Colleferro - 10910</option>
                                </select>
                            </div>
                            
                            <br><br><h6 class="card-subtitle mb-2 text-muted text-left">Filtra per tipo:</h6>
                            <div class="form-inline">
                                <select v-model="tipo" style="text-align:left;" :class=tipoClass id="inputTipo"> 
                                    <option value="" >----------</option>
                                    <option value="O3">O3</option>
                                    <option value="PM10">PM10</option>
                                    <option value="PM25">PM25</option>
                                    <option value="SO2">SO2</option>
                                </select>
                            </div>

                        </div>
                        <hr class="my-4">
                        
                        <div v-if="errore==true" class="alert alert-danger" role="alert">
                          Errore download!
                        </div>
                        <div class="col" style="text-align:center;">
                          <label v-if="loading==true" class="alert">Download in corso...</label>
                          <div v-if="loading==true" class="spinner-border" role="status">
                            <span class="sr-only">Download in corso...</span>
                            <br>
                          </div>
                        </div>
                        
                        <label v-if="corretto==true" class="alert alert-success">Download eseguito con successo!</label>
                        <a href="" id="download_link" download="my_exported_file.txt">
                          <button  @click="download" type="submit" class="btn btn-lg btn-success btn-block text-uppercase" >Download</button>
                        </a>
                        
                        
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    
</template>

<script >
import axios from 'axios'

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
            tipoClass: 'select-control-mario',
            loading: false,
            corretto: false,
            errore: false,
            radio: "JSON"
        }
    },
    methods:{
        attivaFiltri: function(){ 
            if(this.filtriTrue==true) this.filtriTrue=false
            else if(this.filtriTrue==false) this.filtriTrue=true
        },
      json2xml: function (o, tab) {
        var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for ( m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
  },
      download: function(){
        
          this.corretto = false
          this.errore = false
          this.loading = true
          var tipo_risp=''

            if(this.radio=='JSON')
                tipo_risp='blob'
                else
                tipo_risp='json'
          //DOWNLOAD SENZA FILTRI
          if(this.dataInizioOk==false && this.dataFineOk==false &&
              this.stazioneOk==false && this.tipoOk==false){ 
              
                  var url = 'http://localhost:8081/chemical_agents/history'
                  axios({
                          url: url,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp, // importan
                      }).then((response) => { 
                          if(this.radio == 'JSON'){
                            alert('JSON')
                            console.log(response)
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile = 'DianaHistory.json'
                            link.setAttribute('download', nomefile);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                          }else if(this.radio == 'XML'){
                            alert('XML')
                          
                            var testo = this.json2xml(response.data, "")
                           testo="<data>"+testo+"</data>"
                            
                            const url = window.URL.createObjectURL(new Blob([testo]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile2 = 'DianaHistory.xml'
                            link.setAttribute('download', nomefile2);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                          }
                      }).catch(() =>{
                        console.log('fottiti')
                          this.loading = false
                        this.errore = true
                      });
          }//DOWNLOAD FILTRO TIPO
          else if(this.dataInizioOk==false && this.dataFineOk==false &&
              this.stazioneOk==false && this.tipoOk==true){
                  var urll = 'http://localhost:8081/chemical_agents/history/'+this.tipo
                  axios({
                          url: urll,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                          
                      }).then((response) => { 
                          if(this.radio == 'JSON'){
                            alert('JSON')
                            console.log(response)
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile = 'Diana'+this.tipo+'.json'
                            link.setAttribute('download', nomefile);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                          }else if(this.radio == 'XML'){
                            alert('XML TIPO')                            
                            var testo = this.json2xml(response.data, "")
                           testo="<data>"+testo+"</data>"
                            const url = window.URL.createObjectURL(new Blob([testo]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile2 = 'Diana'+this.tipo+'.xml'
                            link.setAttribute('download', nomefile2);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                          }
                      }).catch(() =>{
                          this.loading = false
                        this.errore = true
                      });
          }//DOWNLOAD FILTRO STAZIONE
          else if(this.dataInizioOk==false && this.dataFineOk==false &&
              this.stazioneOk==true && this.tipoOk==false){ 
                  var urlstazione = 'http://localhost:8081/chemical_agents/history/station/'+this.stazione
                  axios({
                          url: urlstazione,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                         
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                            alert('JSON')
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile = 'Diana'+this.stazione+'.json'
                            link.setAttribute('download', nomefile);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
          
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.stazione+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore = true
                      });
          }//DOWNLOAD FILTRO DATE START DATE END
          else if(this.dataInizioVer==true && this.dataFineVer==true &&
              this.stazioneOk==false && this.tipoOk==false){ 
                  var urldate = 'http://localhost:8081/chemical_agents/filter/date/'+this.dataInizio+"/"+this.dataFine
                  axios({
                          url: urldate,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                         
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                            alert('JSON')
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            var nomefile = 'Diana'+this.dataInizio+"-"+this.dataFine+'.json'
                            link.setAttribute('download', nomefile);
                            document.body.appendChild(link);
                            link.click();
                            this.loading = false
                            this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.dataInizio+"-"+this.dataFine+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore=true
                      });
          }//DOWNLOAD FILTRO TIPO E STAZIONE
          else if(this.dataInizioVer==false && this.dataFineVer==false &&
              this.stazioneOk==true && this.tipoOk==true){ 
                  var urlstationtype = 'http://localhost:8081/chemical_agents/history/station/'+this.stazione+'/'+this.tipo
                  axios({
                          url: urlstationtype,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                          
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                          alert('JSON')
                          const url = window.URL.createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile = 'Diana'+this.stazione+"-"+this.tipo+'.json'
                          link.setAttribute('download', nomefile);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.stazione+"-"+this.tipo+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore=true
                      });
          }//DOWNLOAD FILTRO TIPO E DATE
          else if(this.dataInizioVer==true && this.dataFineVer==true &&
              this.stazioneOk==false && this.tipoOk==true){ 
                  var urldatetype = 'http://localhost:8081/chemical_agents/filter/date/'+this.dataInizio+'/'+this.dataFine+'/type/'+this.tipo
                  axios({
                          url: urldatetype,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                          alert('JSON')
                          const url = window.URL.createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile = 'Diana'+this.dataInizio+"-"+this.dataFine+"-"+this.tipo+'.json'
                          link.setAttribute('download', nomefile);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.dataInizio+"-"+this.dataFine+'-'+this.tipo+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore=true
                      });
          }//DOWNLOAD FILTRO STAZIONE E DATE
          else if(this.dataInizioVer==true && this.dataFineVer==true &&
              this.stazioneOk==true && this.tipoOk==false){ 
                  var urldatestation = 'http://localhost:8081/chemical_agents/filter/date/'+this.stazione+'/'+this.dataInizio+'/'+this.dataFine
                  axios({
                          url: urldatestation,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                          alert('JSON')
                          const url = window.URL.createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile = 'Diana'+this.dataInizio+"-"+this.dataFine+"-"+this.stazione+'.json'
                          link.setAttribute('download', nomefile);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.dataInizio+"-"+this.dataFine+'-'+this.stazione+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore=true
                      });
          }//DOWNLOAD FILTRO TIPO STAZIONE E DATE
          else if(this.dataInizioVer==true && this.dataFineVer==true &&
              this.stazioneOk==true && this.tipoOk==true){ 
                  var urltypedatestation = 'http://localhost:8081/chemical_agents/filter/date/'+this.dataInizio+'/'+this.dataFine+'/type/'+this.tipo+'/'+this.stazione
                  axios({
                          url: urltypedatestation,
                          method: 'GET',
                          headers: {
                            "x-diana-auth-token": localStorage.token
                          },
                           responseType: tipo_risp,
                      }).then((response) => { 
                        if(this.radio == 'JSON'){
                          alert('JSON')
                          const url = window.URL.createObjectURL(new Blob([response.data]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile = 'Diana'+this.dataInizio+"-"+this.dataFine+"-"+this.stazione+'-'+this.tipo+'.json'
                          link.setAttribute('download', nomefile);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }else if(this.radio == 'XML'){
                          alert('XML')
                          var testo = this.json2xml(response.data, "")
                            testo="<data>"+testo+"</data>"
                          const url = window.URL.createObjectURL(new Blob([testo]));
                          const link = document.createElement('a');
                          link.href = url;
                          var nomefile2 = 'Diana'+this.dataInizio+"-"+this.dataFine+"-"+this.stazione+'-'+this.tipo+'.xml'
                          link.setAttribute('download', nomefile2);
                          document.body.appendChild(link);
                          link.click();
                          this.loading = false
                          this.corretto = true
                        }
                      }).catch(() =>{
                          this.loading = false
                        this.errore=true
                      });
          }
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
                
                if(this.dataInizio.length==10 && this.dataInizio.charAt(4)=='-' &&
                    this.dataInizio.charAt(7)=='-' && !isNaN(this.dataInizio.substr(0,4))
                    && !isNaN(this.dataInizio.substr(5,2)) && !isNaN(this.dataInizio.substr(8,2))){
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
                
                if(this.dataFine.length==10 && this.dataFine.charAt(4)=='-' &&
                    this.dataFine.charAt(7)=='-' && !isNaN(this.dataFine.substr(0,4))
                    && !isNaN(this.dataFine.substr(5,2)) && !isNaN(this.dataFine.substr(8,2))){
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
                this.stazioneOk = true
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

.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
  
}

.form-check-inline {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 0;
  margin-right: 0.75rem;
}



.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
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