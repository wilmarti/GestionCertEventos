import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gestion.vue')
  },
  {
    path: '/participantes',
    name: 'participantes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Participantes.vue')
  },  
  {
    path: '/filtros',
    name: 'filtros',
    component: () => import(/* webpackChunkName: "about" */ '../views/Filtros.vue')
  },  
  {
    path: '/certificados',
    name: 'certificados',
    component: () => import(/* webpackChunkName: "about" */ '../views/Certificados.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
