<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="footer"></router-view>
      
      <!-- <router-link class="footer-bar-item" to="/">首页</router-link><van-icon name="wap-home-o" />
      <router-link class="footer-bar-item" to="/about">分类</router-link> -->
  </div>
</template>

<script>

export default {
  components:{
  }
}
</script>

<style lang="scss">
  *{margin:0;padding:0;}
  
</style>
