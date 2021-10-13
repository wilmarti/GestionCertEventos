<template>
    <v-container>
        <h5 style="color:#08088A">{{ msg }}</h5>

        <v-btn @click="ShowFormInsertEvent()" depressed small color="primary">
          Regitrar nuevo evento
        </v-btn>

         <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        {{this.firstname}}

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

        <v-simple-table
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
                v-for="item in cursovirtual" :key="item.name"
                >
                <td>{{ item.id }}</td>
                <td>{{ item.DescripcionEvento }}</td>
                <td>{{ item.Estado }}</td>
                <td>{{ item.Horas }}</td>
                <td>{{ item.TipoDiploma }}</td>
                <td>{{  }}</td>                                
                </tr>
            </tbody>
            </template>
        </v-simple-table>

</v-container>


</template>


<script>
import {mapState,mapMutations} from 'vuex'
import axios from 'axios'
import { mdbScrollbar,mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import VueScrollingTable from "vue-scrolling-table"

export default {
  name: 'cursovirtual',
  components: {
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbScrollbar,
      VueScrollingTable
    },
  data(){
      return {
            cursovirtual: null,
            firstname:'',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],          



      //caracteristicas del scroll
      scrollVertical: true,
			scrollHorizontal: true,
			syncHeaderScroll: true,
			syncFooterScroll: true,
			includeFooter: true,
			deadAreaColor: "white",
			maxRows: 100,
      freezeFirstColumn: false,
      //
        id:'',
        NuevoCurso:'',
        errors: [],
        name: null,
        age: null,
        movie: null,
        
        nameState: null,
        submittedNames: [],
        IdEdicion: '',
        nameEditar:'',
        nameEditarHoras:'',
        valid:false,
        options: [
          { value: null, text: 'Por favor seleccione una opción' },
          { value: '1', text: 'ACTIVO' },
          { value: '0', text: 'INACTIVO' }
        ],  
        optionsDiploma:[
          { value: null, text: 'Por favor seleccione un diploma' },
          { value: '1', text: 'NORMAL' },
          { value: '2', text: 'HOMIL' },
          { value: '3', text: 'TOMA MUESTRAS DE CITOLOGIA' },
          { value: '4', text: 'CONGRESO CLAHT' }
           
        ],
        SeleccionCursoEstado: null,
        SeleccionDiploma:null,
        SelectEstado:'',
        SelectDiploma:'',
        columns: [
                  { id: "value", title: "ID", cssClasses: "w3" },
                  { id: "text", title: "Descripción del Evento", cssClasses: "w4" },
                  { id: "ESTADO", title: "Estado", cssClasses: "NroId" },
                  { id: "NumeroHoras", title: "No. Horas", cssClasses: "NroId" },
                  { id: "TipoDiploma", title: "Tipo Diploma", cssClasses: "NroId" }
                 ],
        nameHora:null
      }
  },  
  /***************Se ejecuta cuando el componnete se monte */
  mounted(){      
      //process.env.ApiUrl= "https://cnbcolombia.com/node/ApiACNB//api/" 
      //console.log("montaje",env.ApiUrl)
      this.getCursos();
  },

   methods:{

       ShowFormInsertEvent(){
           alert("hola mundo")
       },

    resetModal() {
        this.nameState = null
        this.SeleccionCursoEstado = null
        this.nameHora = null
        this.SeleccionDiploma = null

     },     

    /*************Methodo que llama la API para llenar array de cursos virtuales del CNB */
    getCursos(){
      axios.get('http://104.248.56.215:1337/eventos').then (response =>{
        this.cursovirtual = response.data
        console.log("cursos",response.data)
      })
      .catch (e => console.log("treendo error",e))

    },
    /*************Methodo que llamar a la API utilizado para eliminar el curso seleccionado */
    AñadirCursos(NuevoCurso){
      axios.post('https://cnbcolombia.com/node/ApiACNB/cursos',{NuevoCurso}).then (response =>{
          
          //console.log(response)

          if(response.data.NuevoCurso)
          {
            alert("Registro insertado con éxito");
            this.getCursos(); 
          }else{
            alert("Error al tratar de insertar el registro, al parecer ya existe");
          }

      })
      .catch (e => function(error){

      })      
    },   

   
    Agregarcurso()
    {  
         if(this.NuevoCurso.length > 3 )
          {   
              this.AñadirCursos(this.NuevoCurso);
              this.getCursos();                    
              this.NuevoCurso='';                        
          }
          else {
          alert("La descripción del curso debe tener mas de tres letras" )
          }
    },

    EditarCurso (index,text,estado,Horas,diploma)
    { 

      //console.log("este es el diploma:", diploma)
      //se limpia el formulario modal
      this.resetModal();

        this.IdEdicion = index      
        this.nameEditar = text
        this.nameEditarHoras = Horas
        this.SeleccionDiploma= diploma

        if(estado =="ACTIVO"){
          this.SelectEstado = 1
        }else{
          this.SelectEstado = 0
        }

        

/*       this.IdEdicion = index
      axios.get(`https://cnbcolombia.com/node/ApiACNB//api/cursos/${index}`).then (response =>{
        this.nameEditar = response.data[0].NombreCurso
        this.SelectEstado = response.data[0].Estado
        console.log("respuesta",response)
      })
      .catch (e => console.log(e)) */


    },

    EliminarCurso(idDelete)
    {   

      const strMensaje = 'Está seguro de eliminar el Registro?'

            if (confirm(strMensaje)){
                console.log("antes del axios");
                axios.delete(`https://cnbcolombia.com/node/ApiACNB/cursos/${idDelete}`).then (response =>{

                //console.log(response);
                if(response.data.ok)
                {
                  alert("Registro eliminado con éxito");
                  this.getCursos(); 
                }else{
                  alert("Error al tratar de eliminar el registro");
                } 
                })
                .catch (e => console.log(e)) 
            }
                
            else{
                return false;
            }
    },

      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        this.SeleccionCursoEstado = valid 
        this.SeleccionDiploma = valid
        this.valid = valid

        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },


      handleOk(bvModalEvt) {
      // se realiza la edicion del curso
      const DesEditar = this.nameEditar
      const EstadoEditar = this.SelectEstado
      const HorasEditar = this.nameEditarHoras
      const TipoDiploma = this.SelectDiploma

        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()

        if (this.valid){ 

            axios.put(`https://cnbcolombia.com/node/ApiACNB/cursos/${this.IdEdicion}`,{DesEditar,EstadoEditar,HorasEditar,TipoDiploma}).then (response =>{
            if(response.data.ok)
            {
              alert("Registro editado con éxito");
              this.getCursos(); 
             
            }else{
              //console.log("error edicion",response)
              alert("Error al tratar de editar el registro");
            } 
            })
            .catch (e => console.log("esta errado:",e)) 

        }


      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modalEdicion')
        })
      },    

  },
      computed:{
        ValidarInputNumerico(){
          return this.id.text = '' ? false : true
        },
        ...mapState(['participante','curso']),
        listarcurso: function() {
            //return this.participante.filter((item) => item.nota > 4);
            return this.curso.filter((item) => item.value != null);
        },


        },
    props: {
    msg: String
  }
}
</script>