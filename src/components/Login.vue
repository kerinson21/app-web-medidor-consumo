<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-icon
                        x-large
                        dark
                        class="mx-auto"
                    >person</v-icon>
                    <!-- <v-toolbar-title>
                        ACCESO
                    </v-toolbar-title> -->
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field 
                     v-model="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    @click:append="show1 = !show1">
                    </v-text-field>
                    <v-flex v-if="error">
                        <strong class="red--text">{{error}}</strong>
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn color="primary" @click="ingresar()">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            email: '',
            password: '',
            show1: false,
            error: null
        }
    },
    methods: {
        ingresar(){
            this.error = null;
            axios.post('api/login',{
                'email': this.email,
                'password': this.password
            })
            .then(response=>{
                // console.log(response.data)
                
                if(response.data.code == 401){
                    this.error = 'Verifica tus credenciales para acceder, tu email y tu contraseña'
                }
                return response.data;
            })
            .then(data => {
                this.$store.dispatch('saveUser', data.user);
                this.$store.dispatch('saveRol', data.rol);
                this.$store.dispatch('saveIduser', data.iduser)
                this.$router.push({name: 'monthly_payment'}).catch(() => {});
                
            })
            .catch(error=>{
                console.log(error)
            })
        },

    }    
}
</script>

