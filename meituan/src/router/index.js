import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import Index from '@/page/index.vue'
import goodsList from '@/page/goodsList.vue'
import ChangeCity from '@/page/changeCity.vue'
import Register from '@/page/register.vue'
import Login from '@/page/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children: [{
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: 's/:name',
        name: 'goods',
        component: goodsList
      }, {
        path: '/changeCity',
        name: 'changeCity',
        component: ChangeCity
      }]
    },
    {
      path: '/blank',
      name: 'blankPage',
      component: blankPage,
      children: [{
        path: '/register',
        name: 'register',
        component: Register
      }, {
        path: '/login',
        name: 'login',
        component: Login
      }]
    }
  ]
})
