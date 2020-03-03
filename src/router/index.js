import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

export default new VueRouter ({
  routes:[
    {path: '/',component:Main,redirect:'/goods',children:[
      {path: '/goods',component: () => import('../views/Goods.vue')},
      {path: '/evaluation',component: () => import('../views/Evaluation.vue')},
      {path: '/business',component: () => import('../views/Business.vue')},
    ]},
  ],
})
