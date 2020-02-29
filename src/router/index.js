import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter ({
  routes:[
    {path: '/',component: () => import('../views/Main.vue'),children:[
      {path: '/goods',component: () => import('../views/Goods.vue')},
      {path: '/evaluation',component: () => import('../views/Evaluation.vue')},
      {path: '/business',component: () => import('../views/Business.vue')},
      {path: '/shopCar',component: () => import('../views/Shopcar.vue')}
    ]},
  ],
})
