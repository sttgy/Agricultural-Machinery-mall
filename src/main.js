import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/assets/css/reset.css'
import '@/assets/js/rem.js'

//按需引入vant
import {SubmitBar,Card,GoodsAction,GoodsActionIcon,GoodsActionButton,PullRefresh,List,Row,Col,Toast,Button,CellGroup,Field,Tab,Tabs,NavBar,Tabbar,Icon,TabbarItem,Swipe, SwipeItem,Lazyload} from 'vant'
Vue.use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(PullRefresh).use(List).use(Row).use(Col).use(Toast).use(Button).use(CellGroup).use(Field).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe)
.use(SwipeItem).use(Lazyload).use(Icon).use(Tab).use(Tabs)


import '@/mock/mock.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
