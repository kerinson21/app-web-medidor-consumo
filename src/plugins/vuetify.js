import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      // Aquí puedes definir el idioma que desees
      es: {
        current: 'es',
      },
    },
    current: 'es', // Establece el idioma actual (en este caso, español)
  },
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#1486BB',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
