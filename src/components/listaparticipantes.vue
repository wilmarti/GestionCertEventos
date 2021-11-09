<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex md12>
  <v-data-table
    :headers="headers"
    :items="participantes"
    :search="buscar"
   
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Participantes</v-toolbar-title>
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
              Agregar Participante 
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
                      v-model="editedItem.TipoId"
                      label="Tipo Identificación"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.NroId"
                      label="Numero Identificación"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.PrimerApellido"
                      label="Primer Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.SegundoApellido"
                      label="Segundo Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.PrimerNombre"
                      label="Primer Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.SegundoNombre"
                      label="Segundo Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Estado"
                      label="Estado"
                    ></v-text-field>
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
            <v-card-title class="text-h5">Esta seguro que quiere eliminar el participante?</v-card-title>
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
        @click="initialize"
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
    data: () => ({
      buscar:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Tipo Identificación',
          align: 'start',
          sortable: false,
          value: 'TipoId',
        },
        { text: 'Numero Identificación', value: 'NroId' },
        { text: 'Primer Apellido', value: 'PrimerApellido' },
        { text: 'SegundoApellido', value: 'SegundoApellido' },
        { text: 'Primer Nombre', value: 'PrimerNombre' },
        { text: 'Segundo Nombre', value: 'SegundoNombre' },
        { text: 'Estado', value: 'Estado' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      participantes: [],
      editedIndex: -1,
      editedItem: {
        TipoId: '',
        NroId: 0,
        PrimerApellido: '',
        SegundoApellido: '',
        PrimerNombre: '',
        SegundoNombre: '',
        Estado: '',
      },
      defaultItem: {
        TipoId: '',
        NroId: 0,
        PrimerApellido: '',
        SegundoApellido: '',
        PrimerNombre: '',
        SegundoNombre: '',
        Estado: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Participante' : 'Editar Participante'
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

      mounted () {
      this.initialize()
    },


    methods: {
      initialize () {
        this.participantes = []
        axios.get('http://104.248.56.215:1337/participantes')
        .then((response) => {
            // load the API response into items for datatable
            this.participantes = response.data
            console.log("participantes",response.data)
            })
            .catch((error) => {
            console.log(error)
        })
      },

      editItem (item) {
        this.editedIndex = this.participantes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.participantes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.participantes.splice(this.editedIndex, 1)
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
          Object.assign(this.participantes[this.editedIndex], this.editedItem)
        } else {
          try {
          axios.post('http://104.248.56.215:1337/participantes',this.editedItem)
              .then((response) => {
                if(response.data != ''){
                console.log("cursos prueba",response.data)
                this.initialize();
                }
                else{
                  this.errorApi = true;
                }

                })
                .catch((error) => {
                console.log("cursos prueba3",response.data)  
                console.log(error)
              }) 
            
          } catch (error) {
            
            console.log("cursos prueba2",response.data)
            
          }
        
        }
        this.close()
      },
    },
  }
</script>