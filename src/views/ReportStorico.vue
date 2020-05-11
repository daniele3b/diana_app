<template>
 <div class="card  mt-1 border-success"  onload="getReport();" >
  <div class="card-header">Storico segnalazioni <router-link v-if="adding==false&&zoomed==false&&editing==false&&filter==false" to="/dashboard"><img src="../assets/back.png" style="float:left;" height="20px;"></router-link><img  v-if="filteractive==false&&filter==false"   @click="filtering" src="../assets/filter.png" style="float:right;  cursor: pointer;" height="22px;" > <img   v-if="filteractive==true"  @click="removeFilter" src="../assets/nofilter.png" style="float:right;cursor:pointer;" height="22px;" ></div>
  <!-- schermata di visualizzazione-->
  <div v-if="adding==false&&zoomed==false&&editing==false&&filter==false" class="card-body">
    <div class="col-md-12" >
    <div class="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
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
            <tr v-for="rep in reports" :key="rep._id">
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


  </div>
 


      <!-- schermata di zoom-->
           <div v-else-if="adding==false &&zoomed==true&&filter==false" class="card-body" style="width:100%;height:520px;" >
            <h5 class="card-title text-center"><a href="#"><img src="../assets/back.png" style="float:left;" height="20px;" @click="back" /></a><b>DETTAGLIO SEGNALAZIONE</b></h5>
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

           <div v-else-if="adding==false &&zoomed==false&&editing==true&&filter==false" class="card-body" style="width:100%;height:520px;" >
            <h5 class="card-title text-center"><a href="#"><img src="../assets/back.png" style="float:left;" height="20px;" @click="back" /></a><b>EDITING STATO</b></h5>
            <hr class="my-4">
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
              </div>
              
              <!-- schermata filter-->

           <div v-else-if="adding==false &&zoomed==false&&editing==false&&filter==true" class="card-body" style="width:100%;height:520px;" >
            
            <h5 class="card-title text-center"><a href="#"><img src="../assets/back.png" style="float:left;" height="20px;" @click="back" ></a><b>APPLICA FILTRI</b></h5>
            <center>
            <div class="card-body" >
              <div id="box" style="width:300px;">
             
            <div class="row mt-4" >
            
                <div class="col">
              <input type="text" id="address" class="form-control " minlength="16" maxlength="16" v-model="CF2filter" placeholder=" CF"  required autofocus>
        
                  </div>
                 
                </div>
                 <div class="row mt-3">
                
                <div class="col">
                  <select type="option" id="categoria" class="form-control" v-model="cat2filter" required>
                  <option disabled value="" >CATEGORIA</option>
                  <option value="incendio">incendio</option>
                  <option value="rifiuti">rifiuti</option>
                  <option value="urbanistica">urbanistica</option>
                  <option value="idrogeologia">idrogeologia</option>
                  <option value="altro">altro</option>
                 
                </select>
                </div>
                
                </div>
                <div class="row mt-3">
                 
                <div class="col">
                 <select type="option" id="categoria" class="form-control" v-model="status2filter" required>
                  <option disabled value="" >STATO</option>
                  <option value="in attesa">in attesa</option>
                  <option value="presa in carico">presa in carico</option>
                  <option value="risolto">risolto</option>
                </select>
                  <div class="row mt-3">
                <div class="col">
                  Data di inizio: <input type="date" name="mydatetime" v-model="data_inizio">
                </div>
                <div class="col">
                    Data di fine: <input type="date" name="mydatetime" v-model="data_fine">
                 </div>
                </div>
                </div>
                </div>
           </div>
        </div>
         </center>
      
                   <center>    <button   type="button"   class="btn btn-xs btn-success  mt-3 p-2" @click="filterConfermato">Applica</button> </center>
              
                
                
               
         
           
            </div>
                
                   
               
             
          
              
              
                  
                  
             
              

      
 
             
          
 
