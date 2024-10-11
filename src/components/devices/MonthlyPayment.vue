<template>
<v-card
      class="mx-auto"
      width="700"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{this.$store.state.user}}
          </v-list-item-title>
          <v-list-item-subtitle>{{date}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <v-card-text>
        <v-row align="center">
          <v-col
            class="text-h2"
            cols="6"
          >
            Q. {{calcularTotal}}
          </v-col>
          <!-- <v-col cols="6" >
                <v-icon size="100" color="blue">
                    electric_bolt
                </v-icon>
            
          </v-col> -->
          <v-col>
            <v-list-item>
            <v-list-item-icon>
            <v-icon color="red" size="80">electric_meter</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="text-h5" style="color: #ff5722;">{{kwh}} kWh</v-list-item-subtitle>
        </v-list-item> 
          </v-col>
          <v-col>
             
          </v-col>
        </v-row>
      </v-card-text>
          
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn text @click="totalConsumption()">
          <!-- Recomendaciones -->
           Actualizar
          <v-icon>
            restart_alt
          </v-icon>
         
        </v-btn>
      </v-card-actions>
    </v-card>
  
</template>

<script>

import axios from 'axios';
export default {
  
  data() {
    return {
      time: '',
      date: '',
      kwh: '',
    }
  },
  computed: {   
        calcularTotal: function(){
            var to = 1.41 * this.kwh;
            return to.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
  },
  async mounted(){
    this.totalConsumption();
  },
  methods: {
    async totalConsumption(){
        try{
            const datos = await axios('api/reading/month?iduser='+this.$store.state.iduser);
            this.date = datos.data.date;
            this.kwh = datos.data.total.total_month;
        }catch(e){

        }
    }
  }
}
</script>
<style >

</style>