<template>
 
 <div class="container">
    <div class="row">
        <div class="col">
            404 NOT FOUND
        </div>
    </div>
    <div class="row">
        <div class="col">
             PER DIANA!
        </div>
    </div>
</template>

<script>

export default {
  name: '404',

  mounted()
  {
      setTimeout(this.cambiaPagina,5000)
  },
  methods:
  {
      cambiaPagina: function()
      {

             this.$router.push('/login')
      }

  }

}
</script>

