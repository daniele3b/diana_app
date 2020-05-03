<template>
 <div class="card   mt-1" >
  <div class="card-header">Segnalazioni</div>
  <div class="card-body">
    <div class="col-md-12">
    <div class="table-responsive">
    <table id="mytable" class="table table-bordred table-striped">
        <thead>
          <th>CF</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Stato</th>
        </thead>
      <tbody>
    
            <tr>
                <td>BFLDNL98T02H501H</td>
                <td>Rifiuti</td>
                <td>3/5/2020</td>
                <td>PRESA IN CARICO</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
            </tr>
            <tr>
                <td>BFLDNL98T02H501H</td>
                <td>Rifiuti</td>
                <td>3/5/2020</td>
                <td>PRESA IN CARICO</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
            </tr>
            <tr>
                <td>BFLDNL98T02H501H</td>
                <td>Rifiuti</td>
                <td>3/5/2020</td>
                <td>PRESA IN CARICO</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
            </tr>
            <tr>
                <td>BFLDNL98T02H501H</td>
                <td>Rifiuti</td>
                <td>3/5/2020</td>
                <td>PRESA IN CARICO</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Detail"><button class="btn btn-success btn-xs" data-title="Detail" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
            </tr>
      </tbody>

      <tr>
        <td>
      <button type="button" class="btn btn-success" id="indietro"> INDIETRO </button>
      </td>
      <td>
       <button type="button" class="btn btn-success" id="aggiugni"> + </button>
      </td>
      <td>
       <button type="button" class="btn btn-success" id="avanti"> AVANTI </button>
       </td>
       </tr>
    </table>
    </div>
  </div>
  </div>
</div>
</template>


<script>
export default {
    name:'Report'

}
</script>




<style scoped>

table tbody tr td {
  font-size: 12px;
  margin: 0;
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

.my-4 {
  border : 1;
  border-color : grey;
}

#mytable{
  font-size: 8;
}



</style>