import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Device from '../components/devices/Device.vue'
import Reading from '../components/devices/Reading.vue'
import DiaryView from '../components/devices/Prueba.vue'
import MonthlyPayment from '../components/devices/MonthlyPayment.vue'
import User from '../components/user/User'
import Assigned from '../components/user/Assigned'
import YearPayment from '../components/devices/YearPayment'
import Login from '../components/Login'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/device',
    name: 'device',
    component: Device,
    meta: {
      administrador: true
    }
  },
  {
    path: '/reading',
    name: 'reading',
    component: Reading,
    meta: {
      administrador: true
    }
  },
  {
    path: '/monthly_payment',
    name: 'monthly_payment',
    component: MonthlyPayment,
    meta: {
      administrador: true,
      usuario: true,
      invitado: true
    }
  },
  {
    path: '/year_payment',
    name: 'year_payment',
    component: YearPayment,
    meta: {
      administrador: true,
      usuario: true,
      invitado: true
    }
  },
  {
    path: '/diary_view',
    name: 'diary_view',
    component: DiaryView,
    meta: {
      administrador: true,
      usuario: true,
      invitado: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      administrador: true
    }
  },
  {
    path: '/assigned',
    name: 'assigned',
    component: Assigned,
    meta: {
      administrador: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      libre: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.libre)){
    next();
  }else if(store.state.user && store.state.rol == 1){
    if(to.matched.some(record => record.meta.administrador)){
      next()
    }
  }else if(store.state.user && store.state.rol == 2){
    if(to.matched.some(record => record.meta.usuario)){
      next()
    }
  }else{
    next({
      name: 'login'
    })
  }
})

export default router
