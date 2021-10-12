<template>
  <v-app>
    <v-app-bar
      app
      dense
      color="primary"
      dark
    >
    <div>
      <v-img @click="home"
      contain
      max-height="40"
      max-width="63"
      src="https://colegiodeodontologos.org/wp-content/uploads/2018/02/logo-mini.png"
      ></v-img>
    </div>

   <v-toolbar-title class="ml-4 letterNavBar">Colegio Colombiano Odontologia</v-toolbar-title>

        <v-spacer></v-spacer>

<div class="text-center">
    <v-menu
      open-on-hover
      bottom      
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          Virtualidad
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in virtualidad">
        <v-list-item          
          :key="index"
          @click="SelectorVirtualidad(index)"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>

  <div class="text-center">
    <v-menu
      open-on-hover
      bottom
      offset-y
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          Certificados Digitales
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in certificados">
        <v-list-item         
          :key="index"
          @click="SelectorCertificados(index)"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>

  <v-spacer></v-spacer>

  <v-btn 
  color="success mr-4"
  small
  >
    <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
  </v-btn>
  
  <v-btn 
  color="red"
  small
  >
    <v-icon>mdi-cancel</v-icon>
  </v-btn>

    </v-app-bar> 

    <v-main>
      <router-view/>
    </v-main>

      <v-footer
    color="primary"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Colombia</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>




<script>

export default {
  name: 'App',

  data: () => ({
      virtualidad: [
        { title: 'Eventos',url:'/gestion'},
        { title: 'Participantes',url:'/participantes' },
        { title: 'Filtros',url:'/filtros' },
      ],
      certificados: [
        { title: 'Certificados',url:'/certificados' },
        { title: 'Carne Afiliacion CCO',url:'/gestion4' },
      ],
      links: [
        'Home' ,
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ]
  }),
  methods:{
    home(){
      this.$router.push('/')
    },
    SelectorVirtualidad(id){
      //alert("HOLA")
      //console.log("Este es el valor:",this.virtualidad[id].title)
      this.$router.push(this.virtualidad[id].url)
     
    },
    SelectorCertificados(id){
      //alert("HOLA")
      //console.log("Este es el valor:",this.virtualidad[id].title)
      this.$router.push(this.certificados[id].url)
      
    }
  }
};
</script>




<style scoped>

.letterNavBar{
  
  font-size: 15px;
}

</style>