<template>
    <v-layout align-start>
        <v-flex>
            <v-data-table
            :headers="headers"
            :items="users"
            class="elevation-1"
            :items-per-page="5"
            :footer-props="{itemsPerPageText: 'Elementos por página:',itemsPerPageAllText: 'Todos',pageText: '{0}-{1} de {2}'}">
            
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nuevo Usuario
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
                      md="6">
                    <v-text-field
                        v-model="name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    hint="Almenos 8 caracteres"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6">
                      <v-select
                      v-model="idrol"
                      :items="itemRols"
                      label="Rol el usuario"
                    ></v-select>
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
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.id="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
        delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          <v-icon>
            restart_alt
          </v-icon>
        </v-btn>
      </template>
    </v-data-table> 
    </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
              show1: false,
              emailRules: [
                  v => !!v || 'E-mail es requerido',
                  v => /.+@.+/.test(v) || 'E-mail no es correcto',
                ],
                rules: {
                  required: value => !!value || 'Requerido.',
                  min: v => v.length >= 8 || 'Minimo 8 caracteres'
                },
                dialog: false,
                headers: [
                // {
                //     text: 'Dessert (100g serving)',
                //     align: 'left',
                //     sortable: false,
                //     value: 'name'
                // },
                { text: 'Opciones', value: 'id' },
                { text: 'Nombre', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Rol', value: 'permission' }
                ],
                search: '',
                users: [],
                itemRols: [
                  {text:'Administrador', value:1},
                  {text:'Usuario', value:2},
                  {text:'Invitado', value:3}
                ],
                editedIndex: -1,
                
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Actualizar ';
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.initialize()
        },
        methods:{
            index(){
              axios.get('api/user')
              .then((response) => {
                this.users = response.data;
              })
              .catch((error) => {
                console.log(error);
              });
            },

            initialize () {
              this.index();
            },

            editItem (item) {
              this.device.id = item.id;
              this.device.code = item.code;
              this.device.name = item.name;
              this.device.description = item.description;
              this.editedIndex = 1;
              this.dialog = true;
            },

            deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
            this.dialog = false;
            },

            clean(){
             
            },

            save () {
            if (this.editedIndex > -1) {
                // código para editar

                axios.put('api/device/update', {
                  'id' : this.device.id,
                  'name': this.device.name,
                  'code': this.device.code,
                  'description': this.device.description
                }).then((response)=> {
                  this.close();
                  this.index();
                  this.clean();
                }).catch((error) => {
                  console.log(error);
                })
            } else {
                // codigo para guardar
                axios.post('api/user/create',{
                    'code': this.device.code,
                    'name': this.device.name,
                    'description': this.device.description
                }).then((response) => {
                  this.close();
                  this.index();
                  this.clean();
                })
                .catch((error) =>{
                  console.log(error);
                });
            }
            }
        }        
    }
</script>