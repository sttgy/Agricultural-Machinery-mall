import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Footer from '@/components/Footer'
import Error from '@/views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components:{
      default:Home,
      'footer':Footer
    },
    meta:{
      keepAlive:true//指定某个路由缓存状态
    }
  },
  {
    path: '/category',
    name: 'Category',
    components:{
      default:() => import('@/views/Category'),
      'footer': Footer
    },
    meta: {
      keepAlive: true //指定某个路由缓存状态
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    components:{
      default:() => import('@/views/Cart'),
      'footer': Footer
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    components:{
      default:() => import('@/views/Profile'),
      'footer': Footer
    },
    meta: {
      keepAlive: true //指定某个路由缓存状态
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail')
  },{
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
