<template>
 <div class="container">
  <div class="row" >
    <div class="col-12 col-sm-8 col-md-6 col-lg-4" >
      <div class="card" onload="getReport();" >
        <h5 style="padding-top:10px;">Raggi UV</h5>
        <hr style="margin:0;">
        Oggi <br>
        {{valore}} alle {{data}}

        <table>
          <tr>
            <td class="colonna-mario-prima" style="color:red;">
                {{this.giorni[this.oggi+1]}}
            </td>
            <td class="colonna-mario" style="color:red;">
                {{this.giorni[this.oggi+2]}}
            </td>
            <td class="colonna-mario" style="color:red;">
                {{this.giorni[this.oggi+3]}}
            </td>
          </tr>

          <tr>
            <td class="colonna-mario-prima" style="color:blue;">
                {{forecast[0]}}
            </td>
            <td class="colonna-mario" style="color:blue;">
                {{forecast[1]}}
            </td>
            <td class="colonna-mario" style="color:blue;">
                {{forecast[2]}}
            </td>
          </tr>

          <tr>
            <td class="colonna-mario" style="color:red;">
                {{this.giorni[this.oggi+4]}}
            </td>
            <td class="colonna-mario" style="color:red;">
                {{this.giorni[this.oggi+5]}}
            </td>
            <td class="colonna-mario" style="color:red;">
                {{this.giorni[this.oggi+6]}}
            </td>
          </tr>
                    
          <tr>
            <td class="colonna-mario" style="color:blue;">
                {{forecast[3]}}
            </td>
            <td class="colonna-mario" style="color:blue;">
                {{forecast[4]}}
            </td>
            <td class="colonna-mario" style="color:blue;">
                {{forecast[5]}}
            </td>
          </tr>

        </table>
        

      </div> 
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name:'UV',
    data() {
        return {
          valore: '',
          data:'',
          forecast:['','','','','','',''],
          oggi:'',
          giorni:['Dom','Lun','Mar','Mer','Gio','Ven','Sab','Dom','Lun','Mar','Mer','Gio','Ven','Sab','Dom']
        }
    },
    mounted: 
      async function getReport(){ 
          axios({
            method: 'get',
            url: 'http://localhost:8081/weather/uv/real_time',
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 
            this.valore = response.data.value
            var idx = response.data.date_iso.indexOf('T')

            this.data = response.data.date_iso.substr(idx+1,5)
          })
          .catch((error) => {
            alert("UV error "+error)
          })

          axios({
            method: 'get',
            url: 'http://localhost:8081/weather/uv/forecast',
            headers: {
              "x-diana-auth-token": localStorage.token
            }
          }).then((response) => { 
            var i
            for(i=0;i<7;i++) this.forecast[i] = response.data[i].value  
            var data = new Date()
            this.oggi = data.getDay()
          })
          .catch((error) => {
            alert("UV error "+error)
          })
      }
      
}
</script>



<style scoped>


.container {
  width: 100%;
}

.card {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 200px;
  background-image: url('../../images/immmeteo.jpg');
  
  
}


.temperatura{
  text-align: right;
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


</style>