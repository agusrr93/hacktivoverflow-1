import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: '/list',
          component: () => import('./components/contains/Listquestion.vue')
        },
        {
          path: '/:id',
          name: 'detailquestion',
          props: true,
          component: () => import('./components/contains/Detailquestion.vue')
        }
      ] 
    },
    {
      path: '/myarticles',
      name: 'detailarticles',
      component: () => import('./components/contains/Myquestion.vue')
    }
  ]
})