</div>

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
         CF2filter:'',
         CF:'',
         date:'',
         status:'',
         editing:false,
         obj2edit:{},
         app:[],
         status2filter:'',
         cat2filter:'',
         filteractive:false,
         filter:false,
         data_inizio:'',
         data_fine:'',
         t:null
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

        // this.t= setInterval(this.updateData, 60000);
      },
      methods: {
        filtering: function()
        {
          this.filter=true;
          console.log('filter actived')
        },
        zoom: function(event)
        {
          this.zoomed=true;
          var ind = this.reports.findIndex(i => i.id_number ==event.target.id);

          let obj=this.reports[ind]
          console.log(obj)

          this.address=obj.address
          this.date=obj.date
          this.category=obj.category
          this.description=obj.description
          this.CF=obj.CF
          this.status=obj.status
          console.log('zoom'+event.target.id)
        },
        edit: function(event)
        {
          this.editing=true;
          var ind = this.reports.findIndex(i => i.id_number ==event.target.id);

          this.obj2edit=this.reports[ind]

          this.address=this.obj2edit.address
          this.date=this.obj2edit.date
          this.category=this.obj2edit.category
          this.description=this.obj2edit.description
          this.CF=this.obj2edit.CF
          this.status=this.obj2edit.status

        },
        editConfermato: function(){
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
          }).then((response) => {
           console.log(response)

          })
            .catch((error) => {
              console.log(error)
          })
       

        var ind = this.reports.findIndex(i =>  i==this.obj2edit);

        this.reports[ind].status=this.status.toUpperCase()
        this.editing=false

        },

        del: function(event)
        {
         // console.log(event.target.id)
          var r = confirm("Sei sicuro di voler eliminare la segnalazione?");
          if (r == true) {
    
         // console.log(event.target.id)
          var ind = this.reports.findIndex(i => i.id_number ==event.target.id);

    
            //console.log(ind)
             this.reports.splice(ind,1)
            
 
           axios({
            method: 'delete',
            url: 'http://localhost:8081/report/'+event.target.id,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 

           
           
           
            
            console.log(response)

          })
            .catch((error) => {
            alert("Delete"+error)
          })
          }else
          {
            console.log('Era uno scherzo !')
          }
        },

        updateData: function (){


          if(this.editing==false&&this.adding==false){
          console.log('Timer 2')
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
            alert("GET report"+error)
          })
             }
          

        },

         add: function(event)
        {
          console.log(event.target.id)
          this.adding=true
          
        },
         filterConfermato: function()
        {
        
        if(this.CF2filter!=''||this.status2filter!=''||this.data_inizio!=''||this.data_fine!=''||this.cat2filter!=''){
        this.app=this.reports
        this.reports=[]
         let i=0;

         console.log(this.data_inizio)
        
         for(i=0;i<this.app.length;i++){
           //Se ho solo cf
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter=='')
                {
                    if(this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
            //se ho cf e stato
            if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter=='')
                {
                    if(this.app[i].CF==(this.CF2filter.toUpperCase())&& this.app[i].status==(this.status2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
            //se ho solo stato
            if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter=='')
                {
                     if(this.app[i].status==(this.status2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
              //se ho solo data inizio e fine
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter=='')
                {
                
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio)
                     {
                        
                        this.reports.push(this.app[i])
                     }
                }
              //se ho CF e data inizio e fine
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }  


                  //se ho CF e data inizio 
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter=='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }  
            //se ho CF e data fine
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }  

                
                //se ho stato e data inizio e fine
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                } 

                   //se ho stato e data inizio 
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter=='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                } 


                  //se ho stato e data fine
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].status==(this.status2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                } 
              //se ho cf stato inizio e fine
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
                //se ho solo data inizio
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter=='')
                {
                     if(this.app[i].date>=this.data_inizio)
                        this.reports.push(this.app[i])
                }
                //se ho solo data fine
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter=='')
                {
      
                     if(this.app[i].date<=this.data_fine)
                        this.reports.push(this.app[i])
                }

                //se ho tutto
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

              //se cf stato iniz cat 
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

              //se ho cf stato cat fin
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

              //se ho cf ct fin iniz
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
              //se ho status ini fin cat
                   if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

              //se ho cf stato cat
                   if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

              //se ho cf stato inizio fine
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                  //se ho cf stato fine
             if(this.CF2filter!=''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter=='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].CF==(this.CF2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                //se ho solo cat
        
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
                  //se ho cat e stato
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                  //se ho cf e cat
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
                  //se ho inizio e cat
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }
                //se ho fine e cat
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                //se cat ini e fine
             if(this.CF2filter==''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].date>=this.data_inizio&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                  //se cat inizio stato
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                  //se cat fine stato
             if(this.CF2filter==''&& this.status2filter!=''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].status==(this.status2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }

                  //se cf cat fine
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio==''&&this.data_fine!=''&&this.cat2filter!='')
                {
                     if(this.app[i].date<=this.data_fine&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }


                
                //se cf cat inizio
             if(this.CF2filter!=''&& this.status2filter==''&&this.data_inizio!=''&&this.data_fine==''&&this.cat2filter!='')
                {
                     if(this.app[i].date>=this.data_inizio&&this.app[i].CF==(this.CF2filter.toUpperCase())&&this.app[i].category==(this.cat2filter.toUpperCase()))
                        this.reports.push(this.app[i])
                }


                

         }
         console.log(this.reports)
          this.filter=false
          this.filteractive=true
        }else{
          this.filter=false
        }
          
        },
        removeFilter: function()
        {
            this.CF2filter=''
            this.status2filter=''
            this.reports=this.app
            this.data_inizio=''
            this.data_fine=''
            this.cat2filter=''
            this.app=[]
            this.filteractive=false

        },

        back: function(event)
        {
          console.log(event.target.id)
          this.address=''
          this.category='---'
          this.description=''
          this.date=''
          this.description=''
          this.CF=''
          this.CF2filter=''
          this.status=''
          this.data_inizio=''
          this.data_fine=''
          this.cat2filter=''
          this.status2filter=''
          this.adding=false
          this.zoomed=false
          this.editing=false
          this.filter=false
          
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
                
                
            }, (error) => {
                alert("Errore richiesta:\n"+error.message)
            }); 

            this.address=''
            this.category='---'
            this.description=''
            this.adding=false
          }else
          {
            alert('Non puoi inserire valori vuoti!')

          }
          
          
        }
      },
      beforeDestroy()
      {
         console.log('Timer 2')
        clearTimeout(this.t);
      }

}


</script>




<style scoped>

.my-custom-scrollbar {
height:540px;
width:100%;
overflow: auto;

}
.table-wrapper-scroll-y {
display: block;
}

.card{
  padding:0;
  border-radius: 10px;

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

.my-4 {
  border : 1;
  border-color : grey;
}

#mytable{
  font-size: 8;
}

.table-responsive{
  padding-bottom: 0;

}
</style>