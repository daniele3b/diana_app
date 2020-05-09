<template>
    <div>
        <!--  SCHERMATA DI VISUALIZZAZIONE INIZIALE  -->

        <div v-if="!adding && !visualizzandoDettagli">
            <div class="row mt-1 ml-1">
                <router-link to="/avanzato"><img src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;"></router-link>
            </div>

        <div class="card border-success mt-3">
            <div class="card-body">
                <h5 class="card-title"><b>ANNUNCI</b></h5>
                
                <!--  TABELLA  -->
                
                <div class="table-responsive table-borderless" style="height:350px">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">CF</th>
                                <th scope="col">Data inizio</th>
                                <th scope="col">Data fine</th>
                                <th scope="col">Dettagli</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="annuncio in annunci" :key="annuncio._id">
                                <td>{{annuncio.CF}}</td>
                                <td>{{annuncio.start}}</td>
                                <td>{{annuncio.end}}</td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Detail"><button :id="annuncio._id" @click="visualizzaDettagli" class = "btn btn-success btn-xs" data-title = "Detail" data-toggle = "modal" data-target = "#detail" style = "height:10px;width:20px;"><span class="glyphicon glyphicon-trash"></span></button></p></td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Edit"><button :id="annuncio._id" class = "btn btn-primary btn-xs" data-title = "Edit" data-toggle = "modal" data-target = "#edit" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                                <td><p data-placement = "top" data-toggle = "tooltip" title = "Delete"><button :id="annuncio._id" @click="cancellaAnnuncio" class = "btn btn-danger btn-xs" data-title = "Delete" data-toggle = "modal" data-target = "#delete"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>

                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <!-- BOTTONE DI AGGIUNTA  -->
                
                <button @click="adding=true" type="button" class="btn btn-success mt-1">Inserisci nuovo annuncio</button>

            </div>
        </div>
        </div>

         <!-- SCHERMATA DI INSERIMENTO NUOVO ANNUNCIO  -->

        <div v-if="adding">
            <div class="row mt-1 ml-1">
                <img @click="tornaAllaSchermataPrecedente()" src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>
                <div class="card card-signin border-success mt-2" style="width:520px;">
                    <div class="card-body">
                    
                    <h5 class="card-title text-center"><b>INSERISCI NUOVO ANNUNCIO</b></h5>
                    
                    <form class="form-signin" @keyup.enter="pubblicaAnnuncio()">
                        
                        <div class="row">
                            <div class="col mt-1">
                                <h6>Codice fiscale</h6>
                            </div>
                            
                            <div class="col">
                                <input class="inserimento" v-model="CF" type="text" style="width:200px">
                            </div>

                            <div class="col">

                            </div>
                        </div>
                        
                        <div class="row">
                            <div class = "col mt-1">
                                <h6>Data inizio</h6>
                            </div>

                            <div class = "col">
                                <input class="inserimento mt-1" v-model="data_inizio" type="date" style="width:200px">
                            </div>

                            <div class="col">

                            </div>
                        </div>

                        <div class="row">
                            <div class = "col mt-1">
                                <h6>Data fine</h6>
                            </div>

                            <div class = "col">
                                <input class="inserimento mt-1" v-model="data_fine" type="date" style="width:200px">
                            </div>

                            <div class="col">

                            </div>
                        </div>

                        <div class="row">
                            <div class = "col mt-1">
                                <h6>Zone</h6>
                            </div>

                            <div class = "col">
                                <input class="inserimento mt-1" v-model="newZona" placeholder="Clicca su '+' per aggiungere" type="text" style="width:200px">
                            </div>

                            <div class="col">
                                <button @click="aggiungiZona()" class="btn border-success" type="button" style="width:35px; height:35px">+</button>
                            </div>

                        </div>

                        <div class="row">
                            <div class = "col mt-1">
                                <h6>Descrizione</h6>
                            </div>

                            <div class = "col">
                                <textarea class="inserimento mt-1" v-model="descrizione" type="textarea" maxlength="200" style="width:200px; height:200px"></textarea>
                            </div>

                            <div class="col">

                            </div>
                        </div>

                        <div v-if="cliccatoSuPubblica && (error == 'CF' || error == 'Data inizio' || error == 'Data fine' || error == 'Logica delle date' || error == 'Descrizione')" class="alert alert-danger mt-1" role="alert">
                            {{messaggioErrore}}
                        </div>

                        <div v-else-if="cliccatoSuPubblica && error==''" class="alert alert-success mt-1" role="alert">
                            {{messaggioConferma}}
                        </div>

                        <button @click="pubblicaAnnuncio()" type="button" class="btn btn-success mt-1">Pubblica annuncio</button>

                    </form>
            
                    </div>
              
            
                </div>
           
           </center>
        
        </div>

        <div v-if="visualizzandoDettagli">

            <div class="row mt-1 ml-1">
                <img @click="visualizzandoDettagli=false" src="../assets/back.png" class="back mt-1" style="width:20px; margin-left:16px;">
            </div>

            <center>
                <div class="card border-success mt-2" style="width:460px">
                    <div class="card-body">
                    
                        <h5 class="card-title text-center"><b>DETTAGLI ANNUNCIO</b></h5>
                    
                        <div class="row">
                            <div class="col">
                                <p><b>CF</b></p>
                            </div>
                               
                            <div class="col">
                                 {{annuncioDaVisualizzare.CF}}
                            </div>
                        </div>

                        <div class="row">

                            <div class ="col">
                                <p><b>Data di inizio</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.start}}
                            </div>

                        </div>

                        <div class="row">

                            <div class ="col">
                                <p><b>Data di fine</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.end}}
                            </div>

                        </div>

                        <div v-if="annuncioDaVisualizzare.zone.length == 1" class="row">
                            
                            <div class="col">
                                <p><b>Zona</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.zone[0]}}
                            </div>

                        </div>

                        <div v-else class="row" v-for="(zona, index) in annuncioDaVisualizzare.zone" :key="index">
                            <div class="col">
                                <p><b>Zona {{index+1}}</b></p>
                            </div>

                            <div class="col">
                                {{zona}}
                            </div>
                            
                        </div>

                        <div class="row">
                            <div class="col">
                                <p><b>Descrizione</b></p>
                            </div>

                            <div class="col">
                                {{annuncioDaVisualizzare.description}}
                            </div>

                        </div>
                    
                    </div>
              
            
                </div>
           
           </center>

        </div>
        
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name : "Announcements",

  data(){
    return {
        annunci : [],
        loading : false,
        adding : false,
        visualizzandoDettagli : false,
        CF : "",
        data_inizio : "",
        data_fine : "",
        descrizione : "",
        newZona : "",
        zone : [],
        error : "",
        messaggioErrore : "",
        cliccatoSuPubblica : false,
        messaggioConferma : "",
        annuncioDaVisualizzare : {}
    }
  },

  created(){
    this.annunci = []

    axios({
      method: 'get',
      url: 'http://localhost:8081/announcements',
      headers: {
        "x-diana-auth-token": localStorage.token
      }
    })
    .then((response) => {
      
      let i 
      const annunci = response.data
      const dim = annunci.length
      for(i=0;i<dim;i++){
        
        let data_inizio = annunci[i].start
        const ind_inizio = data_inizio.indexOf('T')
        let data_fine = annunci[i].end
        const ind_fine = data_fine.indexOf('T')

        data_inizio = data_inizio.substring(0, ind_inizio)
        data_fine = data_fine.substring(0, ind_fine)
        
        annunci[i].start = data_inizio
        annunci[i].end = data_fine

        if(annunci[i].zone[0] == "Everywhere") annunci[i].zone[0] = "Nessuna zona specificata"

        this.annunci.push(annunci[i])
        
      }
    })
    .catch((error) => {
      alert("Non sono stati pubblicati annunci oggi")
      console.log(error)
    })
  },

  methods : {
    
    controllaCF(){
      var regex = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/
      const res = regex.test(this.CF)
      
      if(!res){
          this.error = "CF"
          this.messaggioErrore = "Codice fiscale non valido"
          return false
      }

      return true
    },

    controllaDate(){

      if(this.data_inizio.length < 10){
        this.error = "Data inizio"
        this.messaggioErrore = "Data di inizio non valida"
        return false
      }

      if(this.data_fine.length < 10){
        this.error = "Data fine"
        this.messaggioErrore = "Data di fine non valida"
        return false  
      }

      if(this.data_fine < this.data_inizio){
        this.error = "Logica delle date"
        this.messaggioErrore = "La data di inizio non può essere maggiore di quella di fine"
        return false
      }

      return true
    },

    controllaDescrizione(){
      if(this.descrizione == ""){
        this.error = "Descrizione"
        this.messaggioErrore = "La descrizione non può essere vuota"
        return false
      }

      return true
    },
    
    campiOK(){
        return this.controllaCF() && this.controllaDate() && this.controllaDescrizione()
    },
    
    pubblicaAnnuncio(){
      this.cliccatoSuPubblica = true

      if(!this.campiOK()){
        setTimeout(() => {this.cliccatoSuPubblica = false}, 2000)
        return
      }

      if(!confirm("Confermi la pubblicazione dell'annuncio? Ogni cittadino riceverà un'email.")) return

      this.error = ""
      
      axios({
        method: 'post',
        url: 'http://localhost:8081/announcements',
        headers: {
          "x-diana-auth-token": localStorage.token
        },
        data: {
          CF: this.CF,
          start: this.data_inizio,
          end : this.data_fine,
          description : this.descrizione,
          zone : this.zone
        }
      })
      .then((response) => {
          this.messaggioConferma = "Annuncio pubblicato con successo!"

          const ind_inizio = response.data.start.indexOf('T')
          const ind_fine = response.data.end.indexOf('T')
          response.data.start = response.data.start.substring(0, ind_inizio)
          response.data.end = response.data.end.substring(0, ind_fine)


          this.annunci.push(response.data)

          this.data_inizio = ""
          this.data_fine = ""
          this.descrizione = ""
          this.zone = []
          this.CF = ""

          
      })
      .catch((error) => {
          console.log(error)
      })

      setTimeout(() => {this.cliccatoSuPubblica = false}, 2000)
    },

    visualizzaDettagli(event){
      this.visualizzandoDettagli = true
      
      const id_annuncio = event.target.id
      const annunci = this.annunci
      let i
      const dim = annunci.length
      
      for(i=0;i<dim;i++){
        if(annunci[i]._id == id_annuncio) this.annuncioDaVisualizzare = annunci[i]
      }

    },

    cancellaAnnuncio(event){
      if(!confirm("Sei sicuro di voler rimuovere l'annuncio?")) return

      const id_annuncio = event.target.id
      const annunci = this.annunci
      let i
      const dim = annunci.length
      let ind
      
      for(i=0;i<dim;i++){
        if(annunci[i]._id == id_annuncio){
            ind = i
        } 
      }

      this.annunci.splice(ind, 1)

      axios({
        method: 'delete',
        url: 'http://localhost:8081/announcements/'+id_annuncio,
        headers: {
          "x-diana-auth-token": localStorage.token
        }
      })
      .then((response) => {
        console.log("Eliminato: "+response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    aggiungiZona(){
      if(this.newZona != "") this.zone.push(this.newZona)
      this.newZona = ""
    },

    tornaAllaSchermataPrecedente(){
      this.adding = false
      
      this.data_inizio = ""
      this.data_fine = ""
      this.descrizione = ""
      this.zone = []
      this.CF = ""
    }
  },
}
</script>

<style scoped>

.back{
    cursor: pointer;
}

.inserimento{
    border-color: green;
    border-width: 0.04rem;
    /*border-radius: 10px 10px 10px 10px;*/
}

.card{
    border-color: green;
    border-radius: 10px 10px 10px 10px;
}

</style>