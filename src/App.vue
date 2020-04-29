<template>
  <div id="app">
    <!--menu-->

  <!--Navbar-->
  <nav class="navbar navbar-light navbar-1 black bg-success">

  <!-- Navbar brand -->
  <a class="navbar-brand" href="#"><img src="./assets/logo.svg"> DIANA</a>

  <!-- Collapse button -->
  <button v-if="isLogged == true" class="navbar-toggler border border-dark " type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
    aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>

  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="navbarSupportedContent15">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link  to="/" class="nav-link" href="#">Home </router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/about" class="nav-link" href="#">About </router-link>
      </li>
    </ul>
    <!-- Links -->

  </div>
  <!-- Collapsible content -->

</nav>
<!--/.Navbar-->
    <!-- -->

    <!-- PARTE CHE DEVE VARIARE-->
    <div class="container-fluid ">
    <router-view/>
    </div>

    <!-- --->

    <!-- footer-->
  </div>
</template>


<script>
import {mapGetters} from 'vuex'


export default {
  name : 'app',
  components : {
  },
  data () {
    return {
      logged : false
    }
  },
  computed : {
    ...mapGetters({
        'isLogged' : 'getLogged',
    }),
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
</style>

<!-- -->