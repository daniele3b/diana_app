<template>
 <div class="card  mt-1"  onload="getReport();" >
  <div class="card-header">Segnalazioni <router-link v-if="this.citt==false" to="/report_storico"><img src="../assets/storico.png" class="d-none d-sm-block" style="float:right;" height="20px;"></router-link></div>
  <!-- LAYOUT PC-->
  <!-- schermata di visualizzazione in caso di operatore-->
  <div class=" d-none d-sm-block">
  <div v-if="adding==false&&zoomed==false&&editing==false" class="card-body ">
    <div v-if="this.citt==false" class="col-md-12" >
    <div class="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
    <table id="mytable" class="table  "  >
        <!-- intestazione tabella-->
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
          <th>Dett.</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
      <!-- body tabella-->
      <tbody >
            <tr :class="cambiaClasse(rep)" v-for="rep in reports" :key="rep._id">
                <td>{{rep.CF}}</td>
                <td>{{rep.category}}</td>
                <td>{{rep.date}}</td>
                <td>{{rep.status}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep.id_number" class="btn btn-success btn-xs" @click="zoom" data-title="Detail" data-toggle="modal" data-target="#delete" style="height:10px;width:20px;"><span class="glyphicon glyphicon-trash"></span></button></p></td>
                 <td><p data-placement="top" data-toggle="tooltip"  title="Edit"><button :id="rep.id_number" class="btn btn-primary btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" @click="edit" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep.id_number" class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" @click="del"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
            </tr>
      </tbody>

    </table>
    </div>
  </div>

<!-- schermata di visualizzazione in caso di cittadino-->
 <div v-else class="col-md-12" >
    <div class="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
    <table id="mytable" class="table  "  >
      <!-- intestazione tabella-->
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
          <th>Dett.</th>
          <th>Delete</th>
        </thead>
      <!-- body tabella-->
      <tbody >
            <tr  :class="cambiaClasse(rep)" v-for="rep in reports" :key="rep._id">
                <td>{{rep.CF}}</td>
                <td>{{rep.category}}</td>
                <td>{{rep.date}}</td>
                <td>{{rep.status}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep.id_number" class="btn btn-success btn-xs" @click="zoom" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep.id_number" class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" @click="del"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
            </tr>
      </tbody>

    </table>
    </div>
  </div>

  <button type="button" class="btn btn-success mt-1 " id="aggiungi" @click="add"> Aggiungi </button>
  </div>
 

  <!-- schermata di add --->
  <div v-else-if="adding==true &&zoomed==false&&editing==false" class="card-body" style="width:100%;height:400px;" >
            <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;" @click="back" /><b>AGGIUNGI SEGNALAZIONE</b></h5>
            <hr class="my-4">
            <!-- form inserimento-->
            <form class="form-signin">  
                <input type="text" id="address" class="form-control mb-4" v-model="address" placeholder="Inserici il luogo della segnalazione"  required autofocus>
             
                <div class="form-label-group">
                  <select type="option" id="categoria" class="form-control" v-model="category" required>
                    <option value="" disabled selected>CATEGORIA</option>
                    <option value="rifiuti">rifiuti</option>
                    <option value="incendio">incendio</option>
                    <option value="urbanistica">urbanistica</option>
                    <option value="idrogeologia">idrogeologia</option>
                    <option value="altro">altro</option>
                  </select>
                </div>

                <div class="form-label-group mt-4">
                  <textarea id="categoria" class="form-control" v-model="description"  maxlength="200" rows="3" cols="50" placeholder="Descrizione dell'evento (max 200 caratteri)" required/>
                </div>

            <hr class="my-4">
            <center>  <button  v-if="this.addresscheck&&this.descriptioncheck&&this.categorycheck" type="button" style="width:100px"  class="btn btn-lg btn-success btn-block text-uppercase mt-3" @click="addElement">Invia</button>    </center>
            </form> 
            <!-- fine form-->  
           </div>

      <!-- schermata di zoom-->
           <div v-else-if="adding==false &&zoomed==true" class="card-body" style="width:100%;height:400px;" >
                <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;" @click="back" /><b>DETTAGLIO SEGNALAZIONE</b></h5>
               <hr class="my-4">
          <!-- info-->
          <div class="row text-left">
              <div class="col">
                    CF: {{this.CF}}
                    <div class="row mt-1">
                      <div class="col">
                        STATO: {{this.status}}
                      </div>
                    </div>
                    <div class="row  mt-1">
                      <div class="col">
                        CATEGORIA: {{this.category}}
                      </div>
                    </div>
                    <div class="row mt-1">
                      <div class="col">
                        LUOGO: {{this.address}}
                      </div>
                    </div>
                    <div class="row mt-1">
                      <div class="col">
                        DATA: {{this.date}}
                      </div>
                    </div>
                    <div class="row mt-1">
                      <div class="col">
                        DESCRIZIONE:<br> {{this.description}}
                      </div>
                    </div> 
              </div>
          </div>
          <!-- fine info-->
          </div>

      <!-- schermata edit-->
           <div v-else-if="adding==false &&zoomed==false&&editing==true" class="card-body" style="width:100%;height:400px;" >
            <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;"  :id="obj2edit.id_number" @click="back2" /><b>EDITING STATO</b></h5>
            <hr class="my-4">
            <!-- info-->
            <div class="row text-left">
              <div class="col">
                  CF: {{this.CF}}
                  <div class="row ">
                    <div class="col">
                      CATEGORIA: {{this.category}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      LUOGO: {{this.address}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      DATA: {{this.date}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      DESCRIZIONE:<br> {{this.description}}
                    </div>
                  </div>
              </div>
           
              <div class="col" >
                  <div class="row" >
                    STATO: {{this.status}}
                    <select type="option" id="categoria" class="form-control" v-model="status" required>
                    <option disabled value="" >{{this.status}}</option>
                    <option value="in attesa">in attesa</option>
                    <option value="presa in carico">presa in carico</option>
                    <option value="risolto">risolto</option>
                    </select>
                  </div>
                <div class="row">
                  <button  v-if="this.status!=''" type="button"   class="btn btn-xs btn-success mt-1" @click="editConfermato">Salva</button>   
                </div>
              </div>
              </div>
              <!-- fine info-->
                
         </div>
         
              <div v-if="loading" class="card-body"><b>Caricamento in corso...</b></div>
           </div>

<!-- LAYOUT TELEFONO -->


  <div class="d-block d-sm-none ">
  <!-- schermata visualizzazione se operatore-->
   <div v-if="adding==false&&zoomed==false&&editing==false" class="card-body ">
    <div v-if="this.citt==false" class="col-md-12" >
    <div class="table-responsive ">
    <table id="mytable" class="table  "  >
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
          <th>Dett.</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
      
      <tbody >
            <tr  :class="cambiaClasse(rep)" v-for="rep in reports" :key="rep._id">
                <td>{{rep.CF}}</td>
                <td>{{rep.category}}</td>
                <td>{{rep.date}}</td>
                <td>{{rep.status}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep.id_number" class="btn btn-success btn-xs" @click="zoom" data-title="Detail" data-toggle="modal" data-target="#delete" style="height:10px;width:20px;"><span class="glyphicon glyphicon-trash"></span></button></p></td>
                 <td><p data-placement="top" data-toggle="tooltip"  title="Edit"><button :id="rep.id_number" class="btn btn-primary btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" @click="edit" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep.id_number" class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" @click="del"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
            </tr>
      </tbody>
    </table>
    </div>
    </div>

<!-- schermata visualizzazione se cittadino-->
 <div v-else class="col-md-12" >
    <div class="table-responsive ">
    <table id="mytable" class="table  "  >
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
          <th>Dett.</th>
          <th>Delete</th>
        </thead>
      
      <tbody >
            <tr :class="cambiaClasse(rep)" v-for="rep in reports" :key="rep._id">
                <td>{{rep.CF}}</td>
                <td>{{rep.category}}</td>
                <td>{{rep.date}}</td>
                <td>{{rep.status}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep.id_number" class="btn btn-success btn-xs" @click="zoom" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep.id_number" class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" @click="del"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
            </tr>
      </tbody>
    </table>
    </div>
    </div>

    <button type="button" class="btn btn-success mt-1 " id="aggiungi" @click="add"> Aggiungi </button>
  </div>
 

  <!-- schermata di add --->
  <div v-else-if="adding==true &&zoomed==false&&editing==false" class="card-body" style="width: 420px; " >
            <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;" @click="back" /><b>AGGIUNGI SEGNALAZIONE</b></h5>
            <hr class="my-4">
            <!-- inizio form-->
            <form class="form-signin">  
              <input type="text" id="address" class="form-control mb-4" v-model="address" placeholder="Inserici il luogo della segnalazione"  required autofocus>
             
              <div class="form-label-group">
                <select type="option" id="categoria" class="form-control" v-model="category" required>
                  <option value="" disabled selected>CATEGORIA</option>
                  <option value="rifiuti">rifiuti</option>
                  <option value="incendio">incendio</option>
                  <option value="urbanistica">urbanistica</option>
                  <option value="idrogeologia">idrogeologia</option>
                  <option value="altro">altro</option>
                </select>
              </div>

              <div class="form-label-group mt-4">
                <textarea id="categoria" class="form-control" v-model="description"  maxlength="200" rows="3" cols="50" placeholder="Descrizione dell'evento (max 200 caratteri)" required/>
              </div>

            <hr class="my-4">
            <center>  <button  v-if="this.addresscheck&&this.descriptioncheck&&this.categorycheck" type="button" style="width:100px"  class="btn btn-lg btn-success btn-block text-uppercase mt-3" @click="addElement">Invia</button>    </center>
            </form>   
            <!-- fine form-->
           </div>

      <!-- schermata di zoom-->
        <div v-else-if="adding==false &&zoomed==true" class="card-body" style="width: 420px; " >
            <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;" @click="back" /><b>DETTAGLIO SEGNALAZIONE</b></h5>
            <hr class="my-4">
            
          <div class="row text-left">
              <div class="col">
                  CF: {{this.CF}}
                  <div class="row mt-1">
                    <div class="col">
                      STATO: {{this.status}}
                    </div>
                  </div>
                  <div class="row  mt-1">
                    <div class="col">
                      CATEGORIA: {{this.category}}
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col">
                      LUOGO: {{this.address}}
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col">
                      DATA: {{this.date}}
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col">
                      DESCRIZIONE:<br> {{this.description}}
                    </div>
                  </div>
              </div> 
          </div>
        </div>

<!-- schermata edit-->
           <div v-else-if="adding==false &&zoomed==false&&editing==true" class="card-body" style="width: 420px; " >
            <h5 class="card-title text-center"><img src="../assets/back.png" style="float:left;cursor:pointer;" height="20px;" @click="back2" :id="obj2edit.id_number" /><b>EDITING STATO</b></h5>
            <hr class="my-4">

            <!--info-->
            <div class="row text-left">
              <div class="col">
                CF: {{this.CF}}
                <div class="row ">
                  <div class="col">
                    CATEGORIA: {{this.category}}
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    LUOGO: {{this.address}}
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    DATA: {{this.date}}
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    DESCRIZIONE:<br> {{this.description}}
                  </div>
                </div>
              </div>
           
              <div class="col">
                <div class="row">
                  STATO: {{this.status}}
                  <select type="option" id="categoria" class="form-control" v-model="status" required>
                  <option disabled value="" >{{this.status}}</option>
                  <option value="in attesa">in attesa</option>
                  <option value="presa in carico">presa in carico</option>
                  <option value="risolto">risolto</option>
                  </select>
                </div>
                <div class="row">
                  <button  v-if="this.status!=''" type="button"   class="btn btn-xs btn-success mt-1" @click="editConfermato">Salva</button>   
                </div>
              </div>
            </div>
            <!-- fine info-->
         </div>
        <div v-if="loading" class="card-body"><b>Caricamento in corso...</b></div>
              
</div>
<!-- fine layout telefono-->
</div>
<!-- fine container/card-->
</template>


<script>

import axios from 'axios'


export default {
    name:'Report',
    data() {
        return {
         reports:[],
         adding:false,
         address:'',
         category:'',
         description:'',
         addresscheck:false,
         categorycheck:false,
         descriptioncheck:false,
         zoomed:false,
         CF:'',
         date:'',
         status:'',
         editing:false,
         obj2edit:{},
         citt:false,
         loading:false,
         t:null,
         toBeDestroy:null,
         classeRiga:''
         
        }
    },
    watch:{
      address: function(){
        if(this.address!='')
        {
          this.addresscheck=true
        }else
        {
          this.addresscheck=false
        }
      },
      category: function(){
        if(this.category!='')
        {
          this.categorycheck=true
        }else
        {
          this.categorycheck=false
        }
      },
       description: function(){
        if(this.description!='')
        {
          this.descriptioncheck=true
        }else
        {
          this.descriptioncheck=false
        }
      }
    },
    mounted: 
      function getReport(){ 

        //se sono cittadino faccio get delle mie segnalazioni
        if(localStorage.getItem('type')=='cittadino')
          this.citt=true

        if(this.citt==false){
        let data=new Date()

        let month=data.getMonth()+1
        let day=data.getDate()
        let year=data.getFullYear()
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day

          axios({
            method: 'get',
            url: 'http://localhost:8081/report/filter/date/'+year+'-'+month+'-'+day,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 

           let i=0
           for(i=0;i<response.data.length;i++)
           {
             this.reports.push(response.data[i])
            
           }

            //sistemo i dati per la visualizzazione
           for(i=0;i<this.reports.length;i++)
           {
             var res = this.reports[i].date.split("T");
             this.reports[i].date=res[0]
             this.reports[i].status=this.reports[i].status.toUpperCase()
             this.reports[i].category=this.reports[i].category.toUpperCase()
           }
           //console.log(this.reports)

          })
            .catch((error) => {
              if(error.status==404)
              console.log('NO data')
           
          })}else //se sono un operatore faccio get di tutte le segnalazioni giornaliere
          {
            axios({
            method: 'get',
            url: 'http://localhost:8081/report/',
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 

           let i=0
           for(i=0;i<response.data.length;i++)
           {
             this.reports.push(response.data[i])
           }
          //pulisco dati
           for(i=0;i<this.reports.length;i++)
           {
             var res = this.reports[i].date.split("T");
             this.reports[i].date=res[0]
             this.reports[i].status=this.reports[i].status.toUpperCase()
             this.reports[i].category=this.reports[i].category.toUpperCase()
           }

           //console.log(this.reports)

          })
            .catch((error) => {
              if(error.status==404)
              console.log('NO data')

          })
          }
         
      },
      methods: {
        zoom: function(event)
        {
          //switch schermata
          this.zoomed=true;

          var ind = this.reports.findIndex(i => i.id_number ==event.target.id);

          let obj=this.reports[ind]
          //console.log(obj)

          this.address=obj.address
          this.date=obj.date
          this.category=obj.category
          this.description=obj.description
          this.CF=obj.CF
          this.status=obj.status
          //console.log('zoom'+event.target.id)
        },
        
        edit: function(event)
        {
          
          var ind = this.reports.findIndex(i => i.id_number ==event.target.id);
        
          this.toBeDestroy=event.target.id

          //provo a settare il token
          axios({
              method: 'post',
              url: 'http://localhost:8081/token/setToken/report/'+this.reports[ind].id_number,
              headers: {
                "x-diana-auth-token": localStorage.token
              }
            }).then(() => {

                //entro nella schermata edit
                  this.obj2edit=this.reports[ind]

                  this.address=this.obj2edit.address
                  this.date=this.obj2edit.date
                  this.category=this.obj2edit.category
                  this.description=this.obj2edit.description
                  this.CF=this.obj2edit.CF
                  this.status=this.obj2edit.status
                  this.editing=true;

            })
              .catch(() => {
              //non entro, e aggiorno i dati
              alert('Report gestito da un altro operatore')
              this.updateData()
            })

         

        },
        //serve per marcare le segnalazioni bloccate
        cambiaClasse:function(rep)
        {
          if(rep.token!='')
            return "bg-secondary"
          else
            return ""
        },
        //rimuovo il token
        rimuoviToken:function(id){
          axios({
                    method: 'delete',
                    url: 'http://localhost:8081/token/deleteToken/report/'+id,
                    headers: {
                      "x-diana-auth-token": localStorage.token
                    }
                  }).then(() => {
                    console.log('Token tolto')
                  
                  }).catch(() => {
                    console.log('NESSUN TOKEN RIMUOVERE')
                  })
                      

        },
        
        editConfermato: function()
        {

        this.obj2edit.addres=this.address
        this.obj2edit.date=this.date
        this.obj2edit.category=this.category
        this.obj2edit.description=this.description
        this.obj2edit.CF=this.CF

        
         axios({
            method: 'put',
            url: 'http://localhost:8081/report/'+this.obj2edit.id_number,
            headers: {
              "x-diana-auth-token": localStorage.token
            },
             data: {
               status:this.status
            }
          }).then(() => {
               
                
            //rimuovo il token
            this.rimuoviToken(this.obj2edit.id_number)          
            var ind = this.reports.findIndex(i =>  i==this.obj2edit);

            this.reports[ind].status=this.status.toUpperCase()
            this.updateData()
            this.editing=false
                

          })
            .catch((error) => {
              console.log(error)
              alert('Sessione scaduta!')
              this.updateData()
              this.editing=false
          })
       
      

        },

        del: function(event)
        {
         // console.log(event.target.id)

        this.toBeDestroy=event.target.id

            //provo a settare il token
        axios({
            method: 'post',
            url: 'http://localhost:8081/token/setToken/report/'+event.target.id,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then(() => {
                  var r = confirm("Sei sicuro di voler eliminare la segnalazione?");
                  if (r == true) {
                    
                    //Se elimino faccio la chiamata
                  axios({
                              method: 'delete',
                              url: 'http://localhost:8081/report/'+event.target.id,
                              headers: {
                                "x-diana-auth-token": localStorage.token
                              }
                            }).then((response) => { 
                                   console.log(response)
                                   this.updateData()
                                   this.rimuoviToken(event.target.id)
                            })//se delete a male
                            .catch(() => {
                              alert("Sessione scaduta!")
                              this.updateData()
                              
                        })
                  }else //Se annullo la cancellazione
                  {
                    console.log('Era uno scherzo !')
                    this.rimuoviToken(event.target.id)
                    //rimuovo il token
                    this.updateData()
                    
                  }
        }).catch(()=>{
             alert('Report gestito da un altro operatore')

        })

        
        },

        updateData: function (){

          if(this.citt==false){

       console.log('Timer 1')
       
        
        this.loading=true

        this.reports=[]
        

        let data=new Date()

        let month=data.getMonth()+1
        let day=data.getDate()
        let year=data.getFullYear()
        
        if(month<10)
          month='0'+month
        if(day<10)
          day='0'+day

          axios({
            method: 'get',
            url: 'http://localhost:8081/report/filter/date/'+year+'-'+month+'-'+day,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 

           let i=0
           for(i=0;i<response.data.length;i++)
           {
             this.reports.push(response.data[i])
            
           }




           for(i=0;i<this.reports.length;i++)
           {
             var res = this.reports[i].date.split("T");
             this.reports[i].date=res[0]
             this.reports[i].status=this.reports[i].status.toUpperCase()
             this.reports[i].category=this.reports[i].category.toUpperCase()
           }
           

          })
            .catch((error) => {
            console.log(error)
          })
          }else //aggiornamento se è un cittadino
          {
            
            this.reports=[]
           axios({
            method: 'get',
            url: 'http://localhost:8081/report/',
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 

           let i=0
           for(i=0;i<response.data.length;i++)
           {
             this.reports.push(response.data[i])
            
           }

           for(i=0;i<this.reports.length;i++)
           {
             var res = this.reports[i].date.split("T");
             this.reports[i].date=res[0]
             this.reports[i].status=this.reports[i].status.toUpperCase()
             this.reports[i].category=this.reports[i].category.toUpperCase()
           }

           console.log(this.reports)

          })
            .catch((error) => {
              if(error.status==404)
              console.log('NO data')

          })
          }
   
          this.loading=false

        },

         add: function(event)
        {
          console.log(event.target.id)
          this.adding=true
          
        },

        back: function()
        {
         
          this.address=''
          this.category='---'
          this.description=''
          this.date=''
          this.description=''
          this.CF=''
          this.status=''

          this.updateData()
          this.adding=false
          this.zoomed=false
          
          this.editing=false
          
        },
        
        back2: function(event)
        {
          this.rimuoviToken(event.target.id)
          this.address=''
          this.category='---'
          this.description=''
          this.date=''
          this.description=''
          this.CF=''
          this.status=''

          this.updateData()
          this.adding=false
          this.zoomed=false
          
          this.editing=false
          
        },


          addElement: function()
        {

          if(this.description!=''&& this.category!='' &&this.address!=''){
          axios({
            method: 'post',
            url: 'http://localhost:8081/report/',
             headers: {
              "x-diana-auth-token": localStorage.token
            },
            data: {
                address: this.address,
                category: this.category,
                description:this.description
            }
            }).then((response) => {
              response.data.category=response.data.category.toUpperCase()
              response.data.status=response.data.status.toUpperCase()
                var res = response.data.date.split("T");
                  response.data.date=res[0]
           
              this.reports.push(response.data)
                
                
            }, () => {
                alert("Hai raggiunto il numero massimo di segnalazioni giornaliere")
            }); 

            this.address=''
            this.category='---'
            this.description=''
            this.adding=false
          }else
          {
            alert('Non puoi inserire valori vuoti!')

          }

          //this.updateData()
          
          
        }
      }

       
      
 

}


</script>




<style scoped>

.my-custom-scrollbar {
height:320px;
width:100%;
overflow: auto;

}
.table-wrapper-scroll-y {
display: block;
}

.card{
  padding:0;
  border-radius: 10px;
  border-color: green;

}

table tbody tr td {
  font-size: 12px;
  margin: 0;
  
}

table{
  padding-bottom: 0;
}
table thead {
  padding:0;
  font-size: 15px;
  position: sticky; top: 0;
  overflow-y: auto; 
  background-color:#f5f5f5;
  border:  1 grey;
  
}

.card-signin {
  font-size: 8;
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  font-weight: 300;
  
}

.card-signin .card-body {
  padding: 0;
}


.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 0;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 0;
}

.form-label-group input {
  border-radius: 2rem;
}



#mytable{
  font-size: 8;
}

.table-responsive{
  padding-bottom: 0;

}
</style>