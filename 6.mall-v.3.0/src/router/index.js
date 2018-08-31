import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    redirect:'/cart'
  },
  {
    path: '/shop',
    redirect:'/cart'
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
  ]
})
