<template>
 <div class="card  mt-1"  onload="getReport();" >
  <div class="card-header">Segnalazioni</div>
  <div v-if="adding==false" class="card-body">
    <div class="col-md-12">
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
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep.id_number" class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                 <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep.id_number" class="btn btn-primary btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button :id="rep.id_number" class="btn btn-danger btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" @click="del"><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
               
                
            </tr>
      </tbody>
    </table>
    </div>
  </div>
    <button type="button" class="btn btn-success mt-1 " id="aggiungi" @click="add"> Aggiungi </button>
  </div>
  <div v-else class="card-body" style="width:500px;height:400px;" >
  
            <h5 class="card-title text-center"><b>AGGIUNGI SEGNALAZIONE</b></h5>
               <hr class="my-4">
            <form class="form-signin">
              <div class="form-label-group mb-4">
                <input type="text" id="address" class="form-control" v-model="address" placeholder="Inserici il luogo della segnalazione"  required autofocus>
              </div>

              <div class="form-label-group">
                <select type="option" id="categoria" class="form-control" v-model="category" required>
                  <option disabled value="" >---</option>
                  <option value="rifiuti">rifiuti</option>
                  <option value="incendio">incendio</option>
                  <option value="urbanistica">urbanistica</option>
                  <option value="idrogeologia">idrogeologia</option>
                  <option value="altro">altro</option></select>
              </div>


                <div class="form-label-group mt-4">
                <textarea id="categoria" class="form-control" v-model="description"  rows="3" cols="50" placeholder="Descrizione dell'evento (max 150 cartteri)" required/>
            
              </div>

            <hr class="my-4">
              <button  type="button" class="btn btn-lg btn-success btn-block text-uppercase mt-3" @click="addElement">Invia</button>    
            </form>   
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
        }
    },

    mounted: 
      function getReport(){ 
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
            alert("GET report"+error)
          })

        //  setInterval(this.updateData, 60000);
      },
      methods: {

        del: function(event)
        {
          console.log(event.target.id)

           axios({
            method: 'delete',
            url: 'http://localhost:8081/report/'+event.target.id,
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 
            let ind=this.reports.indexOf(event.target.if);
            this.reports.splice(ind+1,1)
            console.log(response)

          })
            .catch((error) => {
            alert("Delete"+error)
          })
        },

        updateData: function (){

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
            console.log(this.reports)

          })
            .catch((error) => {
            alert("GET report"+error)
          })
          

        },

         add: function(event)
        {
          console.log(event.target.id)
          this.adding=true
          
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
                console.log(response)
                
            }, (error) => {
                alert("Errore richiesta:\n"+error.message)
            }); 
            this.adding=false
          }else
          {
            alert('Non puoi inserire valori vuoti!')

          }
          
          
        }
      }

}


</script>




<style scoped>

.my-custom-scrollbar {
height:320px;
width:650px;
overflow: auto;
overflow-x: hidden; 
}
.table-wrapper-scroll-y {
display: block;
}

.card{
  padding:0;
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