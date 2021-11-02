<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex md12>
  <v-data-table
    :headers="headers"
    :items="cursos"
    :search="buscar"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Gestion de Eventos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
     <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              small
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva Entrada
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.DescripcionEvento"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.EstadoEvento"
                      label="Estado"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Horas"
                      label="Horas"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.TipoDiploma"
                      label="Tipo Diploma"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Esta seguro que quiere borrar este curso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getCursos"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
        </v-flex>
    </v-layout>
  </v-container>
</template>



<script>


  import axios from 'axios'


  export default {

    name: 'cursovirtual',
    data: () => ({
      buscar:'',
      cursovirtual: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Descripcion Evento',
          align: 'start',
          sortable: false,
          value: 'DescripcionEvento',
        },
        { text: 'Estado', value: 'Estado' },
        { text: 'Horas', value: 'Horas' },
        { text: 'Tipo Diploma', value: 'TipoDiploma' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      cursos: [],
      editedIndex: -1,
      editedItem: {
        DescripcionEvento: '',
        EstadoEvento: '',
        Horas: 0,
        TipoDiploma: '',
      },
      defaultItem: {
        DescripcionEvento: '',
        EstadoEvento: '',
        Horas: 0,
        TipoDiploma: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Curso' : 'Editar Curso'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
     
     mounted(){      
          //process.env.ApiUrl= "https://cnbcolombia.com/node/ApiACNB//api/" 
          //console.log("montaje",env.ApiUrl)
          this.getCursos();
        },

    methods: {
        getCursos() {
        this.cursos = []
        axios.get('http://104.248.56.215:1337/eventos')
        .then((response) => {
            // load the API response into items for datatable
            this.cursos = response.data
            console.log("cursos",response.data)
            })
            .catch((error) => {
            console.log(error)
        })
        },
        
        editItem (item) {
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
        deleteItem (item) {
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.cursos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.cursos[this.editedIndex], this.editedItem)
        } else {
          this.cursos.push(this.editedItem)
        }
        this.close()
      },

    },
  }
     
    
  
</script>