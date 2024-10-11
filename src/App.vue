<template>
  <div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="esAdministrador || esUsuario">
          <v-list-item :to="{name:'monthly_payment'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group v-if="esAdministrador">
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Dispositvos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'device'}">
              <v-list-item-action>
                <v-icon>usb</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Dispositivos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'reading'}">
              <v-list-item-action>
                <v-icon>speaker_phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consumo por Usuario
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

              <v-list-group v-if="esAdministrador || esUsuario">
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Consumo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'year_payment'}">
              <v-list-item-action>
                <v-icon>flash_on</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consumo Mensual
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'diary_view'}">
              <v-list-item-action>
                <v-icon>light_mode</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 Consumo Diario
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group v-if="esAdministrador">
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'user'}">
              <v-list-item-action>
                <v-icon>account_circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'assigned'}">
              <v-list-item-action>
                <v-icon>account_circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                Dispositivos Asignados
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          
        </template>
      </v-list>
    </v-navigation-drawer>
      <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
      v-if="logueado"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Monitoreo de Energía</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
     <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
  
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  v-bind:src="require('./assets/perfil.png')" 
                  alt="user"
                >
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title>{{this.$store.state.user}}</v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              color="primary"
              text
              @click="menu = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="red"
              text
              @click="logout()"
            >
              CERRAR SESIÓN
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      
     
    </v-app-bar>
   <v-main>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</div>
</template>

<script>

export default {
  name: 'App',
  props: {
      source: String,
    },
  data: () => ({
    menu: false,
    dialog: false,
    drawer: null,
  }),
  computed: {
    logueado(){
      return this.$store.state.user;
    },
    esAdministrador(){
      return this.$store.state.user && this.$store.state.rol == 1;
    },
    esUsuario(){
      return this.$store.state.user && this.$store.state.rol == 2;
    }
  },
  mounted(){
    this.$store.dispatch('autoLogin');
  },
  methods: {
    logout(){
      this.menu = false
      this.$store.dispatch('exit');
    }
  }
};
</script>
