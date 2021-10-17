<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex md12>
        <v-card class="mt-3 pa-3">
          <v-card-text class="text-center mt-5">
            <h1>Gestion de Eventos</h1>
          </v-card-text>

            <v-form v-if="nuevaEntrada" 
            v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="descripcionEvento"
                      :rules="nameRules"
                      :counter="10"
                      label="Descripción Evento"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="estado"
                      :rules="nameRules"
                      :counter="10"
                      label="Estado"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="horas"
                      :rules="horaslRules"
                      label="Horas"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="tipoDiploma"
                      :rules="nameRules"
                      :counter="10"
                      label="Tipo Diploma"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mt-8"
                  align="center"
                  justify="center">
                  <v-btn color="warning" small outlined v-if="nuevaEntrada" @click="limpiarNuevaEntrada">Limpiar</v-btn>
                  <v-btn color="success" class="ml-3" small outlined v-if="nuevaEntrada">Guardar</v-btn>
                  <v-btn color="red" class="ml-3" small outlined v-if="nuevaEntrada" @click="cancelarEntrada">Cancelar</v-btn>
                  </v-row>
              </v-container>
            </v-form>           


            <v-row class="mt-5 mb-5"
            align="center"
            justify="center">
            <v-btn color="cyan lighten-1" class="mt-5"  outlined v-if="!nuevaEntrada" 
            @click="agregarEntrada">Ingresar Evento</v-btn> 
            </v-row>

            <v-simple-table v-if="!nuevaEntrada"
            fixed-header
            height="300px"
            class="mt-15"
            >
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Id
                </th>
                <th class="text-left">
                    Descripción del Evento
                </th>
                <th class="text-left">
                    Estado
                </th>
                <th class="text-left">
                    No.Horas
                </th>
                <th class="text-left">
                    Tipo Diploma
                </th>   
                <th class="text-left">
                    Acción
                </th>                                                              
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="index in cursovirtual" :key="index"
                >
                <td>{{ index.id }}</td>
                <td>{{ index.DescripcionEvento }}</td>
                <td>{{ index.Estado }}</td>
                <td>{{ index.Horas }}</td>
                <td>{{ index.TipoDiploma }}</td>
                <td>{{  }}</td>                                
                </tr>
            </tbody>
            </template>
        </v-simple-table>





           </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
 data: () => ({
      valid: false,
      descripcionEvento: '',
      estado: '',
      horas: '',
      tipoDiploma: '',
      nuevaEntrada: false,
      nameRules: [
        v => !!v || 'Campo Obligatorio',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      horas: '',
      horasRules: [
        v => !!v || 'Campo Obligatorio',
        v => v.data > 0 || 'Debe ser mayor a 0',
      ],
    }),
    methods:{
      agregarEntrada(){
        this.nuevaEntrada = true
      },
      cancelarEntrada(){
        this.nuevaEntrada = false
      },
      limpiarNuevaEntrada(){

        this.descripcionEvento = ''
        this.estado = ''
        this.horas = ''
        this.tipoDiploma = ''
      }


    }
  }

</script>