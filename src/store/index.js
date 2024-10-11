import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    rol: null,
    iduser: null
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setRol(state,rol){
      state.rol = rol;
    },
    setIduser(state,iduser){
      state.iduser = iduser;
    }
  },
  actions: {
    saveUser({commit}, user){
      commit('setUser', user);
      localStorage.setItem('user', user);
    },
    saveRol({commit}, rol){
      commit('setRol', rol)
      localStorage.setItem('rol', rol)
    },
    saveIduser({commit}, iduser){
      commit('setIduser', iduser)
      localStorage.setItem('iduser', iduser)
    },

    autoLogin({commit}){
      let user = localStorage.getItem('user');
      let rol = localStorage.getItem('rol');
      let iduser = localStorage.getItem('iduser');
      if(user || rol  || iduser){
        commit('setUser', user)
        commit('setRol', rol)
        commit('setIduser', iduser)
      }
      router.push({name: 'monthly_payment'}).catch(()=>{})
    },
    exit({commit}){
      commit('setUser', null)
      commit('setRol', null)
      commit('setIduser', null)
      localStorage.removeItem('user')
      localStorage.removeItem('rol')
      localStorage.removeItem('iduser')
      router.push({name: 'login'}).catch(()=>{})
    }
  },
  modules: {
  }
})
