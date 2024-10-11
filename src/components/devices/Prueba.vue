
<template>
 <v-flex>
    
    <v-row>
      <div class="text-center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            ELEGIR FECHA
          </v-btn>
        </template>
         
  
        <v-card>
          <v-date-picker v-model="picker" elevation="15"></v-date-picker>
  
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="selectPicker(picker)"
            >
              SELECCIONAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    </v-row>
    <v-row>
      <div style="width: 1200px; height: 1000px;">
      <Bar
              v-if="loaded"
              :options="chartOptions"
              :data="chartData"
      />
    </div>
    </v-row>
      
    </v-flex>


</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, elements } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import axios from 'axios';
export default {
  name: 'BarChart',
  
  components: { Bar },
  data() {
    return {
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dialogm1: '',
      dialog: false,
      loaded: false,
      chartData: {
        labels: [],
        datasets: [ 
            {   label: 'Mi consumo por hora',
                data: [],
                backgroundColor: ['#01E0FF','#07BDD6', '#089BB0', '#3B8FA1', '#1A88FC', '#2D906C', 
                                  '#1AFCE4', '#2CB9AA', '#2D9086'] 
            } 
        ]
      },
      chartOptions: {
        responsive: true,
        title: {
            text: "Consumo diario de energia"
        }
      }
    }
  },
  async mounted(){
    this.loaded = false
    try {
      const datos = await axios('api/reading?iduser='+this.$store.state.iduser);
      datos.data.forEach(element => {
        this.chartData.labels.push(element.hour)
        this.chartData.datasets[0].data.push(element.total)
      });
      this.loaded = true
    }catch(e){
      console.log(e)
    }
  },
  methods: {
    selectPicker(picker){
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      this.cargarPorFecha(picker)
      this.dialog = false;
    },
    async cargarPorFecha(picker){
      this.loaded = false
    try {
      const datos = await axios('api/reading/day?iduser='+this.$store.state.iduser+'&date='+picker);
      datos.data.forEach(element => {
        this.chartData.labels.push(element.hour)
        this.chartData.datasets[0].data.push(element.total)
      });
      this.loaded = true
    }catch(e){
      console.log(e)
    }
    }
  }
}
</script>