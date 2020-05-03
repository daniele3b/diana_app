<template>
 <div class="card  mt-1"  onload="getReport();" >
  <div class="card-header">Segnalazioni</div>
  <div class="card-body">
    <div class="col-md-12">
    <div class="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
    <table id="mytable" class="table  "  >
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
          <th>Dett.</th>
          <th>Delete</th>
          <th>Edit</th>
        </thead>
      
      <tbody >
            <tr v-for="rep in reports" :key="rep._id">
                <td>{{rep.CF}}</td>
                <td>{{rep.category}}</td>
                <td>{{rep.date}}</td>
                <td>{{rep.status}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button :id="rep._id" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil" ></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button :id="rep._id" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button :id="rep._id" class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
            </tr>
      </tbody>
    </table>
    </div>
  </div>
     <button type="button" class="btn btn-success mr-1" id="indietro"> INDIETRO </button>
    <button type="button" class="btn btn-success mr-1" id="aggiungi"> + </button>
    <button type="button" class="btn btn-success" id="avanti"> AVANTI </button>
  </div>
</div>
</template>


<script>

import axios from 'axios'

export default {
    name:'Report',
    data() {
        return {
         reports:[]
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
            console.log(this.reports)

          })
            .catch((error) => {
            alert("ewwew"+error)
          })
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
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 0;
}

.form-signin {
  width: 100%;
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
  height: auto;
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