<template>
<div class="Home">

    <listaparticipantes/>

</div>
    
</template>


<script>
// @ is an alias to /src
import listaparticipantes from '@/components/listaparticipantes.vue'
/* import login from '@/views/Login.vue'
import auth from "@/auth"; */

export default {
  name: 'Home',
  components: {
    listaparticipantes,
    //login    
  },
  views:{
      //login
  },
  computed: {
/*     userLogged() {
      return auth.getUserLogged();
    } */
  }
}
</script>
