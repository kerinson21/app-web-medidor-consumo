
<template>

  <Bar
    v-if="loaded"
    :options="chartOptions"
    :data="chartData"
  />
  
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import axios from 'axios';
export default {
  name: 'BarChart',
  
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [ 
            {   label: 'Mi consumo por mes',
                data: [],
                backgroundColor: ['#01E0FF','#07BDD6', '#089BB0', '#3B8FA1', '#1A88FC', '#2D906C', 
                                  '#1AFCE4', '#2CB9AA', '#2D9086'] 
            } 
        ]
      },
      chartOptions: {
        responsive: true,
        title: {
            text: "Consumo por año de energia"
        }
      }
    }
  },
  async mounted(){
    this.loaded = false
    try {
      const datos = await axios('api/reading/year?iduser='+this.$store.state.iduser);
      datos.data.forEach(element => {
        this.chartData.labels.push(element.month)
        this.chartData.datasets[0].data.push(0.74 * element.total )
      });
      this.loaded = true
    }catch(e){
      console.log(e)
    }
  },
  methods: {
  }
}
</script>