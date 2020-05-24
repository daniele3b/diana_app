import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import PasswordForgotten from '../views/PasswordForgotten.vue'
import Registration from '../views/Registration.vue'
import Logout from '../components/Logout.vue'
import Dashboard from '../views/Dashboard.vue'
import ReportStorico from '../views/ReportStorico.vue'
import Avanzato from '../views/Avanzato.vue'
import CambioPw from '../views/CambioPw.vue'
import Traffic from '../views/Traffic.vue'
import NewOperatore from '../views/NewOperatore.vue'
import Home from '../views/Home.vue'
import EsportaDati from '../views/EsportaDati.vue'
import Announcements from '../views/Announcements.vue'
import AnalisiDati from '../views/AnalisiDati.vue'
import Component_404 from '../views/404.vue'

const protect = (to, from, next) => {
  if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
      localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
      localStorage.getItem('type') != undefined){
    next()
  }
  else next({ name : "Login"})
}

const skip = (to, from, next) => {
  if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
      localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
      localStorage.getItem('type') != undefined){
    next( {name: "Login"})
  }
  else next()
}





const protectSup = (to, from, next) => {
  if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
      localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
      localStorage.getItem('type') != undefined&&localStorage.getItem('type')!='cittadino'){
    next()
  }
  else next({ name : "Login"})
}

Vue.use(VueRouter)

  const routes = [
    {
      path: '/notFound',
      name: 'NotFound',
      component: Component_404
    },
    {
        path:'/',
        name:'Home',
        beforeEnter:skip,
        component:Home
    },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter : protect,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pw_forgotten',
    name: 'PasswordForgotten',
    component: PasswordForgotten
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter : protect,
    component: Logout
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter : protect,
    component: Dashboard
  },
  {
    path:'/report_storico',
    name:'ReportStorico',
    beforeEnter:protectSup,
    component: ReportStorico
  },
  {
    path:'/avanzato',
    name:'Avanzato',
    beforeEnter:protectSup,
    component: Avanzato
  },
  {
    path:'/cambio_pw',
    name:'CambioPw',
    beforeEnter:protect,
    component:CambioPw
  },
  {
    path:'/traffic',
    name:'Traffic',
    beforeEnter:protectSup,
    component:Traffic
  },
  {
    path:'/newoperatore',
    name:'NewOperatore',
    beforeEnter:protectSup,
    component:NewOperatore
  },
  {
    path:'/esportadati',
    name:'EsportaDati',
    component:EsportaDati
  },
  {
    path:'/announcements',
    name:'Announcements',
    beforeEnter:protect,
    component:Announcements
  },
  {
    path:'/analisidati',
    name: 'AnalisiDati',
    beforeEnter:protect,
    component:AnalisiDati
  },
  { path: '*', redirect: '/notFound' },  
]

const router = new VueRouter({
  routes
})

export default router
