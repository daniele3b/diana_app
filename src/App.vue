<template>
  <div id="app">
    <!--menu-->

  <!--Navbar-->
  <nav class="navbar navbar-light navbar-1 black bg-success">

  <!-- Navbar brand -->
  <a class="navbar-brand" href="#"  ><img src="./assets/logo.svg" height="50px" > DIANA</a>

  <!-- Collapse button -->
  <button v-if="isLogged == true" class="navbar-toggler border border-dark " type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
    aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation" id="hamburger" @click="setClicked" :style="coloreMenu" ><span class="navbar-toggler-icon"></span></button>

  <!-- Collapsible content -->
  <div v-if="isLogged == true" class="collapse navbar-collapse " id="navbarSupportedContent15">

    <!-- Links -->
    
    <ul class="navbar-nav mr-auto bg-success border border-dark pl-3 pr-3" style="position:relative; z-index: 1;float:right;">
      
      <li class="nav-item " >
        <router-link  to="/" class="nav-link " href="#">Home </router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/about" class="nav-link" href="#">About </router-link>
      </li>
       <li class="nav-item">
        <router-link  to="/logout" class="nav-link" href="#">Logout </router-link>
      </li>

    </ul>
  
    <!-- Links -->

  </div>
  <!-- Collapsible content -->

</nav>


    <!-- PARTE CHE DEVE VARIARE-->
    <div class="container-fluid  ">
       <transition
        name="fade"
        mode="out-in"
      >
         
    <router-view/>
    </transition>
    </div>

    <!-- --->

    <!-- footer-->
  </div>
</template>


<script>
import { mapGetters} from 'vuex'


export default {
  name : 'app',
  components : {
  },

  created(){
    this.checkAccess()
  },

  data () {
    return {
      logged : false,
      menuclicked:false,
      coloreMenu:''
    }
  },
  computed : {
    ...mapGetters({
        'isLogged' : 'getLogged',
        'isClicked': 'getMenu'
    }),
  },

  methods : {
    checkAccess(){
      if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
        localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
        localStorage.getItem('type') != undefined){
        
        this.$store.commit('setLogged', true)
      }
      else this.$store.commit('setLogged', false)
    },
    setClicked(){
      if(this.isClicked==false){
       this.$store.commit('setMenu',true)
       this.coloreMenu="background-color: #238521;"
       console.log(this.isClicked)
      }
      else  {
        this.$store.commit('setMenu',false)
        this.coloreMenu=""
         console.log(this.isClicked)
      }

    }
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.navbar{
  height: 70px;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

#hamburger:hover{
background-color: #238521;

}
</style>

<!-- -->