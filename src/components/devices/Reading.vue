<template>
    <v-layout align-start>
        <v-flex >
            <v-row>
            <template v-for="d in devices">
                <v-card
                class="mx-auto my-12"
                width="700"
              >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{d.user}}
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <v-card-text>
        <v-row align="center">
          <v-col
            class="text-h2"
            cols="6"
          >
            Q {{calcularTotal(d.consumo)}}
          </v-col>
          <!-- <v-col cols="6" >
                <v-icon size="100" color="blue">
                    electric_bolt
                </v-icon>
            
          </v-col> -->
          <v-col>
            <v-list-item>
            <v-list-item-icon>
            <v-icon color="red" size="80"></v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="text-h5" style="color: #ff5722;">{{d.consumo}} kWh</v-list-item-subtitle>
        </v-list-item> 
          </v-col>
          <v-col>
             
          </v-col>
        </v-row>
      </v-card-text>
          
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn text>
          <!-- Recomendaciones -->
           Actualizar
          <v-icon>
            restart_alt
          </v-icon>
         
        </v-btn>
      </v-card-actions>
</v-card>
            </template>
            </v-row>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios';
    import { Bar } from 'vue-chartjs'
    export default {

        data(){
            return {
                consumo: 0,
                dialog: false,
                search: '',
                devices: [],
                editedIndex: -1,
            }
        },
        computed: {
        //    calcularTotal: function(){
        //     var to = 0.74 * this.consumo;
        //     return to.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //  }
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
            calcularTotal(kwh){
            var to = 1.41 * kwh;
            return to.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            index(){
              axios.get('api/assgined/reading')
              .then((response) => {
                this.devices = response.data;
              })
              .catch((error) => {
                console.log(error);
              });
            },

            initialize () {
              this.index();
            },


            
            

            
        }        
    }
</script>